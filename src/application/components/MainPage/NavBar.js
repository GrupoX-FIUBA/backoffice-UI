import React from 'react'

export default function NavBar() {
  return (
    <div className='fixed w-full flex justify-around p-3 bg-spotiblack'>
        <div><img src="./logo.png" width='80px' alt='logo'/></div>
        <div className='text-3xl text-white mt-5'>Back Office</div>
    </div>
  )
}
