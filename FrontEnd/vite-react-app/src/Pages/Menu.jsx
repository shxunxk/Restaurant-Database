/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import Options from '../Components/Options';
import FoodCard from '../Components/FoodCard';
// import Slideshow from '../Components/SlideShow'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [options, setOptions] = useState(new Set())
  const [type, setType] = useState();
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [food, setFood] = useState([]);
  const [currentMenu, setCurrentMenu] = useState()
  const [card, setCard] = useState(false);
  const [cardItem, setCardItem] = useState({});

  const getType = (data) => {
    setType(data);
  };

  const [newItem, setNewItem] = useState({
    item_name: '',
    price: '',
    image: '',
    item_type: type
  });

  const [selectedItem, setSelectedItem] = useState({
    item_name: '',
    price: '',
    image: '',
    item_type: '',
    item_id: ''
  });

  const getMenu = () =>{
    axios.get('http://localhost:3000/menu')
      .then(response => {
        console.log(response.data)
        setFood(response.data);
        response.data?.map((item)=>{
          options.add(item?.item_type)
          setType([...options][0])
          setCurrentMenu(response.data.filter((item)=>(
            item.item_type === [...options][0]
          )))
        })
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(()=>{
    getMenu()
  },[])
  

  useEffect(() => {
    setCurrentMenu(
      food.filter((item)=>(
        item.item_type === type
      ))
    )
    setCard(false)
    setNewItem({
      item_name: '',
      price: '',
      image: '',
      item_type: type
    })
  }, [type]);

  const handleToggleNewItemForm = () => {
    setShowNewItemForm(!showNewItemForm);
    setSelectedItem({
      item_name: '',
      price: '',
      image: '',
      item_type: type
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFoodDetails = (e) => {
    const { name, value } = e.target;
    setSelectedItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const updateFood = () => {
    axios.put('http://localhost:3000/menu', {
      item_id: selectedItem.item_id,
      item_name: selectedItem.item_name,
      price: selectedItem.price,
      image: selectedItem.image,
      item_type: selectedItem.item_type
    })
      .then(response => {
        getMenu()
      })
      .catch(error => {
        console.error('Error:', error);
      });
    setCard(false);
  };
  
  const deleteItem = () => {
    const requestData = {
      itemId: selectedItem.item_id // assuming selectedItem.item_id is the identifier of the item
    };
    
    axios.delete('http://localhost:3000/menu', { data: requestData })
      .then(response => {
        // Handle success
        console.log('Item deleted successfully', response.data);
        getMenu()
      })
      .catch(error => {
        console.error('Error:', error);
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
        // Fetch updated food data here if necessary
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const showCard = (bool, item) => {
    if (bool) {
      setCard(true);
      setSelectedItem({
        item_name: item.item_name,
        price: item.price,
        image: item.image,
        item_type: item.item_type,
        item_id: item.item_id
      });
    } else {
      setCard(false);
    }
    setCardItem(item);
  };

  return (
    <div>
      <div className='py-20 mx-4 sm:mx-16'>
        <Options getType={getType} options={options} />
        <div>
          {card && (
            <div className='flex flex-col items-center gap-10 border my-10 p-10 rounded-xl border-gray-400 sm:flex-row'>
              <div className='flex flex-col gap-10 justify-center'>
              <img src={cardItem.image} alt={cardItem.item_name} className='rounded-lg min-h-32 w-full'/>
              <button className='w-full bg-red-400 p-2 rounded-lg sm:w-fit self-center' onClick={deleteItem}>Delte Item</button>
              </div>
              <div className='rounded-lg my-10 flex flex-col items-center flex-1'>
                {Object.keys(cardItem).map((item) => {
                  let field = null;
                  if (item === 'item_name') {
                    field = 'Item Name';
                  } else if (item === 'item_type') {
                    field = 'Item Type';
                  } else if (item === 'image') {
                    field = 'Item Image';
                  } else if (item === 'price') {
                    field = 'Item Price';
                  }
                  return (
                    <div className='flex flex-row gap-2 my-4 w-full justify-center' key={item}>
                      {field && (
                        <div className='sm:flex flex-row'>
                          <p className="flex items-center">{field}:</p>
                          <input
                            type='text'
                            id={item}
                            name={item}
                            value={selectedItem[item]}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            placeholder='Enter'
                            onChange={handleFoodDetails}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className='w-full flex gap-2'>
                  <button className='w-1/2 bg-green-400 p-2 rounded-lg' onClick={updateFood}>Save</button>
                  <button className='w-1/2 bg-red-400 p-2 rounded-lg' onClick={() => showCard(false)}>Close</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='grid gap-12 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'>
          {currentMenu?.map((item) => (
            <div className='mt-10 justify-between' key={item.id} onClick={() => showCard(true, item)}>
              <FoodCard items={item} />
            </div>
          ))}
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
                  value={type}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  placeholder='Enter item type'
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
                onClick={getMenu}
              >
                Add Item
              </button>
            </form>
          </div>
        )}
        <div className='flex justify-center'>
          <button
            className='w-32 m-10 p-2 text-black rounded-lg bg-green-300 hover:bg-blue-300 hover:text-white'
            onClick={handleToggleNewItemForm}
          >
            {showNewItemForm ? 'Close' : 'Add New Item'}
          </button>
        </div>
      </div>
    </div>
  );
}
