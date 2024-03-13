import React, { useState } from 'react'

export default function Slip() {

    const [status, setStatus] = useState('Pending')
    const changeStatus = () => {
        if(status === 'Pending'){
            setStatus('In Progress')
        }
        if(status === 'In Progress'){
            setStatus('Complete')
        }
    }

  return (
    <div className="text-left border border-gray-400 rounded-md p-4">
      <p>Order ID: xxxx</p>
      <p>Oreder Time: xxxx</p>
      <p className='flex justify-between align-middle text-middle'>Status: {status} <button className="bg-green-300 py-1 px-2 rounded-md" onClick={()=>changeStatus()}>Change</button></p>
    </div>
  )
}
