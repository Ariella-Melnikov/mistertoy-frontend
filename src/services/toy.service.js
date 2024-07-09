import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
_createToys()

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
}

function query(filterBy = {}) {
  return storageService.query(STORAGE_KEY).then((toys) => {
    if (!filterBy.txt) filterBy.txt = ''
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    const regExp = new RegExp(filterBy.txt, 'i')
    return toys.filter((toy) => regExp.test(toy.name) && toy.price <= filterBy.maxPrice)
  })
}

function getById(toyId) {
  return storageService
    .get(STORAGE_KEY, toyId)
    .then((toy) => {
      toy = _setNextPrevToyId(toy)
      return toy
    })
    .catch((err) => {
      console.error('Cannot get toy:', err)
      throw err
    })
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  return (toy._id ? _edit(toy) : _add(toy)).then((savedToy) => {
    return savedToy
  })
}

function _add(toy) {
  toy = { ...toy }
  toy.createdAt = toy.updatedAt = Date.now()
  return storageService.post(STORAGE_KEY, toy).catch((err) => {
    console.error('Cannot add toy:', err)
    throw err
  })
}

function _edit(toy) {
  toy = { ...toy }
  toy.updatedAt = Date.now()
  return storageService.put(STORAGE_KEY, toy).catch((err) => {
    console.error('Cannot update toy:', err)
    throw err
  })
}

function getEmptyToy(name = '', price = 0, labels = []) {
  return {
    name,
    price,
    labels,
    inStock: true,
  }
}

function getDefaultFilter() {
  return { name: '', maxPrice: ''}
}

function _createToys() {
  let toys = utilService.loadFromStorage(STORAGE_KEY)
  if (!toys || !toys.length) {
    toys = []
    const names = [
      'Woody',
      'Buzz Lightyear',
      'Bo Peep',
      'Mr. Potato Head',
      'Slinky Dog',
      'Hamm',
      'Rex',
      'Sarge',
      'Aliens',
      'Rc',
      'Jessie',
      'Bullseye',
      'Wheezy',
      'Stinky Pete',
      'Mr. Pricklepants',
      'Trixie',
      'Dolly',
    ]
    const toyLabels = [
      'Doll',
      'Battery Powered',
      'Interactive',
      'Indoor',
      'Outdoor',
      'Action Figure',
      'Collectible',
      'Eco-friendly',
      'Fantasy',
      'Preschool',
      'Travel-friendly',
    ]
    for (let i = 0; i < 17; i++) {
      const name = names[i]
      const price = [utilService.getRandomIntInclusive(60, 130)]
      const labels = _getRandomLabels(toyLabels, 3)
      toys.push(_createToy(name, price, labels))
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
  }
}

function _createToy(name, price, labels) {
  const toy = getEmptyToy(name, price, labels)
  toy._id = utilService.makeId()
  toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
  return toy
}

function _getRandomLabels(labelArray, count) {
  let labelsCopy = [...labelArray]
  let selectedLabels = []
  for (let i = 0; i < count; i++) {
    const randomIndex = utilService.getRandomIntInclusive(0, labelsCopy.length - 1)
    selectedLabels.push(labelsCopy[randomIndex])
    labelsCopy.splice(randomIndex, 1)
  }
  return selectedLabels
}

function _setNextPrevToyId(toy) {
  return storageService.query(STORAGE_KEY).then((toys) => {
    const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
    const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
    const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
    toy.nextToyId = nextToy._id
    toy.prevToyId = prevToy._id
    return toy
  })
}

// const toy = {
//     _id: 't101',
//     name: 'Talking Doll',
//     price: 123,
//     labels: ['Doll', 'Battery Powered', 'Baby'],
//     createdAt: 1631031801011,
//     inStock: true,
//     }

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))
