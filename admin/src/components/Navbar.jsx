import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  const goToUserPanel = () => {
    window.location.href = 'http://localhost:5173/'
  }

  const isOnDashboard =
    location.pathname === '/admin-dashboard' ||
    location.pathname === '/doctor-dashboard'

  return (
    <div className="
flex
justify-between
items-center
px-8
lg:px-12
py-4
bg-white
border-b
shadow-sm
">
      <div className='flex items-center gap-3 text-xs'>

        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          className="w-52 cursor-pointer"
          src={assets.admin_logo}
          alt="Logo"
        />

        {/* Role Label */}
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>

        {/* User Panel Button (visible on both dashboards) */}
        {isOnDashboard && (
          <button
            onClick={goToUserPanel}
            className="
ml-3
px-5
py-2
rounded-xl
bg-gradient-to-r
from-blue-700
to-cyan-500
text-white
font-medium
shadow-md
hover:scale-105
transition 
"
          >
            User Panel
          </button>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="
bg-gradient-to-r
from-red-500
to-pink-500
text-white
font-semibold
px-8
py-3
rounded-xl
shadow-lg
hover:shadow-xl
hover:scale-105
transition-all
duration-300
"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
