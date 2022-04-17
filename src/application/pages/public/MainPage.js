import React from 'react'
import Footer from '../../components/MainPage/Footer'
import Login from '../../components/MainPage/Login'
import NavBar from '../../components/MainPage/NavBar'

export default function MainPage() {
  return (
    <div className='bg-spoticeleste h-full'>
      <NavBar/>
      <div className='h-full'>
        <Login/>
      </div>
      <Footer/>
    </div>
  )
}
