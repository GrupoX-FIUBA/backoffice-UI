import React from 'react'
import { useHistory } from 'react-router-dom';

export default function Login() {

  const history = useHistory();

  const handleLogin = () => {
    history.push('/home');
  }

  return (
    <div className='flex justify-center mt-20'>
      <div className='text-black p-5 bg-white rounded-sm'>
      <div className="text-center text-xl bold font-bold">Login</div>
      <div className='m-5'>
        <div className='text-xl text-black'>Username</div>
        <input className='w-full border-2 border-black px-2' type='text'/>
        <div className='text-xl text-black mt-5'>Password</div>
        <input className='w-full border-2 border-black px-2' type='password'/>
        <div className='text-xl text-black mt-5'>
          <button className='w-full bg-black text-white py-2 px-4 rounded-sm' onClick={handleLogin}>Login</button>
        </div>
      </div>
      </div>
    </div>
  )
}
