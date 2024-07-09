import { useState } from 'react'
// const Router = ReactRouterDOM.BrowserRouter
// const { Route, Routes } = ReactRouterDOM
// const { Provider } = ReactRedux
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

// import { AppHeader } from './cmps/AppHeader.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'

// import { HomePage } from './pages/HomePage.jsx'
// import { AboutUs } from './pages/AboutUs.jsx'
// import { CarIndex } from './pages/CarIndex.jsx'
// import { store } from './store/store.js'
// import { CarEdit } from './pages/CarEdit.jsx'
// import { CarDetails } from './pages/CarDetails.jsx'
// import { UserDetails } from './pages/UserDetails.jsx'

import "../src/assets/style/main.css"


export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          {/* <AppHeader /> */}
          <main className='main-layout'>
            {/* <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<CarIndex />} path="/car" />
              <Route element={<CarEdit />} path="/car/edit" />
              <Route element={<CarEdit />} path="/car/edit/:carId" />
              <Route element={<CarDetails />} path="/car/:carId" />
              <Route element={<UserDetails />} path="/user/:userId" />
            </Routes> */}
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>

  )
}
