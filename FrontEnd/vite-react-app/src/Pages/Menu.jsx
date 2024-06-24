/* eslint-disable react/jsx-key */
import Navbar from '../Components/Navbar';
import Options from '../Components/Options';
import FoodCard from '../Components/FoodCard';
// import Slideshow from '../Components/SlideShow'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [type, setType] = useState('Starter');
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [food, setFood] = useState([]);

  const getType = (data) => {
    setType(data)
  }

  const [newItem, setNewItem] = useState({
    item_name: '',
    price: '',
    image: '',
    item_type: type
  });

  useEffect(() => {

    // setNewItem(prevState=>{
    //   prevState, [item_type]: type
    // })

    axios.get('http://localhost:3000/menu', {
      params: { type: type }
    })
      .then(response => {
        setFood(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [type]);

  console.log(food)

  const handleToggleNewItemForm = () => {
    setShowNewItemForm(!showNewItemForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevState => {
        return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/menu', newItem)
      .then(response => {
        setShowNewItemForm(false);
        setNewItem({
          item_name: '',
          price: '',
          image: '',
          item_type: type
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className='my-20 mx-16'>
        <Options getType={getType} />
        <div className='grid grid-cols-6 gap-12'>
          {food.map((item) => (
            <div className='mt-10 justify-between'>
              <FoodCard items={item} />
            </div>
          ))}
        </div>
        <div className='flex justify-center'>
          <button 
            className='m-10 p-2 text-black rounded-lg bg-green-300 hover:bg-blue-300 hover:text-white' 
            onClick={handleToggleNewItemForm}
          >
            {showNewItemForm ? 'Close' : 'Add New Item'}
          </button>
        </div>
        {showNewItemForm && (
          <div className='w-full flex justify-center mt-10'>
            <form className='w-full p-6 rounded-lg shadow-md' onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='item_name'>
                  Item Name
                </label>
                <input
                  type='text'
                  id='item_name'
                  name='item_name'
                  value={newItem.item_name}
                  onChange={handleInputChange}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  placeholder='Enter item name'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
                  Price
                </label>
                <input
                  type='number'
                  id='price'
                  name='price'
                  value={newItem.price}
                  onChange={handleInputChange}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  placeholder='Enter price'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='item_type'>
                  Item Type
                </label>
                <input
                  type='text'
                  id='item_type'
                  name='item_type'
                  value={newItem.item_type}
                  onChange={handleInputChange}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  placeholder='Enter item name'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image'>
                  Image URL
                </label>
                <input
                  type='text'
                  id='image'
                  name='image'
                  value={newItem.image}
                  onChange={handleInputChange}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  placeholder='Enter image URL'
                />
              </div>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Add Item
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
