import { useEffect, useRef, useState } from 'react'
import { useEffectUpdate } from './customHooks/useEffectUpdate.js'
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material'

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
    <Box className='toy-filter' p={2} boxShadow={3}>
      <Typography variant='h6' gutterBottom>
        Filter Toys
      </Typography>
      <form onSubmit={onSubmitFilter}>
        <FormControl fullWidth margin='normal'>
          <InputLabel id='inStock-label'>Stock Status</InputLabel>
          <Select
            labelId='inStock-label'
            value={inStock || ''}
            name='inStock'
            onChange={handleChange}
            label='Stock Status'>
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='true'>In stock</MenuItem>
            <MenuItem value='false'>Sold Out</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <InputLabel id='labels-label'>Labels</InputLabel>
          <Select
            labelId='labels-label'
            multiple
            name='labels'
            value={labels || []}
            onChange={handleChange}
            renderValue={(selected) => selected.join(', ')}
            label='Labels'>
            {toyLabels.map((label) => (
              <MenuItem key={label} value={label}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
      <ToySort sortBy={sortBy} onSetSort={onSetSort} />
    </Box>
  )
}
