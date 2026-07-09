import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

    <div className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 rounded-3xl p-12 text-center text-white shadow-xl mb-14">

    <h1 className="text-5xl font-bold">
        About QuickCare
    </h1>

    <p className="mt-5 text-blue-100 text-lg max-w-3xl mx-auto">
        Empowering patients with seamless healthcare experiences through trusted doctors,
        secure appointments, and innovative technology.
    </p>

</div>

     <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col lg:flex-row gap-12 items-center mb-16">
        <img className="w-full lg:max-w-[420px] rounded-3xl shadow-lg" src={assets.about_image} alt="" />
        <div className="flex flex-col justify-center gap-6 lg:w-2/3">
        <h2 className="text-3xl font-bold text-slate-800">
    Our Story
</h2>
          <p className="text-gray-600 leading-8 text-lg">Welcome to QuickCare, your trusted partner in managing your healthcare needs conveniently and efficiently. At QuickCare, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p className="text-gray-600 leading-8 text-lg">QuickCare is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, QuickCare is here to support you every step of the way.</p>
          <h3 className="text-2xl font-bold text-slate-800">Our Vision</h3>
          <p className="text-gray-600 leading-8 text-lg">Our vision at QuickCare is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      <div className="text-center mb-10">
    <h2 className="text-4xl font-bold text-slate-800">
        Why Choose QuickCare
    </h2>

    <p className="text-gray-500 mt-3">
        Healthcare made simple, secure and accessible.
    </p>
</div>

     <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className='bg-white
rounded-3xl
shadow-lg
hover:shadow-2xl
transition-all
duration-300
p-10
cursor-pointer
hover:-translate-y-2
border
border-cyan-100'>
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='bg-white
rounded-3xl
shadow-lg
hover:shadow-2xl
transition-all
duration-300
p-10
cursor-pointer
hover:-translate-y-2
border
border-cyan-100'>
          <b>CONVENIENCE: </b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='bg-white
rounded-3xl
shadow-lg
hover:shadow-2xl
transition-all
duration-300
p-10
cursor-pointer
hover:-translate-y-2
border
border-cyan-100'>
          <h3 className="text-xl font-bold text-slate-800">PERSONALIZATION:</h3>
          <p >Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 rounded-3xl p-12 text-white text-center shadow-xl mb-20">

    <h2 className="text-4xl font-bold mb-10">
        QuickCare in Numbers
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

        <div>
            <h3 className="text-5xl font-bold">500+</h3>
            <p className="text-blue-100 mt-2">Doctors</p>
        </div>

        <div>
            <h3 className="text-5xl font-bold">20K+</h3>
            <p className="text-blue-100 mt-2">Patients</p>
        </div>

        <div>
            <h3 className="text-5xl font-bold">50+</h3>
            <p className="text-blue-100 mt-2">Specialities</p>
        </div>

        <div>
            <h3 className="text-5xl font-bold">4.9★</h3>
            <p className="text-blue-100 mt-2">Rating</p>
        </div>

    </div>

</div>

    </div>
  )
}

export default About
