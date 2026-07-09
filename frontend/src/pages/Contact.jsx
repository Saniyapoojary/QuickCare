import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

     <div className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 rounded-3xl p-12 text-center text-white shadow-xl mb-14">

    <h1 className="text-5xl font-bold">
        Contact QuickCare
    </h1>

    <p className="mt-5 text-blue-100 text-lg">
        We're here to help. Reach out to us anytime for support or inquiries.
    </p>

</div>

      <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col lg:flex-row gap-12 items-center">
        <img className="w-full lg:max-w-[420px] rounded-3xl shadow-lg" src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <div className="bg-slate-50 rounded-2xl p-6 border border-cyan-100">
    <h3 className="text-xl font-bold text-slate-800">
        📍 Our Office
    </h3>

    <p className="text-gray-600 mt-3">
        54709 Willms Station
        <br />
        Suite 350, Washington, USA
    </p>
</div>

<div className="bg-slate-50 rounded-2xl p-6 border border-cyan-100">
    <h3 className="text-xl font-bold text-slate-800">
        📞 Contact
    </h3>

    <p className="text-gray-600 mt-3">
        +91 90000 90000
        <br />
        customersupport@quickcare.in
    </p>
</div>

<div className="bg-slate-50 rounded-2xl p-6 border border-cyan-100">
    <h3 className="text-xl font-bold text-slate-800">
        🕒 Working Hours
    </h3>

    <p className="text-gray-600 mt-3">
        Monday - Saturday
        <br />
        9:00 AM – 8:00 PM
    </p>
</div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 rounded-3xl text-center p-12 text-white mt-16">

    <h2 className="text-4xl font-bold">
        Ready to Book an Appointment?
    </h2>

    <p className="mt-4 text-blue-100">
        Find experienced doctors and schedule your appointment today.
    </p>

    <button
        className="mt-8 bg-white text-blue-700 px-10 py-4 rounded-xl font-semibold hover:scale-105 transition"
    >
        Book Appointment
    </button>

</div>

    </div>
  )
}

export default Contact
