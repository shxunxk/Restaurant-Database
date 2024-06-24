import { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../Components/Navbar";

export default function TakeOrder() {
    const options = ['Starter', 'Main', 'Sides', 'Drinks', 'Extras'];
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const getOrder = () => {
            axios.get('http://localhost:3000/menu')
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching menu:', error);
                });
        }
        getOrder();
    }, []);

    const addItem = (item) => {
        setSelectedItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(prevItem => prevItem.item_id === item.item_id);

            if (existingItemIndex !== -1) {
                // Update the quantity of the existing item
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

    console.log(selectedItems);
    return (
        <div>
            <Navbar />
            <div className='my-20 mx-16'>
                <div className="my-20">
                    {options.map((option, index) => (
                        <div key={index} className="my-10">
                            <h1 className="text-3xl font-bold my-5">{option}</h1>
                            <div className="grid grid-cols-4">
                                {data && data.map((food, index1) => (
                                    food.item_type === option &&
                                    <div key={index1} className="text-center m-2" onClick={() => addItem(food)}>
                                        <p className="h-10 flex items-center justify-center bg-gray-200 rounded-md">
                                            {food.item_name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="my-20">
                    <h1 className="text-3xl font-bold">Selected Items</h1>
                    <table className="w-full mt-5">
                        <thead>
                            <tr className="bg-gray-200">
                            <th className="py-2 px-4">No.</th>
                                <th className="py-2 px-4">Item Name</th>
                                <th className="py-2 px-4">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedItems?.map((item, index) => (
                                <tr key={index} className="border-b border-gray-300 text-left">
                                    <td className="py-2 px-4">{index+1}</td>
                                    <td className="py-2 px-4">{item.item_name}</td>
                                    <td className="py-2 px-4">{item.quant}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
