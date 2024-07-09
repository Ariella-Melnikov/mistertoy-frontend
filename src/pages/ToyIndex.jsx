import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import { ToyList } from '../cmps/ToyList.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy, setFilterBy, removeToyOptimistic } from '../store/actions/toy.actions.js'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySort.jsx'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)


  useEffect(() => {
    loadToys().catch(() => {
      showErrorMsg('Could not load toys')
    })
  }, [filterBy])

  function onRemoveToy(toyId) {
    const ans = confirm('Do you want to delete this toy?')
    if (!ans) return
    removeToyOptimistic(toyId)
      .then(() => {
        console.log('removed toy ' + toyId)
        showSuccessMsg(`Removed toy successfully`)
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Cannot remove toy ' + toyId)
      })
  }


  function onToggleToy(toy) {
    const toyToSave = { ...toy, inStock: !toy.inStock }
    saveToy(toyToSave)
      .then(() => {
        showSuccessMsg(`Updated ${toyToSave.name} successfully`)
        return toyToSave
      })
      .catch(() => showErrorMsg('Had trouble updating the toy'))
  }


  return (
    <section className='toy-index'>
      <ToyFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
      <ToySort filterBy={filterBy} onSetFilterBy={setFilterBy} />
      <Link to='/toy/edit' className='add-toy-btn btn'>
        Add Toy
      </Link>
      <h2>Toys List</h2>
      {!isLoading ? (
        <ToyList toys={toys} onRemoveToy={onRemoveToy} onToggleToy={onToggleToy} />
      ) : (
        <div>Loading...</div>
      )}
    </section>
  )
}
