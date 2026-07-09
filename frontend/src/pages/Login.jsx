import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }}catch(error){
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form
    onSubmit={onSubmitHandler}
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 px-6"
>
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Side */}
<div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 via-cyan-500 to-teal-400 p-12 text-white">

    <img
        src="https://undraw.co/api/illustrations/doctor.svg"
        alt=""
        className="w-80 mb-8"
    />
    

    <h2 className="text-4xl font-bold">
        Welcome to QuickCare
    </h2>

    <p className="mt-4 text-blue-100 text-center leading-8">
        Book appointments, connect with trusted doctors,
        and manage your healthcare anytime.
    </p>

</div>
{/* Right Side */}
<div className="p-10 md:p-14 flex flex-col justify-center">

    <h1 className="text-4xl font-bold text-slate-800">
        {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
    </h1>

    <p className="text-gray-500 mt-3 mb-8">
        {state === 'Sign Up'
            ? 'Create your QuickCare account to book appointments.'
            : 'Sign in to access your appointments and profile.'}
    </p>

    {state === 'Sign Up' && (
        <div className="w-full mb-5">
            <label className="font-semibold text-slate-700">
                Full Name
            </label>

            <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none transition"
            />
        </div>
    )}

    <div className="w-full mb-5">
        <label className="font-semibold text-slate-700">
            Email Address
        </label>

        <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none transition"
        />
    </div>

    <div className="w-full mb-6">
        <label className="font-semibold text-slate-700">
            Password
        </label>

        <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none transition"
        />
    </div>

    <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
    >
        {state === 'Sign Up' ? 'Create Account' : 'Login'}
    </button>

    <p className="text-center mt-6 text-gray-500">
        {state === 'Sign Up'
            ? 'Already have an account?'
            : "Don't have an account?"}

        <span
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
            className="ml-2 text-cyan-600 font-semibold cursor-pointer hover:text-blue-700 transition"
        >
            {state === 'Sign Up' ? 'Login' : 'Sign Up'}
        </span>
    </p>

</div>
        
      </div>
    </form>
  )
}

export default Login