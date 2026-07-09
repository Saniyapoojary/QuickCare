import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'



const Doctors = () => {

  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext)
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }
  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 rounded-3xl p-10 text-white shadow-xl">

        <h1 className="text-4xl md:text-5xl font-bold">
          Find Your Doctor
        </h1>

        <p className="mt-4 text-blue-100 text-lg max-w-2xl">
          Discover experienced healthcare professionals across multiple specialties.
          Book appointments quickly and receive quality care with QuickCare.
        </p>

        <div className="flex flex-wrap gap-8 mt-8">

          <div>
            <h2 className="text-3xl font-bold">
              {doctors.length}+
            </h2>
            <p className="text-blue-100">
              Doctors
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              20+
            </h2>
            <p className="text-blue-100">
              Specialities
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              24/7
            </h2>
            <p className="text-blue-100">
              Booking
            </p>
          </div>

        </div>

      </div>
      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
        <div
          className={`
lg:w-72
bg-white
rounded-3xl
shadow-lg
p-6
flex-col
gap-4
text-sm
${showFilter ? "flex" : "hidden lg:flex"}
`}
        >

          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Specialities
          </h2>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`
py-3
px-5
rounded-xl
cursor-pointer
transition-all
duration-300
border
${speciality === "General physician"
              ?
              "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-md"
              :
              "border-gray-200 hover:bg-cyan-50 hover:text-cyan-700"
            }
`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`
py-3
px-5
rounded-xl
cursor-pointer
transition-all
duration-300
border
${speciality === "Gynecologist"
              ?
              "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-md"
              :
              "border-gray-200 hover:bg-cyan-50 hover:text-cyan-700"
            }
`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`
py-3
px-5
rounded-xl
cursor-pointer
transition-all
duration-300
border
${speciality === "Dermatologist"
              ?
              "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-md"
              :
              "border-gray-200 hover:bg-cyan-50 hover:text-cyan-700"
            }
`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`
py-3
px-5
rounded-xl
cursor-pointer
transition-all
duration-300
border
${speciality === "Pediatricians"
              ?
              "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-md"
              :
              "border-gray-200 hover:bg-cyan-50 hover:text-cyan-700"
            }
`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`
py-3
px-5
rounded-xl
cursor-pointer
transition-all
duration-300
border
${speciality === "Neurologist"
              ?
              "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-md"
              :
              "border-gray-200 hover:bg-cyan-50 hover:text-cyan-700"
            }
`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`
py-3
px-5
rounded-xl
cursor-pointer
transition-all
duration-300
border
${speciality === "Gastroenterologist"
              ?
              "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-md"
              :
              "border-gray-200 hover:bg-cyan-50 hover:text-cyan-700"
            }
`}>Gastroenterologist</p>
        </div>
        <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {filterDoc.map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className="
bg-white
rounded-3xl
overflow-hidden
shadow-md
hover:shadow-2xl
hover:-translate-y-2
transition-all
duration-300
cursor-pointer
" key={index}>
              <img className="
w-full
h-64
object-cover
bg-gradient-to-br
from-cyan-50
to-blue-100
" src={item.image} alt="" />
              <div className='p-6'>
                <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                  <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><span className="font-medium">
{item.available ? "Available Today" : "Unavailable"}
</span>
                </div>
                <p className='text-[#262626] text-xl font-bold font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                <div className="flex justify-between items-center mt-4">

<p className="text-cyan-600 font-semibold">

₹ {item.fees}

</p>

<button
className="bg-cyan-50 text-cyan-700 px-4 py-2 rounded-lg text-sm hover:bg-cyan-100 transition"
>

View Profile

</button>

</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
