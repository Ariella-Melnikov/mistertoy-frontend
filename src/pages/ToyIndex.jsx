import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

import { Loader } from '../cmps/Loader.jsx'
// import { PaginationButtons } from '../cmps/PaginationButtons.jsx'
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

  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedToys = toys.slice(startIndex, endIndex)

  useEffect(() => {
    try {
      loadToys()
    } catch (err) {
      console.log('err:', err)
      showErrorMsg('Cannot load toys')
    }
  }, [filterBy, sortBy])

  async function onRemoveToy(toyId) {
    const ans = confirm('Do you want to delete this toy?')
    if (!ans) return
    try {
      await removeToyOptimistic(toyId)
      showSuccessMsg(`Toy ${toyId} removed`)
    } catch (err) {
      console.error(`Cannot remove toy ${toyId}`, err)
      showErrorMsg('Cannot remove toy')
    }
  }

  function onSetFilter(filterBy) {
    setFilter(filterBy)
    setCurrentPage(0)
  }

  function onSetSort(sortBy) {
    setSort(sortBy)
    setCurrentPage(0)
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
      {!isLoading && <ToyList toys={toys} user={user} onRemoveToy={onRemoveToy} />}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(toys.length / itemsPerPage)}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </section>
  )
}
