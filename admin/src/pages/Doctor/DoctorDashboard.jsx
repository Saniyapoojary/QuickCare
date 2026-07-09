import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)


  useEffect(() => {

    if (dToken) {
      getDashData()
    }

  }, [dToken])

  return dashData && (
    <div className='m-5'>
      <div className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 rounded-3xl p-10 text-white shadow-xl mb-8">

    <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
        Doctor Portal
    </span>

    <h1 className="text-4xl font-bold mt-4">
        Doctor Dashboard
    </h1>

    <p className="mt-3 text-blue-100">
        Welcome back! Here's an overview of today's appointments and earnings.
    </p>

</div>

      <div className="grid md:grid-cols-3 gap-6">

    <div className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-2 transition">

        <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                <img className="w-9" src={assets.earning_icon} alt="" />
            </div>

            <div>
                <p className="text-3xl font-bold text-slate-800">
                    {currency} {dashData.earnings}
                </p>

                <p className="text-gray-500">
                    Total Earnings
                </p>
            </div>

        </div>

    </div>

    <div className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-2 transition">

        <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center">
                <img className="w-9" src={assets.appointments_icon} alt="" />
            </div>

            <div>
                <p className="text-3xl font-bold text-slate-800">
                    {dashData.appointments}
                </p>

                <p className="text-gray-500">
                    Appointments
                </p>
            </div>

        </div>

    </div>

    <div className="bg-white rounded-3xl shadow-lg p-6 hover:-translate-y-2 transition">

        <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
                <img className="w-9" src={assets.patients_icon} alt="" />
            </div>

            <div>
                <p className="text-3xl font-bold text-slate-800">
                    {dashData.patients}
                </p>

                <p className="text-gray-500">
                    Patients
                </p>
            </div>

        </div>

    </div>

</div>

      <div className="bg-white rounded-3xl shadow-xl mt-10 overflow-hidden">
        <div className="flex items-center gap-3 p-6 border-b bg-gray-50">
          <img src={assets.list_icon} alt="" />
          <p className="text-xl font-bold text-slate-800">
    Today's Appointments
</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className="flex items-center gap-5 px-6 py-5 hover:bg-cyan-50 transition border-b last:border-none" key={index}>
              <img className="w-14 h-14 rounded-full object-cover border-2 border-cyan-300" src={item.userData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className="font-bold text-slate-800 text-lg">{item.userData.name}</p>
                <p className='text-gray-500 '>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ?<span className="px-4 py-2 rounded-full bg-red-100 text-red-600 font-semibold">
    Cancelled
</span>
                : item.isCompleted
                  ? <span className="px-4 py-2 rounded-full bg-green-100 text-green-600 font-semibold">
    Completed
</span>
                  : <div className='flex'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                  </div>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard