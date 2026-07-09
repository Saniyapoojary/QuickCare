import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => { 
    event.preventDefault();

    if (state === 'Admin') {

      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  return (
    <form
    onSubmit={onSubmitHandler}
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 px-6"
  >
    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-700 via-cyan-500 to-teal-400 p-12 text-white">

        <img
          src="https://img.icons8.com/fluency/480/doctor-male.png"
          alt=""
          className="w-72 mb-8"
        />

        <h2 className="text-4xl font-bold">
          {state === "Admin" ? "Admin Portal" : "Doctor Portal"}
        </h2>

        <p className="mt-5 text-blue-100 text-center leading-8 max-w-md">
          {state === "Admin"
            ? "Manage doctors, appointments and patients from one powerful dashboard."
            : "Access your appointments, manage patients and update your availability."}
        </p>

      </div>

      {/* Right Side */}
      <div className="p-10 md:p-14 flex flex-col justify-center">

        <div className="mb-8">

          <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full font-semibold text-sm">
            {state}
          </span>

          <h1 className="text-4xl font-bold text-slate-800 mt-5">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-3">
            Sign in to continue to your {state.toLowerCase()} dashboard.
          </p>

        </div>

        <div className="mb-5">
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

        <div className="mb-7">
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
          Login as {state}
        </button>

        <div className="text-center mt-8">

          {state === "Admin" ? (
            <p className="text-gray-500">
              Doctor Login?
              <span
                onClick={() => setState("Doctor")}
                className="ml-2 text-cyan-600 font-semibold cursor-pointer hover:text-blue-700"
              >
                Click here
              </span>
            </p>
          ) : (
            <p className="text-gray-500">
              Admin Login?
              <span
                onClick={() => setState("Admin")}
                className="ml-2 text-cyan-600 font-semibold cursor-pointer hover:text-blue-700"
              >
                Click here
              </span>
            </p>
          )}

        </div>

      </div>

    </div>
  </form>
  )
}

export default Login