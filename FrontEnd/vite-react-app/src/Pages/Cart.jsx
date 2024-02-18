/* eslint-disable no-unused-vars */
import React from 'react'
import CartCard from '../Components/CartCard'

const item = [{name:'1'},{name:'2'}]

export default function Cart() {
  return (
    <div>
      <div className=''>
        {item.map((items)=>{
            <CartCard name={items.name}/>
        })}
      </div>
    </div>
  )
}
