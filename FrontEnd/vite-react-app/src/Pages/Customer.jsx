

import React, { useEffect, useState } from 'react'
import Slip from '../Components/Slip'
import axios from 'axios'
import Navbar from '../Components/Navbar';

export default function Customers() {

  const [data, setData] = useState()

  useEffect(() => {
    axios.get('http://localhost:3000/customers')
      .then(response => {
        setData(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);  

  return (
    <>
    <div className="mt-20 mx-4 sm:mx-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
      {data && data.length>0 && data.map((item,index)=>(
        <Slip key={index} data={item} button={['Edit','Delete']}/>
      ))}
    </div>
    </>
    
  )
}