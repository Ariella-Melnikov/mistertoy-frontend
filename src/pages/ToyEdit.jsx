import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { saveToy } from '../store/actions/toy.actions.js'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()
  const navigate = useNavigate()

  const labels = toyService.getToyLabels()

  useEffect(() => {
    if (!toyId) return
    loadToy()
  }, [])

  function loadToy() {
    toyService
      .getById(toyId)
      .then(setToyToEdit)
      .catch((err) => {
        console.log('Had issued in toy edit:', err)
        navigate('/toy')
        showErrorMsg('Toy not found!')
      })
  }

  const ToySchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(2, 'Too Short!').max(20, 'Too Long!'),
    price: Yup.number().required('Price is required').min(1, 'Price must be at least 1'),
    labels: Yup.array().of(Yup.string()),
  })
  const uploadImg = async (ev, setFieldValue) => {
    const CLOUD_NAME = 'dkykllpf5'
    const UPLOAD_PRESET = 'toy_uploads'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData()

    FORM_DATA.append('file', ev.target.files[0])
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)

    try {
      const res = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: FORM_DATA,
      })
      const { url } = await res.json()
      setFieldValue('imgUrl', url)
      showSuccessMsg('Image uploaded successfully')
    } catch (err) {
      console.error(err)
      showErrorMsg('Image upload failed')
    }
  }
  function onSaveToy(values, { setSubmitting }) {
    saveToy(values)
      .then(() => {
        showSuccessMsg('Toy saved successfully')
        navigate('/toy')
      })
      .catch((err) => {
        showErrorMsg('Cannot save toy')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <section className='toy-edit'>
      <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

      <Formik enableReinitialize initialValues={toyToEdit} validationSchema={ToySchema} onSubmit={onSaveToy}>
        {({ errors, touched, values, handleChange, setFieldValue }) => (
          <Form>
            <Field
              as={TextField}
              label='Name'
              variant='outlined'
              name='name'
              required
              margin='normal'
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              onChange={handleChange}
              value={values.name}
            />

            <Field
              as={TextField}
              label='Price'
              variant='outlined'
              type='number'
              name='price'
              required
              margin='normal'
              inputProps={{ min: 1 }}
              error={touched.price && !!errors.price}
              helperText={touched.price && errors.price}
              onChange={handleChange}
              value={values.price}
            />

            <FormControl margin='normal'>
              <InputLabel id='labels-label'>Labels</InputLabel>
              <Select
                multiple
                labelId='labels-label'
                id='labels'
                name='labels'
                value={values.labels}
                onChange={(event) => {
                  setFieldValue('labels', event.target.value)
                }}
                renderValue={(selected) => selected.join(', ')}
                style={{ minWidth: '250px' }}>
                {labels.map((label) => (
                  <MenuItem key={label} value={label}>
                    <Checkbox checked={values.labels.includes(label)} />
                    <ListItemText primary={label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <input
              type='file'
              accept='image/*'
              onChange={(ev) => uploadImg(ev, setFieldValue)}
              style={{ margin: '20px 0' }}
            />

            {values.imgUrl && (
              <div style={{ marginBottom: '20px' }}>
                <img src={values.imgUrl} alt='Toy' style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </div>
            )}

            <Button variant='contained' color='primary' type='submit'>
              {toyToEdit._id ? 'Save' : 'Add'}
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

// function handleChange({ target }) {
//   const field = target.name
//   const value = target.type === 'number' ? +target.value || '' : target.value
//   setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
// }

// function handleLabelChange({ target }) {
//   const value = target.value
//   setToyToEdit((prevToy) => {
//     const newLabels = prevToy.labels.includes(value)
//       ? prevToy.labels.filter((label) => label !== value)
//       : [...prevToy.labels, value]
//     return { ...prevToy, labels: newLabels }
//   })
// }

//   function handleLabelChange(event) {
//     setNewLabel(event.target.value)
//   }

//   function addLabel() {
//     if (newLabel.trim()) {
//       setToyToEdit((prevToyToEdit) => ({
//         ...prevToyToEdit,
//         labels: [...prevToyToEdit.labels, newLabel.trim()],
//       }))
//       setNewLabel('')
//     }
//   }

//   function removeLabel(index) {
//     setToyToEdit((prevToyToEdit) => {
//       const newLabels = prevToyToEdit.labels.filter((_, i) => i !== index)
//       return { ...prevToyToEdit, labels: newLabels }
//     })
//   }
