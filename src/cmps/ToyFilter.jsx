import { useEffect, useRef, useState } from 'react'
import { useEffectUpdate } from './customHooks/useEffectUpdate.js'

import { toyService } from '../services/toy.service.js'
import { utilService } from '../services/util.service.js'
import { ToySort } from './ToySort.jsx'

const toyLabels = toyService.getToyLabels()

export function ToyFilter({ filterBy, onSetFilter, sortBy, onSetSort }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 400))

  useEffect(() => {
    debouncedOnSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    if (type === 'select-multiple') {
      console.log('target.selectedOptions:', target.selectedOptions)
      value = Array.from(target.selectedOptions, (option) => option.value || [])
      console.log('value:', value)
    }
    value = type === 'number' ? +value || '' : value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  const { name, inStock, labels } = filterByToEdit

  return (
    <section className='toy-filter'>
      <h2>Filter Toys</h2>
      <form onSubmit={onSubmitFilter}>

        <select
          value={inStock || ''}
          className='flex justify-center align-center'
          name='inStock'
          onChange={handleChange}>
          <option value='all'>All</option>
          <option value='true'>In stock</option>
          <option value='false'>Sold Out</option>
        </select>

        <select multiple name='labels' value={labels || []} onChange={handleChange}>
          <option value=''>Labels</option>
          <>
            {toyLabels.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </>
        </select>
      </form>
      <ToySort sortBy={sortBy} onSetSort={onSetSort} />
    </section>
  )
}
