import { httpService } from './http.service.js'
// import { storageService } from './async-storage.service'
// import { userService } from './user.service'


export const reviewService = {
  add,
  query,
  remove
}

function query(filterBy) {
  return httpService.get(`review`, filterBy)
}


async function remove(reviewId) {
  console.log('reviewId', reviewId)
  await httpService.delete(`review/${reviewId}`)
}

async function add({ txt, aboutToyId }) {
  const addedReview = await httpService.post(`review`, { txt, aboutToyId })
  console.log('addedReview ', addedReview )
  return addedReview
}