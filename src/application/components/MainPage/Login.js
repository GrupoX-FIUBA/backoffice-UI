import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

export default function Login() {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [errorClass, setErrorClass] = useState('hidden')
  const { login, adminError } = useAuth();
  const history = useHistory();

  const userLogged = useAuth().user;

  const handleLogin = async () => {
    try{
      await login(user.email, user.password);
      history.push('/users');
    }
    catch(error){
      setErrorClass('');
      console.log(error);
    }
  }

  useEffect(() => {
    if(userLogged){
      history.push('/users');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogged])
  

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  return (
    <div className='flex justify-center bg-spotify h-full items-center' style={{'backgroundSize': '80%',
    'backgroundPosition': '46% 4%'}}>
      <div className='p-5 bg-spotiblack border-white border-2 rounded-xl text-white max-h-80'>
      <div className="text-center text-xl bold font-bold">Spotifiuby Access</div>
      <div className={`text-red-600 ${errorClass}`}>Error, please check your credentials</div>
      {adminError && <div className={`text-red-600`}>{adminError}</div>}
      <div className='m-5'>
        <div className='text-xl text-white'>Username</div>
        <input name="email" className='w-full border-2 border-black px-2 text-black' type='text' onChange={handleChange}/>
        <div className='text-xl text-white mt-5'>Password</div>
        <input name="password" className='w-full border-2 border-black px-2 text-black' type='password' onChange={handleChange}/>
        <div className='text-xl text-white mt-5'>
          <button className='w-full bg-spoticeleste text-white rounded font-bold py-2 px-4 border-black border-2' onClick={handleLogin}>Sign In</button>
        </div>
      </div>
      </div>
    </div>
  )
}
