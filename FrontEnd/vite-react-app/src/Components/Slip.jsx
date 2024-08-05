/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function Slip({data, category, status, button}) {

  // console.log(data)
  const changeStatus = async () => {
    try {
      let newStatus;
      const currentIndex = status.indexOf(data.order_status);
      if (currentIndex !== -1 && currentIndex < status.length - 1) {
        newStatus = status[currentIndex + 1];
      }

      if (newStatus) {
        const response = await axios.put('http://localhost:3000/order', {
          order_id: data.order_id,
          status: newStatus
        });
        // Optionally, you can update the local state or refetch data to reflect the status change
      }

      if(currentIndex === status.length-1){
        const response = await axios.put('http://localhost:3000/order', {
          order_id: data.order_id,
          status: 'Served'
        });
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
  };

  const backStatus = async () => {
    try {
      let newStatus;
      const currentIndex = status.indexOf(data.order_status);
      if (currentIndex > 0 && currentIndex < status.length) {
        newStatus = status[currentIndex - 1];
      }

      if (newStatus) {
        const response = await axios.put('http://localhost:3000/order', {
          order_id: data.order_id,
          status: newStatus
        });
        console.log(response.data);
        // Optionally, you can update the local state or refetch data to reflect the status change
      }

      if(currentIndex === 0){
        const response = await axios.delete('http://localhost:3000/order', {
          order_id: data.order_id,
        });
        console.log(response.data);
      }
      window.alert('Status altered')
    } catch (error) {
      console.error('Error:', error);
    }
  };


  if (category !== data.order_status) {
    return null;
  }


  return (
    (category === data['order_status'] && data?.employee_position !== 'Manager') &&
    <div className="text-left border border-gray-400 rounded-md p-4 flex flex-col justify-between">
      <Link to={data.order_id?`/orderItems/${data.order_id}`:`/myAccount/${data.customer_id}`}>
      {Object.keys(data).map((item,index)=>{
        let field = null
        if(item === 'customer_id'||item === 'employee_id'){
          field = 'ID'
        }else if(item === 'order_id'){
          field = 'Order ID'
        }
        else if(item === 'customer_name'||item === 'employee_name'){
          field = 'Name'
        }else if(item === 'email'){
          field = 'Email'
        }else if(item === 'address'){
          field = 'Address'
        }
        else if(item === 'mobile'){
          field = 'Mobile'
        }
        else if(item === 'order_status'){
          field = 'Order Status'
        }
        else if(item === 'bill_id'){
          field = 'Bill ID'
        }
        else if(item === 'order_time'){
          field = 'Time'
        }
        else if(item === 'order_date'){
          field = 'Date'
        }else if(item === 'employee_position'){
          field = 'Position'
        }
      
        return(
          <>
            <p key={index} className='overflow-clip'>{`${field}: ${data[item]||'NA'}`}</p>
          </>
        ) 
        })}
      </Link>
      <div className='flex justify-end mt-4 gap-2 z-1'>
      {button[0] && <button className="bg-green-300 py-1 px-2 rounded-md z-2" onClick={()=>changeStatus()}>{button[0]}</button>}
      {button[1] && <button className="bg-red-300 py-1 px-2 rounded-md z-2" onClick={()=>backStatus()}>{button[1]}</button>}
      </div>
    </div>
  )
}
