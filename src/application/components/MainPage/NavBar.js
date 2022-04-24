import React from 'react'
import logo from '../../../assets/logo.png'

export default function NavBar() {
  return (
    <div className='fixed w-full flex justify-around p-3 bg-spotiblack'>
        <div><img src={logo} width='80px' alt='logo'/></div>
        <div className='text-3xl text-white mt-5'>Back Office</div>
    </div>
  )
}
