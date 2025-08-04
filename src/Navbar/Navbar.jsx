import React,{useContext, useState} from 'react'
import Logo from "../assets/image.png"
import {formContext} from "../App.jsx"

const Navbar = () => {
  
  const {setOpen}=useContext(formContext);
  
  function handleChange(){
    setOpen((s)=>!s);
  }
  return (
    <div className='flex flex-row justify-between items-center rounded-full shadow-sm mx-30  pb-5'>
        <ul className='nav text-lg flex flex-row justify-center gap-12 ml-48  pt-10'>
        <li><img src={Logo} alt="logo" height={32} width={32}/></li>
            <li>Home</li>
            <li>Find Jobs</li>
            <li>Find Talents</li>
            <li>About us</li>
            <li>Testimonials</li>
            <button onClick={handleChange} className='btn-bg rounded-4xl px-8 py-2 -mt-2 text-md text-white w-40 '>Create Job</button>
        </ul>
    </div>
  )
}

export default Navbar