import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

export default function Bill() {
  const [bill, setBill] = useState([]);
  const [orderItems, setOrderItems] = useState({});
  const printRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billResponse = await axios.get('http://localhost:3000/bill');
        const bills = billResponse.data;

        const getCustomers = async (id) => {
          const customers = await axios.get('http://localhost:3000/customers', {
            params:{customer_id: id}});
          return customers.data;
        };

        const updatedBills = await Promise.all(
          bills.map(async (item) => {
            const person = await getCustomers(item.customer_id);
            return { ...item, customer_name: person[0].customer_name };
          })
        );

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
          const billOrders = sortedOrders[bill_id];
          for (const order of billOrders) {
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePrint = (index) => {
    const printContent = printRefs.current[index];
    const originalContents = document.body.innerHTML;
    const printContents = printContent.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <>
      {bill.map((item, index) => {
        let sum = 0;
        return (
          <div className='flex flex-col items-center p-4' key={index}>
            <div className="my-24 bg-white container rounded-xl border-2 border-solid border-black border-opacity-50 w-5/6 p-2 mx-auto sm:p-8" ref={(el) => (printRefs.current[index] = el)}>
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
                    orderItems[item.bill_id].map((orderItem, index) => {
                      const totalPrice = orderItem.price * orderItem.quantity;
                      sum += totalPrice;
                      return (
                        <tr key={index}>
                          <td className="border sm:px-4 sm:py-2">{index + 1}</td>
                          <td className="border sm:px-4 sm:py-2">{orderItem.name}</td>
                          <td className="border sm:px-4 sm:py-2">{orderItem.quantity}</td>
                          <td className="border sm:px-4 sm:py-2">{orderItem.price}</td>
                          <td className="border sm:px-4 sm:py-2">{totalPrice}</td>
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
              <p><strong>Payment Status: </strong>{item.payment_status}</p>
              {/* <p><strong>Payment Method: </strong> </p> */}
            </div>
            <button className='px-6 py-3 mb-20 bg-green-300 rounded-lg text-2xl w-fit self-center' onClick={() => handlePrint(index)}>Print</button>
          </div>
        );
      })}
    </>
  );
}
