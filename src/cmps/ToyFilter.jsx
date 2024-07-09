import { useEffect, useRef, useState } from 'react'

import { utilService } from '../services/util.service.js'

export function ToyFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const debouncedSetFilterRef = useRef(utilService.debounce(onSetFilterBy, 500))

  useEffect(() => {
    // Notify parent
    debouncedSetFilterRef.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      case 'select-multiple':
        value = Array.from(target.selectedOptions, (option) => option.value)
        break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  const { name, inStock } = filterByToEdit
  const allLabels = [
    'Doll',
    'Battery Powered',
    'Interactive',
    'Indoor',
    'Outdoor',
    'Action Figure',
    'Collectible',
    'Eco-friendly',
    'Fantasy',
    'Preschool',
    'Travel-friendly',
  ]

  return (
    <section className='toy-filter'>
      <h2>Filter Toys</h2>
      <form onSubmit={onSubmitFilter}>
        <input value={name} onChange={handleChange} type='search' placeholder='By Txt' id='name' name='name' />
        
        <select
          value={inStock}
          className='flex justify-center align-center'
          name='inStock'
          onChange={(ev) => handleChange(ev)}>
          <option value='all'>All</option>
          <option value='in stock'>In stock</option>
          <option value='sold out'>Soldout</option>
        </select>

        <select multiple value={labels} className='toy-labels' name='labels' onChange={(ev) => handleChange(ev)}>
          {allLabels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>

        <button hidden>Set Filter</button>
      </form>
    </section>
  )
}
