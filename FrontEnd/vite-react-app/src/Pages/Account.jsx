import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Account() {
  const user = JSON.parse(Cookies.get('user'));

  const [userInfo, setUserInfo] = useState({
    customer_id: user?.user?.customer_id,
    name: user?.user?.customer_name,
    email: user?.user?.email,
    phone: user?.user?.mobile,
    address: user?.user?.address,
    img: user?.user?.img||'https://imgs.search.brave.com/5juHS53Y4trr3LQKd1FtB45PY5vMe8yQFzi_g-MQIT0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC81/NS82Ny9uby1pbWFn/ZS1hdmFpbGFibGUt/cGljdHVyZS12ZWN0/b3ItMzE1OTU1Njcu/anBn'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/customers/${userInfo.customer_id}`, userInfo);
      console.log('User information updated:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>
        <div style={{ borderRadius: '50%' }} className='w-20 h-20 overflow-hidden my-8'>
          <img src={userInfo.img} className='h-20' alt="User Avatar" />
        </div>

        <div className="mb-4" >
          <label className="block text-sm font-medium text-gray-700">Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          ) : (
            <p className="mt-1">{userInfo.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          ) : (
            <p className="mt-1">{userInfo.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          ) : (
            <p className="mt-1">{userInfo.phone}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          ) : (
            <p className="mt-1">{userInfo.address}</p>
          )}
        </div>

        <div className="flex justify-end">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
