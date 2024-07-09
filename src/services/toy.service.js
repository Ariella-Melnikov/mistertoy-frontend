import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getFilterFromSearchParams,
}

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy)
  } else {
    return httpService.post(BASE_URL, toy)
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: 0,
    labels: [],
    inStock: true,
  }
}

function getDefaultFilter() {
  return {
    name: '',
    inStock: 'all',
    price: 0,
    sort: '',
  }
}

function getFilterFromSearchParams(searchParams) {
  const filterBy = {
    name: searchParams.get('name') || '',
    inStock: searchParams.get('inStock') || 'all',
    price: +searchParams.get('price') || 0,
    sort: searchParams.get('sort') || '',
  }

  return filterBy
}
