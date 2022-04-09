import React from 'react'
import { useHistory } from 'react-router-dom';

export default function Login() {

  const history = useHistory();

  const handleLogin = () => {
    history.push('/home');
  }

  return (
    <div className='flex justify-center bg-spotify h-full items-center' style={{'backgroundSize': '80%',
    'backgroundPosition': '46% 4%'}}>
      <div className='p-5 bg-white rounded-xl text-spotiblue max-h-80'>
      <div className="text-center text-xl bold font-bold">Spotifiuby Access</div>
      <div className='m-5'>
        <div className='text-xl text-spotiblue'>Username</div>
        <input className='w-full border-2 border-black px-2' type='text'/>
        <div className='text-xl text-spotiblue mt-5'>Password</div>
        <input className='w-full border-2 border-black px-2' type='password'/>
        <div className='text-xl text-spotiblue mt-5'>
          <button className='w-full bg-green text-spotiblue font-bold py-2 px-4 rounded-sm border-black border-2' onClick={handleLogin}>Sign In</button>
        </div>
      </div>
      </div>
    </div>
  )
}
