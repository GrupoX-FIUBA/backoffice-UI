import React from 'react'

export default function NavBar() {
  return (
    <div className='flex justify-around p-3 bg-black'>
        <div><img src="./logo.png" width='100px' alt='logo'/></div>
        <div className='text-3xl text-white mt-5'>Back Office</div>
    </div>
  )
}
