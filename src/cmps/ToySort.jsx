import { useEffect, useRef, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Box } from '@mui/material';



export function ToySort({ sortBy, onSetSort }) {
  const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

  useEffect(() => {
    onSetSort(sortByToEdit)
  }, [sortByToEdit])

  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    setSortByToEdit(prevSort => ({
      ...prevSort,
      [field]: field === 'desc' ? -prevSort.desc : value,
    }))
  }

  return (
    <Box className='sort-container' display='flex' flexDirection='column' p={2} boxShadow={3}>
      <FormControl fullWidth margin='normal'>
        <InputLabel id='sort-type-label'>Sort by</InputLabel>
        <Select
          labelId='sort-type-label'
          name='type'
          value={sortByToEdit.type}
          onChange={handleChange}
          label='Sort by'
        >
          <MenuItem value=''>Sort by</MenuItem>
          <MenuItem value='name'>Name</MenuItem>
          <MenuItem value='price'>Price</MenuItem>
          <MenuItem value='createdAt'>Date</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            name='desc'
            checked={sortByToEdit.desc < 0}
            onChange={handleChange}
          />
        }
        label='Descending'
      />
    </Box>
  );
}
