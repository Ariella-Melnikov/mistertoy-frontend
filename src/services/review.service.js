import { httpService } from './http.service'
// import { storageService } from './async-storage.service'
// import { userService } from './user.service'


export const reviewService = {
  add,
  query,
  remove
}

function query(filterBy) {
  return httpService.get(`review`, filterBy)

  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`;
  // console.log(filterBy);
  // if (filterBy.aboutToyId) {
  //   queryStr += `&aboutToyId=${filterBy.aboutToyId}`;
  // }

  // return httpService.get(`review${queryStr}`);
}


async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
  // await storageService.remove('review', reviewId)
}

async function add({ txt, aboutToyId }) {
  const addedReview = await httpService.post(`review`, { txt, aboutToyId })

  // const aboutUser = await userService.getById(aboutUserId)
  // const reviewToAdd = {
  //   txt,
  //   byUser: userService.getLoggedinUser(),
  //   aboutUser: {
  //     _id: aboutUser._id,
  //     fullname: aboutUser.fullname,
  //     imgUrl: aboutUser.imgUrl
  //   }
  // }

  // await userService.update(reviewToAdd.byUser)
  // const addedReview = await storageService.post('review', reviewToAdd)
  return addedReview
}