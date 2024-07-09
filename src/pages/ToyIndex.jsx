import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { SET_FILTER_BY } from '../store/reducers/toy.reducer.js'
import { ToySort } from '../cmps/ToySort.jsx'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  const [searchParams, setSearchParams] = useSearchParams()
  const defaultFilter = toyService.getFilterFromSearchParams(searchParams)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

  const dispatch = useDispatch()

  useEffect(() => {
    setFilterBy({ ...defaultFilter })
  }, [])

  useEffect(() => {
    setSearchParams(filterBy)
    loadToys(filterBy).catch(() => {
      showErrorMsg('Could not load toys')
    })
  }, [filterBy])

  function onRemoveToy(toyId) {
    const ans = confirm('Do you want to delete this toy?')
    if (!ans) return
    removeToy(toyId)
      .then(() => {
        console.log('removed toy ' + toyId)
        showSuccessMsg(`Removed toy with ${toyId} id successfully`)
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Cannot remove toy ' + toyId)
      })
  }

  function setFilterSort(filterBy) {
    const action = {
      type: SET_FILTER_BY,
      filterBy,
    }
    dispatch(action)
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
      <ToyFilter filterBy={defaultFilter} onSetFilterBy={setFilterSort} />
      <ToySort filterBy={defaultFilter} onSetFilterBy={setFilterSort} />
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
