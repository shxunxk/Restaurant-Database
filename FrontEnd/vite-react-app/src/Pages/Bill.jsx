import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export default function Bill() {
  const [bill, setBill] = useState([]);
  const [orderItems, setOrderItems] = useState({});
  const printRefs = useRef([]);
  const user = JSON.parse(Cookies.get('user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billResponse = await axios.get('http://localhost:3000/bill');
        
        const orderResponse = await axios.get('http://localhost:3000/order');
        
        const menuResponse = await axios.get('http://localhost:3000/menu');

        const bills = billResponse.data;
        const orders = orderResponse.data;
        const menuItems = menuResponse.data;

        const getCustomers = async (id) => {
          try {
            const customers = await axios.get('http://localhost:3000/customerEmployee/customer', {
              params: { customer_id: id }
            });
            return customers.data;
          } catch (error) {
            console.error(`Error fetching customer with id ${id}:`, error);
            throw error;
          }
        };

        const updatedBills = await Promise.all(
          bills.map(async (item) => {
            const person = await getCustomers(item.customer_id);
            return { ...item, customer_name: person[0].customer_name };
          })
        );

        setBill(updatedBills);

        const sortedOrders = orders.reduce((acc, item) => {
          if (!acc[item.bill_id]) {
            acc[item.bill_id] = [];
          }
          acc[item.bill_id].push(item);
          return acc;
        }, {});

        const fetchOrderItems = async (order_id) => {
          try {
            const response = await axios.get('http://localhost:3000/orderitems', {
              params: { order_id }
            });
            return response.data;
          } catch (error) {
            console.error(`Error fetching order items for order_id ${order_id}:`, error);
            throw error;
          }
        };

        const allOrderItems = {};

        for (const bill_id in sortedOrders) {
          for (const order of sortedOrders[bill_id]) {
            const items = await fetchOrderItems(order.order_id);
            if (!allOrderItems[bill_id]) {
              allOrderItems[bill_id] = [];
            }
            items.forEach((item) => {
              const existingItem = allOrderItems[bill_id].find(i => i.item_id === item.item_id);
              if (existingItem) {
                existingItem.quantity += item.quantity;
              } else {
                allOrderItems[bill_id].push(item);
              }
            });
          }
        }

        for (const bill_id in allOrderItems) {
          allOrderItems[bill_id] = allOrderItems[bill_id].map(item => {
            const menuItem = menuItems.find(menuItem => menuItem.item_id === item.item_id);
            if (menuItem) {
              return { ...item, price: menuItem.price, name: menuItem.item_name };
            }
            return item;
          });
        }

        setOrderItems(allOrderItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePrint = (index) => {
    const printContent = printRefs.current[index];
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handlePayment = async (item) => {
    try {
      const response = await axios.put('http://localhost:3000/bill', {
        bill_id: item.bill_id,
        status: item.payment_status === 'Not Paid' ? 'Paid' : 'Not Paid'
      });
      console.log('Payment update response:', response);
      // Optionally update the UI or fetch the updated bill data here
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <>
      {bill.map((item, index) => {
        let sum = 0;
        return (
          (user?.user?.customer_id === item.customer_id || user?.type === 'Employee') && (
            <div className='flex flex-col items-center h-fit gap-10 py-20' key={index}>
              <div className="h-fit bg-white container rounded-xl border-2 border-solid border-black border-opacity-50 w-5/6 p-2 mx-auto sm:p-8" ref={(el) => (printRefs.current[index] = el)}>
                <div className='flex flex-col mb-10 sm:flex-row'>
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
                <h3 className="text-lg font-bold mb-2">Items</h3>
                <table className="w-full mb-4 text-xs lg:text-lg">
                  <thead>
                    <tr>
                      <th className="border sm:px-4 sm:py-2">No.</th>
                      <th className="border sm:px-4 sm:py-2">Item</th>
                      <th className="border sm:px-4 sm:py-2">Quantity</th>
                      <th className="border sm:px-4 sm:py-2">Unit Price</th>
                      <th className="border sm:px-4 sm:py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems[item.bill_id] ? (
                      orderItems[item.bill_id].map((orderItem, idx) => {
                        const totalPrice = orderItem.price * orderItem.quantity;
                        sum += totalPrice;
                        return (
                          <tr key={idx}>
                            <td className="border sm:px-4 sm:py-2">{idx + 1}</td>
                            <td className="border sm:px-4 sm:py-2">{orderItem.name}</td>
                            <td className="border sm:px-4 sm:py-2">{orderItem.quantity}</td>
                            <td className="border sm:px-4 sm:py-2">{orderItem.price}</td>
                            <td className="border sm:px-4 sm:py-2">{totalPrice}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td className="border px-4 py-2" colSpan="5">No items found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <p className="font-bold">Grand Total: {sum}</p>
                <h3 className="text-xl font-bold mt-8 mb-2">Payment Details</h3>
                <p><strong>Payment Status: </strong>{item.payment_status}</p>
              </div>
              <Link to={'/payment'}>
                {user?.type === 'Customer' && <button className='px-6 py-3 bg-green-300 rounded-lg text-2xl w-fit self-center'>Pay</button>}
              </Link>
              {user?.type === 'Employee' && <button className='px-6 py-3 bg-green-300 rounded-lg text-2xl w-fit self-center' onClick={() => handlePayment(item)}>Set Paid</button>}
              <button className='px-6 py-3 bg-green-300 rounded-lg text-2xl w-fit self-center' onClick={() => handlePrint(index)}>Print</button>
            </div>
          )
        );
      })}
    </>
  );
}
