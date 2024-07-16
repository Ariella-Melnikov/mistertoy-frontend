import { Link, NavLink, useNavigate } from 'react-router-dom'

import { UserMsg } from './UserMsg.jsx'
import { setFilter } from '../store/actions/toy.actions.js'
import { ToyFilterSearch } from './ToyFilterSearch.jsx'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/logo-home.png'
import { logout } from '../store/actions/user.actions.js'

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
          <div className='site-switcher flex'>
            {/* <p> add coin/language</p> */}
            <NavLink to='/toy/stores'>Find a store</NavLink>
          </div>
          <div className='sign-in-tab flex'>
            {!user && (
              <span className='user-info'>
                <NavLink title='Login' to='/auth/login'>
                  <i className='fa-solid fa-user fa-lg'></i>
                </NavLink>
              </span>
            )}
            {user && (
              <span className='user-info'>
                <NavLink title='user-details' to='/user'>
                  {user.fullname}
                </NavLink>
                <button className='logout-btn' title='logout' onClick={onLogout}>
                  <i className='fa-solid fa-right-from-bracket fa-lg'></i>
                </button>
              </span>
            )}
            <>
              <p> My Orders</p>
              <p> Cart</p>
              <NavLink to='/toy/dash'>Toy info chart</NavLink>
            </>
          </div>
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
          <div className='toy-links flex'>
            <Link to='/toy'>Toys</Link>
            <p> Labels</p>
            <p>Label2</p>
            <p>Label3</p>
          </div>
        </nav>
      </div>
    </header>
  )
}
