import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Loader } from '../cmps/Loader.jsx'
import { PaginationButtons } from '../cmps/PaginationButtons.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys, saveToy, setFilter, setSort, removeToyOptimistic } from '../store/actions/toy.actions.js'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)

  console.log('toys', toys)

  const [pageIdx, setPageIdx] = useState(0)

  useEffect(() => {
    loadToys(pageIdx).catch((err) => {
      console.log('err:', err)
      showErrorMsg('Cannot load toys')
    })
  }, [filterBy, sortBy, pageIdx])

  function onRemoveToy(toyId) {
    const ans = confirm('Do you want to delete this toy?')
    if (!ans) return
    removeToyOptimistic(toyId)
      .then(() => {
        loadToys(pageIdx)
        showSuccessMsg(`Removed toy successfully`)
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Cannot remove toy ' + toyId)
      })
  }


  function onSetFilter(filterBy) {
    setFilter(filterBy)
  }

  function onSetSort(sortBy) {
    setSort(sortBy)
  }

  return (
    <section className='toy-index'>
      <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} sortBy={sortBy} onSetSort={onSetSort} />
      {user && user.isAdmin && (
        <button className='add-btn'>
          <Link to='/toy/edit'>Add toy 🧸</Link>
        </button>
      )}
      {isLoading && <Loader />}
      {!isLoading && <ToyList toys={toys} user={user} onRemoveToy={onRemoveToy}  />}
      <PaginationButtons pageIdx={pageIdx} setPageIdx={setPageIdx} toysLength={toys.length} />
    </section>
  )
}


// function onToggleToy(toy) {
//   const toyToSave = { ...toy, inStock: !toy.inStock }
//   saveToy(toyToSave)
//     .then(() => {
//       showSuccessMsg(`Updated ${toyToSave.name} successfully`)
//       return toyToSave
//     })
//     .catch(() => showErrorMsg('Had trouble updating the toy'))
// }