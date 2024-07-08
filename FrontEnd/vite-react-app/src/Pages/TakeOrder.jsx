import { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

export default function TakeOrder() {

    
const user = JSON.parse(Cookies.get('user'));


    const options = new Set();
    const [data, setData] = useState([]);
    const [bill, setBill] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [customerToken, setCustomerToken] = useState(user?.dataValues);

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

    data.map((item)=>{
        options.add(item?.item_type)
    })

    // const handleChange = (e) => {
    //     setCustomerToken(prevState => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value
    //     }));
    // };
    
    const genOrder = async () => {
        try {
            const billId = bill[customerToken?.customer_id]||null;
            let response = await axios.post('http://localhost:3000/order', {
                bill_id: billId,
                customer_id: customerToken?.customer_id
            });
            console.log('Order placed successfully:', response.data);
            for (const item of selectedItems) {
                await axios.post('http://localhost:3000/orderitems', {
                    order_id: response.data.order_id,
                    item_id: item.item_id,
                    quant: item.quant
                });
            }
            setSelectedItems([])
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
                return [...prevItems, { item_id: item.item_id, item_name: item.item_name, quant: 1 }];
            }
        });
    };

    const reduceItem = (item_id) => {
        setSelectedItems(prevItems => {
            return prevItems.map(item => {
                if (item.item_id === item_id) {
                    const newQuant = item.quant - 1;
                    return { ...item, quant: newQuant > 0 ? newQuant : 0 };
                }
                return item;
            }).filter(item => item.quant > 0);
        });
    };

    return (
        <div>
            <div className='my-20 mx-4 md:flex sm:mx-16 gap-16'>
                {selectedItems?.length > 0 && (
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
                                        <td className="py-2 px-4 w-1/6">{item.quant} <button onClick={() => reduceItem(item.item_id)} className="bg-red-500 text-white px-2 py-1 rounded">-</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* <form onSubmit={(e) => { e.preventDefault(); genOrder(); }}>
                            <p>ID:</p>
                            <input value={customerToken.id} id={'id'}
                            name={'id'} onChange={handleChange} placeholder="Enter customer id" /> */}
                            {/* <input value={customerToken.email} id={customerToken.email}
                            name={customerToken.email} onChange={handleChange} placeholder="Enter customer email" />
                            <input value={customerToken} id={customerToken.email}
                            name={customerToken.email} onChange={handleChange} placeholder="Enter customer email" />
                            <input value={customerToken} id={customerToken.email}
                            name={customerToken.email} onChange={handleChange} placeholder="Enter customer email" /> */}
                            {/* <button type="submit">Proceed</button> */}
                        {/* </form> */}
                        <button onClick={genOrder}>Proceed</button>
                    </div>
                )}
                <div className="w-full">
                    {Array.from(options)?.map((option, index) => (
                        <div key={index}>
                            <h1 className="text-xl font-bold mb-4">{option}</h1>
                            <div className="grid xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-10 mb-10">
                                {data.map((food, index1) => (
                                    food.item_type === option && (
                                        <div key={index1} className="h-fit text-center m-2 hover:bg-black" onClick={() => addItem(food)}>
                                            <p className="h-fit p-2 w-18 flex items-center justify-center bg-gray-200 rounded-md">{food.item_name}</p>
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
