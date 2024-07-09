/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Start() {
  // Define options with background colors for different user types
  const options = {
    Customer: {color:'bg-green-500', image:''},
    Employee: {color:'bg-blue-500', image:''},
  };

  const bgImage = 'https://imgs.search.brave.com/7QmYlseEv1EkgzRp00WVFYZ4PUd-nZhJKAAGpCHyE7Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjAz/MjEzNDU4MC9waG90/by9mYXN0LWZvb2Qt/bHVuY2gtb3ItZGlu/bmVyLW9uLXRhYmxl/LWF0LXJlc3RhdXJh/bnQtcGVvcGxlLWVh/dGluZy1mb3ItbnV0/cml0aW9uLWFuZC13/ZWxsbmVzcy53ZWJw/P2I9MSZzPTE3MDY2/N2Emdz0wJms9MjAm/Yz0wQktWVzdGbXFy/MGpHbFo1MHBFMGV4/Y3NEV2I3d0d1bktv/MnR6VWJhVTYwPQ';

  return (
    <div className='py-20 w-full h-screen mx-auto flex flex-col items-center gap-10' style={{ 
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), url(${bgImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      backgroundBlendMode: 'overlay', // Ensures the gradient blends with the image
    }}>
      <h1 className='text-3xl font-bold mb-8 text-white'>Welcome to One Food Nation</h1>
      <div className='flex flex-row gap-10'>
        {Object.keys(options).map((item, index) => (
          <Link key={index} to={`login/${item}`}>
            <div className={`px-6 py-3 ${options[item].color} rounded-md text-white flex items-center justify-center hover:bg-opacity-75 transition duration-300 ease-in-out`}>
              <p className='text-lg'>{item} Login</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}