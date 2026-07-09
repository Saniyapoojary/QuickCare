import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import { assets } from './assets/assets'
import RelatedDoctors from './components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const doc = doctors.find((doc) => doc._id === docId)
    if (doc) {
      // Ensure slots_booked is always at least an empty object
      setDocInfo({ ...doc, slots_booked: doc.slots_booked || {} })
    }
  }

  const getAvailableSlots = () => {
    if (!docInfo) return
    setDocSlots([])

    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })

        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        const slotDate = `${day}_${month}_${year}`
        const slotTime = formattedTime

        const isSlotAvailable =
          !docInfo?.slots_booked?.[slotDate] ||
          !docInfo.slots_booked[slotDate].includes(slotTime)

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots((prev) => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {

    if (!token) {
      toast.warning('Login to book appointment')
      return navigate('/login')
    }

    const date = docSlots[slotIndex][0].datetime

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const slotDate = day + "_" + month + "_" + year

    try {

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo()
    }
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  return (
    docInfo && (
      <div>
        {/* Doctor details */}
        <div className="grid lg:grid-cols-3 gap-10 mb-16">
          <div className="bg-gradient-to-br from-blue-100 via-cyan-50 to-white rounded-3xl shadow-lg overflow-hidden">

            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-full h-full object-cover"
            />

          </div>
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-10">
            <p className='flex items-center gap-3 text-4xl font-bold text-slate-800'>
              {docInfo.name} <img src={assets.verified_icon} alt="" />
            </p>
            <div className='flex items-center gap-2 mt-1 text-gray-600'>
              <p className="text-lg text-gray-500">

                {docInfo.degree}

                •

                {docInfo.speciality}

              </p>
              <span className="px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 font-semibold text-sm">

                {docInfo.experience}

              </span>
            </div>
           <div className="flex items-center gap-2 mt-5">

<span className="text-yellow-500 text-xl">
★★★★★
</span>

<span className="text-gray-500">
4.9 (520 Reviews)
</span>

</div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 mt-8">

                About Doctor

              </h2>
              <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
            </div>
            <div className="mt-8 flex items-center gap-4 bg-cyan-50 rounded-2xl px-6 py-4 w-fit">

<div className="text-3xl">

</div>

<div>

<p className="text-sm text-gray-500">
Consultation Fee
</p>

<h3 className="text-2xl font-bold text-slate-800">
₹ {docInfo.fees}
</h3>

</div>

</div>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-12 bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Choose Your Appointment
          </h2>

          <p className="text-gray-500 mt-2">
            Select your preferred date and available time.
          </p>

          {/* Days Scroll */}
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  key={index}
                  className={`
min-w-[80px]
text-center
py-4
rounded-2xl
cursor-pointer
transition-all
duration-300
hover:-translate-y-1
${
slotIndex===index
?
"bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
:
"bg-white border border-gray-200 text-gray-700 hover:shadow-md"
}
`}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* Time Slots Scroll */}
          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
            {docSlots.length > 0 &&
              docSlots[slotIndex] &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`
flex-shrink-0
px-6
py-3
rounded-xl
cursor-pointer
font-medium
transition-all
duration-300
${
item.time===slotTime
?
"bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
:
"border border-gray-300 bg-white text-gray-600 hover:shadow-md"
}
`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            className="
mt-8
px-12
py-4
rounded-xl
bg-gradient-to-r
from-blue-700
to-cyan-500
text-white
font-semibold
shadow-lg
hover:shadow-xl
hover:scale-105
transition-all
duration-300
"
          >
            Book an appointment
          </button>
        </div>

        {/* Related Doctors */}
        <div className="mt-16">
    <RelatedDoctors
        speciality={docInfo.speciality}
        docId={docId}
    />
</div>
      </div>
    )
  )
}

export default Appointment
