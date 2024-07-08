import axios from 'axios'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// import { auth, database } from '../Firebase.js'
// import { createUserWithEmailAndPassword } from 'firebase/auth'

// eslint-disable-next-line react/prop-types
export default function Login({text2, text3, text4, but}) {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [repass, setRepass] = useState('')
// const [error, setError] = useState('Hi')

const {type} = useParams()

const handleLogin = (e) => {
  e.preventDefault();
  axios.post('http://localhost:3000/login', {
    type: type,
    email: username, // Use username state for email
    password: password // Use password state for password
  })
    .then(response => {
      // Handle successful login response
      if(response.data.message === 'Login successful'){
        window.location.href = '/orders/newOrder';
      }
      // console.log('Login successful', response.data);
    })
    .catch(error => {
      console.error('Login error:', error);
    });
}

  return (
    <div className='flex items-center justify-center h-screen flex-col bg-blue-50'>
      <div className='flex items-center justify-start'>
      <form onSubmit={handleLogin} className='flex items-center rounded-md flex-col border border-solid border-black border-opacity-10 px-8 bg-white shadow-2xl' style={{height: '600px'}}>
        <img src="OFN.png" className='flex justify-center mb-10 h-20 p-20'></img>
        <div className='flex flex-col items-center justify-center'>
          <label className='my-4'>
          <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} className='rounded-md shadow-lg p-2 border border-solid border-black border-opacity-10' style={{ width: '300px' }} placeholder={'Enter Email or Phone Number' }></input>
          </label>
          <label className='my-4'>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md shadow-lg p-2 border border-solid border-black border-opacity-10" style={{ width: '300px' }} placeholder={text2}></input>
          </label>
          {text3 && <label className='my-4'>
          <input type="text" value={repass} onChange={(e) => setRepass(e.target.value)} className="rounded-md shadow-lg p-2 border border-solid border-black border-opacity-10" style={{ width: '300px' }} placeholder={text3}></input>
          </label>}
          <button type='submit' className='text-white mt-10 rounded-lg bg-black w-1/2 p-1.5 mb-10'>{but}</button>
          {type === "Customer" && but == 'Log In' && <Link to='../signin'>{text4}</Link>}
          {but == 'Sign In' && <Link to='../login'>{text4}</Link>}
          {/* {!error && <p>{error}</p>} */}
        </div>
      </form>
    </div>
    </div>
  )
}
