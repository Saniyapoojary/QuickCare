import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className='py-20 px-6 bg-white'>
      <div className="text-center mb-14">

        <p className="text-cyan-600 uppercase tracking-widest font-semibold">
          Our Doctors
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-3">
          Meet Our Specialists
        </h2>

        <p className="text-gray-500 mt-5 max-w-2xl mx-auto leading-7">
          Experienced professionals dedicated to providing compassionate
          healthcare with modern medical expertise.
        </p>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="
    bg-white
    rounded-3xl
    overflow-hidden
    shadow-md
    hover:shadow-2xl
    hover:-translate-y-3
    transition-all
    duration-300
    cursor-pointer
    "
          >
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50">

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />

            </div>
            <div className="p-6">

    <div className="flex items-center justify-between">

        <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
                item.available
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
            }`}
        >
            {item.available ? "Available Today" : "Unavailable"}
        </span>

        <span className="text-yellow-500">
            ★ 4.9
        </span>

    </div>

    <h3 className="text-xl font-bold text-slate-800 mt-5">
        {item.name}
    </h3>

    <p className="text-gray-500 mt-2">
        {item.speciality}
    </p>

    <button
        className="
        mt-6
        w-full
        py-3
        rounded-xl
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        text-white
        font-semibold
        hover:opacity-90
        transition
        "
    >
        Book Appointment
    </button>

</div>
          </div>
        ))}
      </div>
      <button
    onClick={() => {
        navigate('/doctors');
        scrollTo(0,0);
    }}
    className="
    mt-16
    px-10
    py-4
    rounded-full
    bg-gradient-to-r
    from-blue-600
    to-cyan-500
    text-white
    font-semibold
    shadow-lg
    hover:scale-105
    transition
    "
>
    View All Doctors
</button>
    </div>

  )
}

export default TopDoctors
