import { toyService } from '../../services/toy.service.js'
import { showSuccessMsg } from '../../services/event-bus.service.js'
import {
  ADD_TOY,
  REMOVE_TOY,
  SET_FILTER_BY,
  SET_IS_LOADING,
  SET_SORT_BY,
  SET_TOYS,
  TOY_UNDO,
  UPDATE_TOY,
} from '../reducers/toy.reducer.js'
import { store } from '../store.js'

export async function loadToys() {
  try {
    const { filterBy, sortBy } = store.getState().toyModule
    const toys = await toyService.query(filterBy, sortBy)
    store.dispatch({ type: SET_TOYS, toys })
    return toys
  } catch (err) {
    console.log('toy action -> Cannot load toys', err)
    throw err
  }
}

export async function removeToy(toyId) {
  try {
    await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
  } catch (err) {
    console.log('toy action -> Cannot remove toy', err)
    throw err
  }
}

export async function removeToyOptimistic(toyId) {
  store.dispatch({ type: REMOVE_TOY, toyId })
  try {
    await toyService.remove(toyId)
    showSuccessMsg('Removed toy!')
  } catch (err) {
    store.dispatch({ type: TOY_UNDO })
    console.log('toy action -> Cannot remove toy', err)
    throw err
  }
}

export async function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  try {
    const toyToSave = await toyService.save(toy)
    store.dispatch({ type, toy: toyToSave })
    return toyToSave
  } catch (err) {
    console.log('toy action -> Cannot save toy', err)
    throw err
  }
}

export function setFilter(filterBy = toyService.getDefaultFilter()) {
  store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSort(sortBy = toyService.getDefaultSort()) {
  store.dispatch({ type: SET_SORT_BY, sortBy })
}
