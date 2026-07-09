import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors , aToken , getAllDoctors, changeAvailability} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
}, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <div className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 rounded-3xl p-10 text-white shadow-xl mb-8">

    <span className="bg-white/20 px-4 py-1 rounded-full text-sm inline-block mb-4">
        Admin Portal
    </span>

    <h1 className="text-4xl font-bold">
        Doctors Directory
    </h1>

    <p className="mt-3 text-blue-100">
        View, manage and control the availability of all registered doctors.
    </p>

</div>
      <div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
gap-8
">
        {doctors.map((item, index) => (
          <div className="
bg-white
rounded-3xl
shadow-lg
hover:shadow-2xl
overflow-hidden
transition-all
duration-300
hover:-translate-y-2
" key={index}>
            <img
className="
w-full
h-64
object-cover
bg-gradient-to-br
from-blue-100
to-cyan-50
"
src={item.image}
alt=""
/>
            <div className='p-6'>
              <h2 className="text-2xl font-bold text-slate-800">
    {item.name}
</h2>
              <p className="text-cyan-600 font-semibold mt-2">
    {item.speciality}
</p>
              <div className="mt-6 flex items-center justify-between">

    <span
        className={`px-4 py-2 rounded-full text-sm font-semibold ${
            item.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
        }`}
    >
        {item.available ? "Available" : "Unavailable"}
    </span>

    <label className="relative inline-flex items-center cursor-pointer">

        <input
            type="checkbox"
            checked={item.available}
            onChange={() => changeAvailability(item._id)}
            className="sr-only peer"
        />

        <div
            className="
            w-12
            h-6
            bg-gray-300
            rounded-full
            peer
            peer-checked:bg-cyan-500
            transition
            after:content-['']
            after:absolute
            after:left-[2px]
            after:top-[2px]
            after:bg-white
            after:h-5
            after:w-5
            after:rounded-full
            after:transition-all
            peer-checked:after:translate-x-6
            "
        />

    </label>

</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList