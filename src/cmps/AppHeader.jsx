import { Link, NavLink, useNavigate } from 'react-router-dom'

import { UserMsg } from './UserMsg.jsx'
import { setFilter } from '../store/actions/toy.actions.js'
import { ToyFilterSearch } from './ToyFilterSearch.jsx'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/logo-home.png'
import { logout } from '../store/actions/user.actions.js'
import { LoginSignup } from '../pages/LoginSignup.jsx'

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  function handleSetFilter(filterBy) {
    dispatch(setFilter(filterBy))
  }

  async function onLogout() {
    try {
      await logout()
      showSuccessMsg('Logout successfully')
      navigate('/')
    } catch (err) {
      console.log('err:', err)
      showErrorMsg('Cannot logout')
    }
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
              {user && (
                <section className='user-info'>
                  {/* <p>
                    {user.fullname} <span>${user.score.toLocaleString()}</span>
                  </p> */}
                  <button onClick={onLogout}>Logout</button>
                </section>
              )}
              {!user && (
                <section className='user-info'>
                  <LoginSignup />
                </section>
              )}
              <UserMsg />
            </li>
              <>
                <li>
                  <p> My Orders</p>
                </li>
                <li>
                  <p> Cart</p>
                </li>
                <li>
                  <NavLink to='/toy/dash'>Toy info chart</NavLink>
                </li>
              </>
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
