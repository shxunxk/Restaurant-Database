/* eslint-disable no-unused-vars */


import React, { useEffect, useState } from 'react'
import Slip from '../Components/Slip'
import axios from 'axios'
import Navbar from '../Components/Navbar';

export default function Customers() {

  const [data, setData] = useState()

  useEffect(() => {
    axios.get('http://localhost:3000/customerEmployee/customer')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);  

  return (
    <>
    <div className="mt-20 mx-4 sm:mx-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {data && data.length>0 && data.map((item,index)=>(
        <Slip key={index} data={item} button={['View','Delete']}/>
      ))}
    </div>
    </>
    
  )
}