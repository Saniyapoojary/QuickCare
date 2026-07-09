import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className="p-6">

    <div className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 rounded-3xl p-10 text-white shadow-xl mb-10 w-full">

        <h1 className="text-4xl font-bold">
            Admin Dashboard
        </h1>

        <p className="mt-3 text-blue-100 text-lg">
            Welcome back! Here's an overview of today's healthcare activities.
        </p>

    </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="
bg-white
rounded-3xl
shadow-lg
hover:shadow-2xl
transition-all
duration-300
hover:-translate-y-2
p-8
flex
items-center
gap-5
">
          <img className='w-16' src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-4xl font-bold text-slate-800">{dashData.doctors}</p>
            <p className="text-gray-500 text-lg">Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-4xl font-bold text-slate-800'>{dashData.appointments}</p>
            <p className='text-gray-500 text-lg'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-4xl font-bold text-slate-800'>{dashData.patients}</p>
            <p className='text-gray-500 text-lg'>Patients</p></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl mt-12 overflow-hidden">
        <div className="flex items-center gap-3 px-8 py-6 bg-slate-50 border-b">
          <img src={assets.list_icon} alt="" />
          <p className="text-2xl font-bold text-slate-800">Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className="
flex
items-center
px-8
py-5
gap-5
hover:bg-cyan-50
transition
duration-300
border-b
last:border-none
" key={index}>
              <img className="w-16 h-16 rounded-full object-cover border-2 border-cyan-200" src={item.docData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className="text-lg font-bold text-slate-800">{item.docData.name}</p>
                <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
    Cancelled
</span> : item.isCompleted ? <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
    Completed
</span> : <div
    onClick={() => cancelAppointment(item._id)}
    className="bg-red-50 hover:bg-red-100 rounded-full p-3 cursor-pointer transition"
>

    <img
        className="w-6"
        src={assets.cancel_icon}
        alt=""
    />

</div>}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard