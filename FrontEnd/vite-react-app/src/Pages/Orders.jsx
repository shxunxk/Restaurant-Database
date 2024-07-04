/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Slip from '../Components/Slip';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Orders() {
  const [data, setData] = useState([{ order_id: 'Loading' }]);
  const [text, setText] = useState('View All');

  useEffect(() => {
    axios.get('http://localhost:3000/order')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const status = ['Pending', 'In Progress', 'Complete'];

  return (
    <div className='my-20 mx-4 sm:mx-16'>
      {status.map((item1) => (
        <div key={item1}>
          <h1 className="font-bold text-3xl">{item1}</h1>
          <div className="my-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {data && data.length > 0 && data.filter((temp)=>(temp.order_status === item1)).map((item, index) => (
                  <Slip key={index} data={item} category={item1} status={status} button={['Proceed', 'Back']} />
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={() => {
                setText(text === 'Close All' ? 'View All' : 'Close All');
        }} className='bg-green-300 px-4 py-2 rounded-lg my-10'
        >
        {text}
      </button>
      {text === 'Close All' &&
          <div>
            <h1 className="font-bold text-3xl">Served</h1>
            <div className="my-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {data && data.length > 0 && data.filter((temp)=>{{console.log(temp.order_status === 'Served')} return(temp.order_status === 'Served')}).map((item, index) => (
                    <Slip key={index} data={item} category={'Served'} status={status} button={['Proceed', 'Back']} />
              ))}
            </div>
          </div>}
    </div>
  );
}
