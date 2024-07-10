import { NavLink } from 'react-router-dom'

import { UserMsg } from './UserMsg.jsx'
import { setFilter } from '../store/actions/toy.actions.js'
import { ToyFilterSearch } from './ToyFilterSearch.jsx'
import { useDispatch, useSelector } from 'react-redux'
import logo from "../assets/img/logo-home.png"

export function AppHeader() {
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const dispatch = useDispatch()

  function handleSetFilter(filterBy) {
    dispatch(setFilter(filterBy))
  }

  return (
    <header className='app-header full main-layout'>
      <section className='upper-head-container'>
        <p>in renovation- add coin/language + Find a store</p>
      </section>
      <section className='header-container'>
        <section className='first row'>
          <div>
            <img src={logo} alt='logo' />
          </div>

          <div>
          <ToyFilterSearch filterBy={filterBy} onSetFilter={handleSetFilter} />
          </div>
        </section>
        <nav className='app-nav'>
          <NavLink to='/'>Home</NavLink>
          {/* <NavLink to="/about" >About</NavLink> */}
          <NavLink to='/toy'>Toys</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  )
}
