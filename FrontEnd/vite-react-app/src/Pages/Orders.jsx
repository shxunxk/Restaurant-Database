import React, { useEffect, useState } from 'react'
import Slip from '../Components/Slip'
import axios from 'axios'
import Navbar from '../Components/Navbar';

export default function Orders() {

  const [data, setData] = useState([{"order_id": 'Loading'}])

  useEffect(() => {
    axios.get('http://localhost:3000/order')
      .then(response => {
        setData(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);  
  
  let status = ['Pending', 'In Progress', 'Complete'];

  return (
    <>
    <Navbar/>
    <div className='my-20 mx-36'>
    {status.map((item1)=>{
      return(
        <>
            <h1 className="font-bold text-3xl">{item1}</h1>
            <div className="my-10 grid grid-cols-3 gap-5">
              {data && data.length>0 && data.map((item,index)=>(
                <Slip key={index} data={item} category={item1} status={status}/>
              ))}
            </div>
        </>
      )
    })}
    </div>
    </>
    
  )
}
