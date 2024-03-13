import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export default function Login({text1, text2, text3, text4, but}) {

const [username, setUsername] = useState(null)
const [password, setPassword] = useState(null)
const [repass, setRepass] = useState(null)
const [error, setError] = useState('Hi')

const handleLogin = (e) => {
  e.preventDefault()
  if(!username || !password){
    setError('Please enter both username and password')
  }
}

  return (
    <div className='flex items-center justify-center h-screen flex-col'>
      <div className='flex items-center justify-start'>
      <form onSubmit={handleLogin} className='flex items-center rounded-md flex-col border border-solid border-black border-opacity-10 px-8 bg-white shadow-xl' style={{height: '600px'}}>
        <img src="vite.svg" className='flex justify-center mb-10 h-20 p-20'></img>
        <div className='flex flex-col items-center justify-center'>
          <label className='my-4'>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='rounded-md shadow-lg p-2' style={{ width: '300px' }} placeholder={text1}></input>
          </label>
          <label className='my-4'>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md shadow-lg p-2" style={{ width: '300px' }} placeholder={text2}></input>
          </label>
          {text3 && <label className='my-4'>
          <input type="text" value={repass} onChange={(e) => setRepass(e.target.value)} className="rounded-md shadow-lg p-2" style={{ width: '300px' }} placeholder={text3}></input>
          </label>}
          <button type='submit' className='text-white mt-10 rounded-lg bg-black w-1/2 p-1.5 mb-10'>{but}</button>
          {but == 'Log In' && <Link to='../signin'>{text4}</Link>}
          {but == 'Sign In' && <Link to='../login'>{text4}</Link>}
          {!error && <p>{error}</p>}
        </div>
      </form>
    </div>
    </div>
  )
}
