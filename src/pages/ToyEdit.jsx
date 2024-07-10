import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { saveToy } from '../store/actions/toy.actions.js'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()
  // const [newLabel, setNewLabel] = useState('')
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

  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
  }

  function handleLabelChange({ target }) {
    const value = target.value
    setToyToEdit((prevToy) => {
      const newLabels = prevToy.labels.includes(value)
        ? prevToy.labels.filter((label) => label !== value)
        : [...prevToy.labels, value]
      return { ...prevToy, labels: newLabels }
    })
  }

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

  function onSaveToy(ev) {
    ev.preventDefault()
    saveToy(toyToEdit)
      .then((savedToy) => {
        navigate('/toy')
        showSuccessMsg(`Toy Saved (id: ${savedToy._id})`)
      })
      .catch((err) => {
        showErrorMsg('Cannot save toy')
        console.log('errddd:', err)
      })
  }

  const { name, price, labels: selectedLabels, inStock } = toyToEdit
  return (
    <section className='toy-edit'>
      <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

      <form onSubmit={onSaveToy}>
        <label htmlFor='name'>Toy name:</label>
        <input onChange={handleChange} value={name} type='text' name='name' id='name' />

        <label htmlFor='price'>Toy price:</label>
        <input onChange={handleChange} value={price} type='number' name='price' id='price' />

        <label htmlFor='inStock'>In stock:</label>
        <input onChange={handleChange} checked={inStock} type='checkbox' name='inStock' id='inStock' />

        <label>Toy labels:</label>
        <div className="labels-container">
          {labels.map(label => (
            <div key={label}>
              <input
                type="checkbox"
                id={label}
                value={label}
                checked={selectedLabels.includes(label)}
                onChange={handleLabelChange}
              />
              <label htmlFor={label}>{label}</label>
            </div>
          ))}
        </div>

        <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
      </form>
    </section>
  )
}
