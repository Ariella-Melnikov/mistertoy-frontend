import { httpService } from './http.service.js'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'


const labels = [
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
  'Baby'
]


export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
  getToyLabels,
  addMsg,
  removeMsg,
}

function query(filterBy = {}, sortBy, pageIdx) {
  return httpService.get(BASE_URL, { filterBy, sortBy, pageIdx })
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  const method = toy._id ? 'put' : 'post'
  return httpService[method](BASE_URL, toy)
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: _getRandomLabels(),
  }
}

function getDefaultFilter() {
  return {
    txt: '',
    inStock: null,
    labels: [],
    pageIdx: 0,
  }
}

function getDefaultSort() {
  return { type: '', desc: 1 }
}

function getToyLabels() {
  return [...labels]
}

async function addMsg(toyId, txt) {
  // console.log('toyId',toyId , txt)
  const savedMsg = await httpService.post(`toy/${toyId}/msg`, { txt })
  return savedMsg
}

async function removeMsg(toyId, msgId) {
  const removedId = await httpService.delete(`toy/${toyId}/msg/${msgId}`)
  return removedId
}

function _getRandomLabels() {
  const labelsCopy = [...labels]
  const randomLabels = []
  for (let i = 0; i < 2; i++) {
    const randomIdx = Math.floor(Math.random() * labelsCopy.length)
    randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
  }
  return randomLabels
}

// const uploadImg = async (ev) => {
//   //Defining our variables
//   // const CLOUD_NAME = 'insert1'
//   const CLOUD_NAME = 'dkykllpf5'
//   const UPLOAD_PRESET = 'toy_uploads'
//   // const UPLOAD_PRESET = 'insert2'
//   const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
//   const FORM_DATA = new FormData()
  
//   //Bulding the request body
//   FORM_DATA.append('file', ev.target.files[0])
//   FORM_DATA.append('upload_preset', UPLOAD_PRESET)

//   // Sending a post method request to Cloudinarys API
//   try {
//     const res = await fetch(UPLOAD_URL, {
//       method: 'POST',
//       body: FORM_DATA,
//     })
//     const { url } = await res.json()
//     console.log('url:', url)
//     const elImg = document.createElement('img')
//     elImg.src = url
//     document.body.append(elImg)
//   } catch (err) {
//     console.error(err)
//   }
// }