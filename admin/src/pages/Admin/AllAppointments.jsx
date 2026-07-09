import React, { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5 '>

      <div className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 rounded-3xl p-10 text-white shadow-xl mb-8">

    <span className="bg-white/20 px-4 py-1 rounded-full text-sm inline-block mb-4">
        Admin Portal
    </span>

    <h1 className="text-4xl font-bold">
        All Appointments
    </h1>

    <p className="mt-3 text-blue-100">
        Manage patient appointments, cancellations and completed consultations.
    </p>

</div>

      <div className="
bg-white
rounded-3xl
shadow-xl
overflow-hidden
text-sm
max-h-[80vh]
overflow-y-auto
">
        <div className="
hidden
sm:grid
grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]
bg-slate-50
text-slate-700
font-semibold
px-6
py-4
border-b
">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className="
flex
flex-wrap
justify-between
max-sm:gap-3
sm:grid
sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]
items-center
px-6
py-5
border-b
hover:bg-cyan-50
transition-all
duration-300
" key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className="flex items-center gap-3">

    <img
        src={item.userData.image}
        className="w-12 h-12 rounded-full object-cover border-2 border-cyan-300"
        alt=""
    />

    <div>

        <p className="font-semibold text-slate-800">
            {item.userData.name}
        </p>

        <p className="text-xs text-gray-500">
            Patient
        </p>

    </div>

</div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <div>

    <p className="font-semibold text-slate-700">
        {slotDateFormat(item.slotDate)}
    </p>

    <p className="text-cyan-600 text-sm">
        {item.slotTime}
    </p>

</div>
            <div className="flex items-center gap-3">

    <img
        src={item.docData.image}
        className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
        alt=""
    />

    <div>

        <p className="font-semibold text-slate-800">
            {item.docData.name}
        </p>

        <p className="text-xs text-cyan-600">
            Doctor
        </p>

    </div>

</div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
    {currency}{item.amount}
</span>
            {item.cancelled ? (

    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
        Cancelled
    </span>

) : item.isCompleted ? (

    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
        Completed
    </span>

) : (

    <button
        onClick={() => cancelAppointment(item._id)}
        className="bg-red-50 text-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
    >
        Cancel
    </button>

)}
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllAppointments