import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

const OrderItems = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orderitems', {
          params: { order_id: id }
        });
        setData(response.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:3000/menu');
        setMenu(response.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchOrderItems();
    fetchMenu();
  }, [id]);

  const itemNames = useMemo(() => {
    return data.map(orderItem => {
      const menuItem = menu.find(menuItem => menuItem.item_id === orderItem.item_id);
      return menuItem ? menuItem.item_name : "Unknown Item";
    });
  }, [data, menu]);

  console.log(data, menu)
  return (
    <div className='flex flex-col items-center p-4'>
      <div className="my-24 bg-white container rounded-xl border-2 border-solid border-black border-opacity-50 w-5/6 p-2 mx-auto sm:p-8">
        <div className='flex flex-col mb-10 sm:flex-row'>
            <p className="font-semibold">Order Number: {data[0]?.order_id}</p>
        </div>
        <h3 className="text-lg font-bold mb-2">Items</h3>
        <table className="w-full mb-4 text-xs lg:text-lg">
          <thead>
            <tr>
              <th className="border sm:px-4 sm:py-2">No.</th>
              <th className="border sm:px-4 sm:py-2">Item</th>
              <th className="border sm:px-4 sm:py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border sm:px-4 sm:py-2">{index + 1}</td>
                <td className="border sm:px-4 sm:py-2">{itemNames[index]}</td>
                <td className="border sm:px-4 sm:py-2">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderItems;
