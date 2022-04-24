import React from 'react'
import { useHistory } from 'react-router-dom';

export default function Login() {

  const history = useHistory();

  const handleLogin = () => {
    history.push('/users');
  }

  return (
    <div className='flex justify-center bg-spotify h-full items-center' style={{'backgroundSize': '80%',
    'backgroundPosition': '46% 4%'}}>
      <div className='p-5 bg-spotiblack border-white border-2 rounded-xl text-white max-h-80'>
      <div className="text-center text-xl bold font-bold">Spotifiuby Access</div>
      <div className='m-5'>
        <div className='text-xl text-white'>Username</div>
        <input className='w-full border-2 border-black px-2 text-black' type='text'/>
        <div className='text-xl text-white mt-5'>Password</div>
        <input className='w-full border-2 border-black px-2 text-black' type='password'/>
        <div className='text-xl text-white mt-5'>
          <button className='w-full bg-spoticeleste text-white rounded font-bold py-2 px-4 border-black border-2' onClick={handleLogin}>Sign In</button>
        </div>
      </div>
      </div>
    </div>
  )
}
