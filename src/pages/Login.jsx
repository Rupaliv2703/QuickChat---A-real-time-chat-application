import React from 'react'
import { useState } from 'react'
import assets from '../assets/assets'
const Login = () => {
  const [currState, setcurrState] = useState("Sign up")
 const [fullName, setfullName] = useState("")
 const [email, setemail] = useState("")
 const [password, setpassword] = useState("")
 const [bio, setbio] = useState("")
 const [isDataSubmitted, setisDataSubmitted] = useState(false);

const onsubmitHandler = (e) => {
  e.preventDefault();
if (currState === "Sign up" && !isDataSubmitted) {
  setisDataSubmitted(true);
  return ;
}}

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/* LEFT */}
      <img src={assets.logo_big} alt='' className='w-[40%]'/>

      {/* RIGHT */}
      <form onSubmit={onsubmitHandler}
      className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col
      gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-slate-600 text-2xl flex justify-between items-center'> 
          {currState}
          {isDataSubmitted &&
          <img onClick={()=> setisDataSubmitted(false)}
          src={assets.arrow_icon} alt='' className='w-5 cursor-pointer' />
          }
        </h2>
        {currState === "Sign up" && !isDataSubmitted && (
          <input onChange={(e) =>setfullName(e.target.value)} value={fullName}
           type='text' placeholder='Full Name'  required className='p-2 text-slate-600 border border-gray-500 rounded-md focus:outline-none' />
        )}

        {!isDataSubmitted && (
          <>
          <input onChange={(e) =>setemail(e.target.value)} value={email} type='email' placeholder='Email Address' required className='p-2 border border-gray-500 text-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
          <input onChange={(e) =>setpassword(e.target.value)} value={password} type='password' placeholder='Password' required className='p-2 border border-gray-500 text-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
          </>
        )}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea onChange ={(e)=>setbio(e.target.value)} value={bio} rows={4} placeholder='provide a short bio ...' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600'
          ></textarea>
        )}

        <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300'>

        {currState === "Sign up" ? "Create Account" : "login Now"}

        </button>

        <div className ='flex items-center gap-2 text-sm text-gray-500'>
          <input type='checkbox' />
          <p>Agree to Terms and Conditions.</p>

        </div>

        <div className='flex flex-col gap-2'>
       {currState === "Sign up" ? (
        <p className='text-sm text-gray-600'
        >Already have an account  ?
          <span onClick={()=> {setcurrState("Login") ; setisDataSubmitted(false)}}
          className='font-medium text-violet-500  cursor-pointer'
          > Login here</span>
        </p>
       ) :(
        <p className='text-sm text-gray-600'
        >Create an account .          
          <span onClick={()=> setcurrState("Sign up")}
          className='font-medium text-violet-500 cursor-pointer'
          > Click here</span>
        </p>
       )}
        </div>
      </form>

    </div>
  )
}

export default Login
