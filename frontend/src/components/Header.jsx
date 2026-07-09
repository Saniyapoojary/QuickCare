import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 rounded-3xl px-8 md:px-14 lg:px-20 py-14 md:py-20 lg:py-24 shadow-2xl overflow-hidden'>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-6 z-10'>
                <div>
                    <p className="uppercase tracking-[4px] text-blue-100 font-semibold">
                        QuickCare
                    </p>

                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mt-3">
                        Your Health,
                        <br />
                        Our Priority.
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <img className="w-36 rounded-full shadow-lg" src={assets.group_profiles} alt="" />
                    <p className="text-blue-50 text-lg leading-8 max-w-md">
                        Connect with experienced doctors, schedule appointments instantly,
                        and manage your healthcare journey effortlessly with QuickCare.
                    </p>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">

    <a
        href="#speciality"
        className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition duration-300"
    >
        Book Appointment
    </a>

    <a
        href="#top-doctors"
        className="border border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-700 transition duration-300"
    >
        Explore Doctors
    </a>

</div>
<div className="flex gap-10 mt-8">

    <div>
        <h2 className="text-3xl font-bold text-white">500+</h2>
        <p className="text-blue-100">Doctors</p>
    </div>

    <div>
        <h2 className="text-3xl font-bold text-white">20K+</h2>
        <p className="text-blue-100">Patients</p>
    </div>

    <div>
        <h2 className="text-3xl font-bold text-white">4.9★</h2>
        <p className="text-blue-100">Rating</p>
    </div>

</div>
            </div>

            {/* --------- Header Right --------- */}
            <div className="md:w-1/2 relative flex justify-center">
                <img className='w-full max-w-xl drop-shadow-2xl' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header