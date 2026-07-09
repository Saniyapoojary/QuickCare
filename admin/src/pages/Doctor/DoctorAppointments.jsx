import React from 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5 '>

      <div className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 rounded-3xl p-10 text-white shadow-xl mb-8">

        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          Doctor Portal
        </span>

        <h1 className="text-4xl font-bold mt-4">
          My Appointments
        </h1>

        <p className="mt-3 text-blue-100">
          View today's appointments, manage patients and update appointment status.
        </p>

      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] bg-gray-50 text-slate-700 font-semibold px-6 py-5 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className="
flex
flex-wrap
justify-between
max-sm:gap-5
sm:grid
grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr]
items-center
px-6
py-5
border-b
hover:bg-cyan-50
transition
" key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className="w-12 h-12 rounded-full object-cover border-2 border-cyan-300" alt="" /> <p className="font-semibold text-slate-800">
                {item.userData.name}
              </p>
            </div>
            <div>
              <p
                className={`
inline-block
px-4
py-2
rounded-full
text-xs
font-semibold
${item.payment
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"}
`}
              >
                {item.payment ? 'Online' : 'CASH'}
              </p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{currency}{item.amount}</p>
            {item.cancelled
              ? <span className="px-4 py-2 rounded-full bg-red-100 text-red-600 font-semibold">
    Cancelled
</span>
              : item.isCompleted
                ? <span className="px-4 py-2 rounded-full bg-green-100 text-green-600 font-semibold">
    Completed
</span>
                : <div className="flex gap-3">
                  <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                  <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                </div>
            }
          </div>
        ))}
      </div>

    </div>
  )
}

export default DoctorAppointments