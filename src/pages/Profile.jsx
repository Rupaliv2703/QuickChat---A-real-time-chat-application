import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import assets from '../assets/assets'
const Profile = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault() ;
    navigate('/');
  }

  const [selectedImg, setselectedImg] = useState(null)
  const [name, setname] = useState("Martin Johnson")
  const [bio, setbio] = useState('Hi Everyone , I am Using QuickChat')
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
     <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-600 border-2
     border-gray-400 shadow-2xl flex items-center justify-center max-sm:flex-col-reverse
     rounded-lg'
     >
      <form
       className='flex flex-col gap-5 p-10 flex-1'
       onSubmit={handleSubmit}
      >
        <h3 className='text-lg'> Profile details</h3>
        <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>

          <input onChange={(e)=>setselectedImg(e.target.files[0])}
           type='file' id='avatar' accept=' .png , .jpg , .jpeg' hidden />
          <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt=''
          className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} />
        Upload Profile Image
        </label>

        <input onChange={(e)=>setname(e.target.value)} value={name} type='text' placeholder='Your Name' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600' />
        
        <textarea onChange={(e)=>setbio(e.target.value)} value={bio} rows={4} required placeholder='provide a profile bio ' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600'
        ></textarea>
        
        <button type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'>
          Save Changes
        </button>
      
 </form>
      <img className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10'
      src={assets.logo_icon} alt='' />

     </div>
    </div>
  )
}

export default Profile
