import React from 'react'
import { useState } from 'react'

export default function Login() {

const [username, setUsername] = useState(null)
const [password, setPassword] = useState(null)
const [error, setError] = useState('Hi')

const handleLogin = (e) => {
  e.preventDefault()
  if(!username || !password){
    setError('Please enter both username and password')
  }
}

  return (
    <div className='flex items-center justify-center h-screen flex-col'>
      <img src="vite.svg" className='flex justify-center mb-10'></img>
      <div className='flex items-center justify-center'>
      <form onSubmit={handleLogin} className='flex items-center rounded-md flex-col border border-solid border-black border-opacity-30 px-8 py-20 bg-slate-400'>
        <label className='my-4'>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='rounded-md shadow-lg p-2' placeholder='Username'></input>
        </label>
        <label className='my-4'>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md shadow-lg p-2" placeholder='Password'></input>
        </label>
        <button type='submit' className='mt-16 rounded-lg bg-blue-400 w-1/2 p-1.5'>Login</button>
        {!error && <p>{error}</p>}
      </form>
    </div>
    </div>
  )
}
