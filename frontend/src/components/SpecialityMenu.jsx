import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <section
            id='speciality'
            className='py-20 px-6 bg-slate-50'
        >
            {/* Heading */}
            <div className='text-center'>
                <p className='text-cyan-600 font-semibold uppercase tracking-widest'>
                    Our Specialities
                </p>

                <h2 className='text-4xl md:text-5xl font-bold text-slate-800 mt-3'>
                    Find the Right Specialist
                </h2>

                <p className='text-gray-500 mt-5 max-w-2xl mx-auto leading-7'>
                    Connect with experienced healthcare professionals across
                    multiple specialties and schedule appointments with ease.
                </p>
            </div>

            {/* Cards */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-16'>

                {specialityData.map((item, index) => (

                    <Link
                        key={index}
                        to={`/doctors/${item.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        className='bg-white rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-3 transition-all duration-300 flex flex-col items-center'
                    >

                        <img
                            src={item.image}
                            alt={item.speciality}
                            className='w-20 h-20 object-contain'
                        />

                        <p className='mt-5 text-slate-700 font-semibold text-center'>
                            {item.speciality}
                        </p>

                    </Link>

                ))}

            </div>

        </section>
    )
}

export default SpecialityMenu