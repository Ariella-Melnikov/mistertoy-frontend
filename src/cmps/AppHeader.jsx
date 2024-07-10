import { Link, NavLink } from 'react-router-dom'

import { UserMsg } from './UserMsg.jsx'
import { setFilter } from '../store/actions/toy.actions.js'
import { ToyFilterSearch } from './ToyFilterSearch.jsx'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/logo-home.png'


export function AppHeader() {
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const dispatch = useDispatch()

  function handleSetFilter(filterBy) {
    dispatch(setFilter(filterBy))
  }

  return (
    <header className='app-header full main-layout'>
      <section className='upper-head-container full'>
        <nav className='app-header-nav app-nav'>
        <p> add coin/language</p>
          <Link to='/toy/stores'>Find a store</Link>
          <div className='app-nav app-nav-last-child' >
          <NavLink to='/'>Home</NavLink>
          {/* <NavLink to="/about" >About</NavLink> */}
          <NavLink to='/toy'>Toys</NavLink>
          <NavLink to='/toy/dash'>Toy info chart</NavLink>
          </div>
        </nav>
      </section>
      <section className='header-container'>
        <section className='first-row-container'>
          <div className="logo-container">
            <img src={logo} alt='logo' />
          </div>

          <div>
            <ToyFilterSearch filterBy={filterBy} onSetFilter={handleSetFilter} />
          </div>
        </section>

      </section>
      <UserMsg />
    </header>
  )
}
