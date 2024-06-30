import { useEffect, useState } from "react";
import axios from 'axios';

export default function TakeOrder() {
    const options = ['Starter', 'Main', 'Sides', 'Drinks', 'Extras'];
    const [data, setData] = useState([]);
    const [bill, setBill] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [customerToken, setCustomerToken] = useState();

    useEffect(() => {
        const getOrder = async () => {
            try {
                const response = await axios.get('http://localhost:3000/menu');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        const getBill = async () => {
            try {
                const response = await axios.get('http://localhost:3000/bill');
                const bills = {};
                response.data.forEach(item => {
                    bills[item.customer_id] = item.bill_id;
                });
                setBill(bills);
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        };

        getOrder();
        getBill();
    }, []);

    const handleChange = (e) => {
        setCustomerToken(e.target.value);
    };

    const genOrder = async () => {
        try {
            const orderData = {
                customerToken
            };
            const response = await axios.post('http://localhost:3000/orders', orderData);
            console.log('Order placed successfully:', response.data);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const addItem = (item) => {
        setSelectedItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(prevItem => prevItem.item_id === item.item_id);

            if (existingItemIndex !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quant: updatedItems[existingItemIndex].quant + 1,
                };
                return updatedItems;
            } else {
                // Add the new item
                return [...prevItems, { item_id: item.item_id, item_name: item.item_name, quant: 1 }];
            }
        });
    };

    return (
        <div>
            <div className='my-20 mx-16 flex gap-16'>
                {selectedItems.length > 0 && (
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">Items</h1>
                        <table className="w-full mt-5 text-left">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 w-1/6">No.</th>
                                    <th className="py-2 px-4 col-span-7">Item Name</th>
                                    <th className="py-2 px-4 col-span-1 w-1/6">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedItems.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td className="py-2 px-4 w-1/6">{index + 1}</td>
                                        <td className="py-2 px-4 col-span-7">{item.item_name}</td>
                                        <td className="py-2 px-4 w-1/6">{item.quant}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <form onSubmit={(e) => { e.preventDefault(); genOrder(); }}>
                            <input value={customerToken} onChange={handleChange} placeholder="Enter customer email" />
                            <button type="submit">Proceed</button>
                        </form>
                    </div>
                )}
                <div className="w-3/5">
                    {options.map((option, index) => (
                        <div key={index}>
                            <h1 className="text-xl font-bold mb-4">{option}</h1>
                            <div className="grid grid-cols-4 mb-10">
                                {data.map((food, index1) => (
                                    food.item_type === option && (
                                        <div key={index1} className="text-center m-2 hover:bg-black" onClick={() => addItem(food)}>
                                            <p className="h-10 flex items-center justify-center bg-gray-200 rounded-md">{food.item_name}</p>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
