/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

export default function Start() {

    let option = ['Customer', 'Employee']

  return (
    <div>
        {option.map((item, index)=>(
            <div key={index} className='flex'>
                <Link to={`login/${item}`}><p>{item}</p></Link>
            </div>
        ))}
    </div>
  )
}
