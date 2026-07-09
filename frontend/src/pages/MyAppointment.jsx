import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  // Getting User Appointments Data Using API
  const getUserAppointments = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      setAppointments(data.appointments.reverse())

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Function to cancel appointment Using API
  const cancelAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {

        console.log(response)

        try {
          const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
          if (data.success) {
            navigate('/my-appointments')
            getUserAppointments()
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  // Function to make payment using razorpay
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  // Generate appointment data from doctors
  useEffect(() => {
    if (doctors.length) {
      const generatedAppointments = doctors.slice(0, 3).map((doc, idx) => ({
        _id: `appointment_${idx}`,
        docData: {
          name: doc.name,
          speciality: doc.speciality,
          image: doc.image,
          address: doc.address || { line1: "Street X", line2: "City Y" }
        },
        slotDate: `12_0${idx + 1}_2025`,
        slotTime: `${10 + idx}:00 AM`,
        payment: idx === 1,         // Simulate second one as paid
        isCompleted: idx === 2,     // Simulate third one as completed
        cancelled: false
      }))
      setAppointments(generatedAppointments)
    }
  }, [doctors])



  const simulateStripe = () => toast.info("Redirecting to Stripe...")
  const simulateRazorpay = () => toast.info("Opening Razorpay...")

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 rounded-3xl p-10 text-white shadow-xl mb-10">

        <h1 className="text-4xl font-bold">
          My Appointments
        </h1>

        <p className="mt-3 text-blue-100 text-lg">
          Track, manage and pay for all your appointments in one place.
        </p>

      </div>
      <div className=''>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="
    bg-white
    rounded-3xl
    shadow-lg
    hover:shadow-2xl
    transition-all
    duration-300
    p-6
    mb-8
    flex
    flex-col
    lg:flex-row
    gap-6
    "
          >
            <div>
              <img className="w-40 h-40 rounded-2xl object-cover bg-gradient-to-br from-blue-100 to-cyan-50" src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-[#5E5E5E]'>
              <h2 className="text-2xl font-bold text-slate-800"></h2>
              <h2 className="text-2xl font-bold text-slate-800">
                {item.docData.name}
              </h2>

              <p className="text-cyan-600 font-semibold mt-1">
                {item.docData.speciality}
              </p>
              <div className="mt-4">

                <p className="font-semibold text-slate-700">
                  Clinic Address
                </p>

                <p className="text-gray-500">
                  {item.docData.address.line1}
                </p>

                <p className="text-gray-500">
                  {item.docData.address.line2}
                </p>

              </div>
              <div className="flex flex-wrap gap-4 mt-5">

                <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                  📅 {slotDateFormat(item.slotDate)}
                </span>

                <span className="bg-cyan-50 text-cyan-700 px-4 py-2 rounded-full">
                  🕒 {item.slotTime}
                </span>

              </div>

            </div>
            <div></div>
            <div className="mb-4">

              {item.payment ? (
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                  ✓ Paid
                </span>
              ) : (
                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                  Pending Payment
                </span>
              )}

            </div>
            <div className='flex flex-col gap-2 justify-end text-sm text-center'>
              {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                <button
                  onClick={() => setPayment(item._id)}
                  className="sm:min-w-48 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-700 to-cyan-500 text-white hover:shadow-lg transition-all duration-300"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && <button onClick={() => appointmentRazorpay(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="" /></button>}
              {!item.cancelled && item.payment && !item.isCompleted && <button className="sm:min-w-48 py-3 rounded-xl bg-green-100 text-green-700 border border-green-500 font-semibold">
                ✓ Paid
              </button>}

              {item.isCompleted && <button className="sm:min-w-48 py-3 rounded-xl bg-green-100 text-green-700 border border-green-500 font-semibold">
                ✓ Completed
              </button>}

              {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
