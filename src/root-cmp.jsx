import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
// import { AboutUs } from './pages/AboutUs.jsx'

import { store } from './store/store.js'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { StoreLocations } from './pages/StoreLocations.jsx'
import { ToyDash } from './pages/ToyDash.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { ReviewExplore } from './pages/ReviewExplore.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

// import "../src/assets/style/main.css"

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className='app'>
          <AppHeader />
          <UserMsg />
          <main className='main-layout'>
            <Routes>
              <Route element={<Home />} path='/' />
              <Route element={<ToyDash />} path='/toy/dash' />
              {/* <Route element={<AboutUs />} path="/about" /> */}
              <Route element={<ToyIndex />} path='/toy' />
              <Route element={<ToyEdit />} path='/toy/edit' />
              <Route element={<ToyEdit />} path='/toy/edit/:toyId' />
              <Route element={<ToyDetails />} path='/toy/:toyId' />
              <Route element={<StoreLocations />} path='/toy/stores' />
              <Route element={<ReviewExplore />} path='/review' />
              <Route element={<UserDetails />} path='/user' />
              <Route element={<LoginSignup />} path='/auth/login' />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}
