import { useEffect, useRef, useState } from 'react'

import { utilService } from '../services/util.service.js'

export function ToyFilterSearch({ filterBy, onSetFilter }) {
  console.log('filterBy',filterBy)
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

  const { txt } = filterByToEdit

  return (
    <section className='toy-filter-seaerch'>
      <form onSubmit={onSubmitFilter}>
        <div className='filter-input-wrapper'>
          <input onChange={handleChange} value={txt} type='text' placeholder='Im looking for' name='txt' />
        </div>
      </form>
    </section>
  )
}
