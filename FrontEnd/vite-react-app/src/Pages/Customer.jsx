

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
  console.log(data)
  return (
    <>
    <Navbar/>
    <div className="mt-20 mx-36 grid grid-cols-3 gap-5">
      {data && data.length>0 && data.map((item,index)=>(
        <Slip data={item}/>
      ))}
    </div>
    </>
    
  )
}