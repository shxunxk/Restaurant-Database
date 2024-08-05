/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Slip from '../Components/Slip';
import axios from 'axios';
import Cookies from 'js-cookie';
    
export default function Orders() {
  const [data, setData] = useState([]);
  const [text, setText] = useState('View All');
  const [bill, setBill] = useState();

  const user = JSON.parse(Cookies.get('user'));

  const status = ['Pending', 'In Progress', 'Complete'];

  useEffect(() => {
    if (user?.type === 'Customer') {
      // Fetch bills for the customer
      axios.get('http://localhost:3000/bill')
        .then(response => {
          const customerBills = response.data.filter(item => (
            item.customer_id === user.user.customer_id
          ));
          if (customerBills.length > 0) {
            // Set bills state with customer's bills
            setBill(customerBills);
            // Fetch orders related to the first bill (assuming chronological order)
            axios.get('http://localhost:3000/order')
              .then(orderResponse => {
                setData(orderResponse.data.filter(item=> (
                  item.bill_id === customerBills[0]?.bill_id
                )));
              })
              .catch(error => {
                console.error('Error fetching orders:', error);
              });
          }
        })
        .catch(error => {
          console.error('Error fetching bills:', error);
        });
    } else {
      // For other types of users, fetch all orders
      axios.get('http://localhost:3000/order')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    }
  }, []); // Ensure useEffect runs when user object changes
  

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
              {data && data.length > 0 && data.filter((temp)=>{return(temp.order_status === 'Served')}).map((item, index) => (
                    <Slip key={index} data={item} category={'Served'} status={status} button={['Proceed', 'Back']} />
              ))}
            </div>
          </div>}
    </div>
  );
}
