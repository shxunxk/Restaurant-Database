/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Slip from '../Components/Slip';
import axios from 'axios';
import Cookies from 'js-cookie';
    
export default function Orders() {
  const [data, setData] = useState([{ order_id: 'Loading' }]);
  const [text, setText] = useState('View All');
  const [bill, setBill] = useState();

  const user = JSON.parse(Cookies.get('user'));

  const status = ['Pending', 'In Progress', 'Complete'];

  useEffect(() => {
    let customerBills = null
    if(user?.type === 'Customer'){
      axios.get('http://localhost:3000/bill')
      .then(response => {
        customerBills = response.data.filter(item => (
          item.customer_id === user?.dataValues?.customer_id
        ));
        setBill(customerBills);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
      if(customerBills?.length>0){
        axios.get('http://localhost:3000/order')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
        setData(data.filter(item=>(
          item.bill_id === customerBills[0]?.bill_id
        )))
    }
  }else{
    axios.get('http://localhost:3000/order')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }}, []);


  return (
    <div className='mx-4 py-20 sm:mx-16'>
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
