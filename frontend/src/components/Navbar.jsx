import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-100 flex items-center justify-between px-8 lg:px-16 py-3 shadow-sm">
      <div className="w-40 h-34 flex items-center">
        <img
    onClick={() => navigate('/')}
    src={assets.logo}
    alt="QuickCare"
    className="w-44 cursor-pointer hover:scale-105 transition duration-300"
/>
      </div>
      

      <ul className='hidden md:flex items-center gap-10 text-gray-700 font-semibold tracking-wide'>
        <li className='pb-0.5'>
          <NavLink to='/' className={({ isActive }) =>
    `transition-all duration-300 hover:text-cyan-600 ${
        isActive
            ? "text-cyan-600 border-b-2 border-cyan-500 pb-1"
            : "text-gray-700"
    }`
}>HOME</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/doctors' className={({ isActive }) =>
    `transition-all duration-300 hover:text-cyan-600 ${
        isActive
            ? "text-cyan-600 border-b-2 border-cyan-500 pb-1"
            : "text-gray-700"
    }`
}>ALL DOCTORS</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/about' className={({ isActive }) =>
    `transition-all duration-300 hover:text-cyan-600 ${
        isActive
            ? "text-cyan-600 border-b-2 border-cyan-500 pb-1"
            : "text-gray-700"
    }`
}>ABOUT</NavLink>
        </li>
        <li className='pb-0.5'>
          <NavLink to='/contact' className={({ isActive }) =>
    `transition-all duration-300 hover:text-cyan-600 ${
        isActive
            ? "text-cyan-600 border-b-2 border-cyan-500 pb-1"
            : "text-gray-700"
    }`
}>CONTACT</NavLink>
        </li>
      </ul>

      <div className='flex items-center gap-4'>

        {/* ✅ Admin Panel Button - show only on home page  */}
        {location.pathname === '/' && (
          <button
            onClick={() => window.open('http://localhost:5174', '_blank')}
            className="
bg-gradient-to-r
from-blue-700
to-cyan-500
text-white
px-5
py-2.5
rounded-full
font-medium
shadow-md
hover:shadow-lg
hover:-translate-y-1
transition-all
duration-300
"
          >
            Admin Panel
          </button>
        )}

        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-10 h-10
border-2 border-cyan-500 rounded-full' src={userData.image || '/fallback-user.png'} alt="profile" />
            <img className='w-2.5' src={assets.dropdown_icon || '/fallback-icon.png'} alt="dropdown" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="
hidden md:block
bg-gradient-to-r
from-blue-700
to-cyan-500
text-white
px-7
py-3
rounded-full
font-medium
shadow-md
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
"
          >
            Create Account
          </button>
        )}

        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img src={assets.logo} className='w-36' alt="" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
