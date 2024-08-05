/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Start() {

  useEffect(() => {
    Cookies.remove('user');
  },[])
  
  // Define options with background colors for different user types
  const options = {
    Customer: {color:'bg-green-500', image:'https://imgs.search.brave.com/iECuaf2411j8wsVhxtFRPPWQ8NuR46hiQZKPduQoLwY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMy/MDc5OTIzNC9waG90/by9ncm91cC1vZi1m/cmllbmRzLXRhbGtp/bmctYW5kLWxhdWdo/aW5nLWluLWNhZmUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUFIMXhMWWRnVzF2/bTFyLWZwOUE4LVJM/XzJOYU5XN2JibHpR/Q0ZYdEg3Y0k9'},
    Employee: {color:'bg-blue-500', image:'https://imgs.search.brave.com/jsse_OjLFYGX79fX99Z4d1YfkX1LATo6WvZyI2Euk0U/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE2/NDQwMzY0Mi9waG90/by9wb3J0cmFpdC1v/Zi1zbWlsaW5nLWVs/ZGVybHktd2FpdGVy/LWxvb2tpbmctYXQt/Y2FtZXJhLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1hZ1R1/bjBQNU5NQXUwLUZM/bzRKejh6cmIzdENN/RWNNRWwySG1ldE83/cjR3PQ'},
  };

  const bgImage = 'https://imgs.search.brave.com/uy6BQ3XwD1z8BMRb2JM1uZSlUl34sMjHjMNocDYYHbc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIx/MTU0NzE0MS9waG90/by9tb2Rlcm4tcmVz/dGF1cmFudC1pbnRl/cmlvci1kZXNpZ24u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUN2Sm1Id05Od2ZG/elZqajFfY1g5c2N3/WXNsNG1uVk84WEZQ/aTBMUU1Uc3c9';

  return (
    <div className='py-20 w-full h-screen mx-auto flex flex-col items-center gap-10' style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), url(${bgImage})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'overlay', // Ensures the gradient blends with the image
    }}>
      <h1 className='text-3xl font-bold mb-8 text-white'>Welcome to One Food Nation</h1>
      <div className='flex flex-col items-center sm:flex-row gap-10 w-4/5 justify-center'>
        {Object.keys(options).map((item, index) => (
          <Link key={index} to={`login/${item}`} className='h-1/2 w-1/3 flex flex-col gap-2'>
            <div className='flex justify-center'>
              <img src={options[item].image} className='w-full rounded-md'/>
            </div>
            <div className={`px-6 py-3 ${options[item].color} rounded-md text-white flex items-center justify-center hover:bg-opacity-75 transition duration-300 ease-in-out`}>
              <p className='text-lg'>{item} Login</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}