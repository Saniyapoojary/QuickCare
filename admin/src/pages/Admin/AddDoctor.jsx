import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl } = useContext(AdminContext)
  const { aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image Not Selected');
      }

      const formData = new FormData();

      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      // Debugging FormData (optional, can remove later)
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { aToken }
      })
      const data = response.data;
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error(error);
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>

      <div className="bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400 rounded-3xl p-10 text-white shadow-xl mb-8">

        <h1 className="text-4xl font-bold">
          Add New Doctor
        </h1>

        <p className="mt-3 text-blue-100">
          Register a new doctor and make them available for appointments.
        </p>

      </div>

      <div className="
bg-white
rounded-3xl
shadow-xl
p-10
max-w-6xl
">
        <div className="flex flex-col items-center">

          <label htmlFor="doc-img">

            <img
              className="w-40 h-40 rounded-3xl border-4 border-cyan-200 object-cover cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            />

          </label>

          <input
            hidden
            id="doc-img"
            type="file"
            onChange={(e) => setDocImg(e.target.files[0])}
          />

          <p className="mt-4 text-gray-500">

            Click to upload doctor's photo

          </p>
          <p className="text-xs text-gray-400 mt-2">
PNG or JPG (Max 2 MB)
</p>

        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <h2 className="text-xl font-bold text-slate-800 mb-5">
Personal Information
</h2>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Your name</p>
              <input onChange={e => setName(e.target.value)} value={name} className="
w-full
mt-2
px-5
py-3
rounded-xl
border
border-gray-300
focus:ring-2
focus:ring-cyan-400
outline-none
transition
" type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={e => setEmail(e.target.value)} value={email} className="
w-full
mt-2
px-5
py-3
rounded-xl
border
border-gray-300
focus:ring-2
focus:ring-cyan-400
outline-none
transition
" type="email" placeholder='Email' required />
            </div>


            <div className='flex-1 flex flex-col gap-1'>
              <p>Set Password</p>
              <input onChange={e => setPassword(e.target.value)} value={password} className="
w-full
mt-2
px-5
py-3
rounded-xl
border
border-gray-300
focus:ring-2
focus:ring-cyan-400
outline-none
transition
" type="password" placeholder='Password' required />
            </div>
            

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={e => setExperience(e.target.value)} value={experience} className="
w-full
mt-2
px-5
py-3
rounded-xl
border
border-gray-300
focus:ring-2
focus:ring-cyan-400
outline-none
transition
" >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Years</option>
                <option value="3 Year">3 Years</option>
                <option value="4 Year">4 Years</option>
                <option value="5 Year">5 Years</option>
                <option value="6 Year">6 Years</option>
                <option value="8 Year">8 Years</option>
                <option value="9 Year">9 Years</option>
                <option value="10 Year">10+ Years</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={e => setFees(e.target.value)} value={fees} className="
w-full
mt-2
px-5
py-3
rounded-xl
border
border-gray-300
focus:ring-2
focus:ring-cyan-400
outline-none
transition
"type="number" placeholder='Doctor fees' required />
            </div>

          </div>
          

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <h2 className="text-xl font-bold text-slate-800 mb-5">
Professional Information
</h2>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={e => setSpeciality(e.target.value)} value={speciality} className="
w-full
mt-2
px-5
py-3
rounded-xl
border
border-gray-300
focus:ring-2
focus:ring-cyan-400
outline-none
transition
">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>


            <div className='flex-1 flex flex-col gap-1'>
              <p>Degree</p>
              <input onChange={e => setDegree(e.target.value)} value={degree} className="
w-full
mt-2
px-5
py-3
rounded-xl
border
border-gray-300
focus:ring-2
focus:ring-cyan-400
outline-none
transition
" type="text" placeholder='Degree' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={e => setAddress1(e.target.value)} value={address1} className="
w-full
mt-2
px-5
py-3
rounded-xl
border
border-gray-300
focus:ring-2
focus:ring-cyan-400
outline-none
transition
" type="text" placeholder='Address 1' required />
              <input onChange={e => setAddress2(e.target.value)} value={address2} className="
w-full
mt-2
px-5
py-3
rounded-xl
border
border-gray-300
focus:ring-2
focus:ring-cyan-400
outline-none
transition
" type="text" placeholder='Address 2' required />
            </div>

          </div>

        </div>

        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea onChange={e => setAbout(e.target.value)} value={about} className="
w-full
mt-2
px-5
py-3
rounded-xl
border
border-gray-300
focus:ring-2
focus:ring-cyan-400
outline-none
transition
" rows={5} placeholder='write about doctor'></textarea>
        </div>

        <button type='submit' className="
mt-8
bg-gradient-to-r
from-blue-700
via-cyan-500
to-teal-400
text-white
px-12
py-4
rounded-xl
font-semibold
shadow-lg
hover:shadow-xl
hover:scale-105
transition-all
duration-300
">Add doctor</button>

      </div>


    </form>
  )
}

export default AddDoctor