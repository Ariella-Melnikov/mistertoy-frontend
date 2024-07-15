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
    <header className='main-header full'>
      <nav className='upper-nav main-layout'>
        <div>
          <ul className='site-switcher clean-list flex'>
            <li>
              <p> add coin/language</p>
            </li>
            <li>
              <NavLink to='/toy/stores'>Find a store</NavLink>
            </li>
          </ul>
          <ul className='sign-in-tab clean-list flex'>
            <li>
              <NavLink to='/toy/login'> Log In/Sign Up</NavLink>
            </li>
            <li>
              <p> My Orders</p>
            </li>
            <li>
              <p> Cart</p>
            </li>
            <li>
              <NavLink to='/toy/dash'>Toy info chart</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className='logo-serach main-layout'>
          <div className='flex'>
            <div className='main-header-logo flex'>
              <img src={logo} alt='logo' />
            </div>
            <div className='search-bar flex'>
              <ToyFilterSearch filterBy={filterBy} onSetFilter={handleSetFilter} />
            </div>
          </div>
        </div>
      <div className=' lower-nav main-layout '>
        <nav>
          <ul className='toy-links clean-list flex'>
            <li>
              <Link to='/toy'>Toys</Link>
            </li>
            <li>
              <p> Labels</p>
            </li>
            <li>
              <p>Label2</p>
            </li>
            <li>
              <p>Label3</p>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
