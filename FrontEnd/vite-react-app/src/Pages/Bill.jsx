import Navbar from '../Components/Navbar'
import axios from 'axios'
import { useState, useEffect } from 'react'
// import Orders from './Orders'

export default function Bill() {

    const [bill, setBill] = useState()
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const billResponse = await axios.get('http://localhost:3000/bill');
          setBill(billResponse.data);

          const getCustomers = async (id) => {
            const customers = await axios.get('http://localhost:3000/customers', {
              params: { customer_id: id }
            });
            return customers.data;
          };
  
          const updatedBills = await Promise.all(
            bill.map(async (item) => {
              const person = await getCustomers(item.customer_id);
              return { ...item, customer_name: person[0].customer_name };
            })
          );

          console.log(updatedBills)
  
          setBill(updatedBills);
  
          const orderResponse = await axios.get('http://localhost:3000/order');
          const fetchedOrders = orderResponse.data;
  
          let sortedOrders = {};
          fetchedOrders.forEach((item) => {
            if (!sortedOrders[item.bill_id]) {
              sortedOrders[item.bill_id] = [];
            }
            sortedOrders[item.bill_id].push(item);
          });
    
          const fetchOrderItems = async (order_id) => {
            const response = await axios.get('http://localhost:3000/orderitems', {
              params: { order_id },
            });
            return response.data;
          };

          const menuResponse = await axios.get('http://localhost:3000/menu');
          const menuItems = menuResponse.data;
  
          const allOrderItems = {};
  
          for (const bill_id of Object.keys(sortedOrders)) {
            for (const order of sortedOrders[bill_id]) {
              const items = await fetchOrderItems(order.order_id);
              if (!allOrderItems[bill_id]) {
                allOrderItems[bill_id] = [];
              }
              allOrderItems[bill_id].push(...items);
            }
          }
          for (const bill_id of Object.keys(allOrderItems)) {
            allOrderItems[bill_id] = allOrderItems[bill_id].map(item => {
              const menuItem = menuItems.find(menuItem => menuItem.item_id === item.item_id);
              if (menuItem) {
                return { ...item, price: menuItem.price, name: menuItem.item_name };
              }
              return item;
            });
          }
  
          setOrderItems(allOrderItems);
          console.log(allOrderItems)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  return (
    <>
    <Navbar/>
    {console.log(orderItems)}
    {bill?.map((item,index)=>{
      let sum = 0
      return(
        <div className='flex flex-col justify-center align-middle items-center bg-slate-300' key={index}>
        <div className="w-2/3 my-24 bg-white container mx-auto p-8 rounded-xl border-2 border-solid border-black border-opacity-50">
        <div className='flex mb-10'>
          <div className="flex-1">
              <p className="font-semibold">Bill Number: {item.bill_id}</p>
        </div>
        <div className="flex-1">
              <p className="font-semibold">Date: {item.bill_date}</p>
        </div>
        
        </div>

          <div className="mb-20">
              <p className="font-semibold">Customer Name: {item.customer_name}</p>
        </div>
    
        <h3 className="text-xl font-bold mb-2">Items</h3>
        <table className="w-full mb-4">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">No.</th>
                    <th className="border px-4 py-2">Item</th>
                    <th className="border px-4 py-2">Quantity</th>
                    <th className="border px-4 py-2">Unit Price</th>
                    <th className="border px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems[item.bill_id] ? (
                    orderItems[item.bill_id].map((orderItem, index) => {
                      const totalPrice = orderItem.price * orderItem.quantity;
                      sum += totalPrice;
                      return (
                        <tr key={index}>
                          <td className="border px-4 py-2">{index+1}</td>
                          <td className="border px-4 py-2">{orderItem.name}</td>
                          <td className="border px-4 py-2">{orderItem.quantity}</td>
                          <td className="border px-4 py-2">{orderItem.price}</td>
                          <td className="border px-4 py-2">{totalPrice}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="border px-4 py-2" colSpan="5">
                        No items found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
    
        <p className="font-bold">Grand Total: {sum}</p>
    
        <h3 className="text-xl font-bold mt-8 mb-2">Payment Details</h3>
        <p><strong>Payment Status: </strong>{item.payment_status} </p>
        {/* <p><strong>Payment Method: </strong> </p> */}
      </div>
      <button className='px-6 py-3 mb-20 bg-green-400 rounded-lg text-2xl border-2 border-green-800'>Print</button>
        </div>
      )
})}
    </>
  )
}
