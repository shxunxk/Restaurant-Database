/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

export default function Start() {

    let option = {'Customer':'bg-green-500', 'Employee':'bg-blue-500'}

  return (
    <div className='py-20 w-fit mx-auto flex flex-row gap-10'>
        {Object.keys(option).map((item, index)=>(
            <Link key={index} to={`login/${item}`}><div key={index} className={`w-fit px-3 py-6 ${option[item]} rounded-md text-white`}>
                <p>{item}</p>
            </div></Link>
        ))}
    </div>
  )
}
