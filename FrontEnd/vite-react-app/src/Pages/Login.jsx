import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login({ text, but }) {

  useEffect(() => {
    Cookies.remove('user');
  }, []);

  const [formData, setFormData] = useState({});
  const { type } = useParams();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
      type: type||'Customer'
    })
    axios.post(`http://localhost:3000/loginSignup/${but === 'Log In' ? 'login' : 'signup'}`, {
      ...formData,
      type: type||'Customer'
    })
      .then(response => {
        console.log(response.data.message)
        if (response.data.message === 'Login successful') {
          Cookies.set('user', JSON.stringify(response.data), { expires: 0.5 });
          if(type === 'Customer'){
            window.location.href = '/newOrder';}
          else if(type === 'Employee'){
            window.location.href = '/menu';
          }
        }else if(response.data.message === 'Customer created successfully'){
          window.location.href = '/login/Customer';
        }
      })
      .catch(error => {
        console.error('Login error:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    setFormData({});
  }, [but]);

  
  return (
    <div className='flex items-center justify-center h-screen flex-col bg-blue-50'>
      <div className='flex items-center justify-start'>
        <form onSubmit={handleLogin} className='flex items-center rounded-md flex-col h-fit border border-solid border-black border-opacity-10 px-8 bg-white shadow-2xl' style={{ height: '600px' }}>
          <img src='OFN.png' className='flex justify-center mb-10 h-20 p-20' alt="OFN" />
          <div className='flex flex-col items-center justify-center h-fit'>
            {but === 'Sign In' && <label className='my-2'>
              <input type="name" name="username" value={formData.username || ''} onChange={handleChange} className='rounded-md shadow-lg p-2 border border-solid border-black border-opacity-10' style={{ width: '300px' }} placeholder={'Enter Name'} />
            </label>}
            {but === 'Log In' && <label className='my-2'>
              <input type="id" name="id" value={formData.id || ''} onChange={handleChange} className='rounded-md shadow-lg p-2 border border-solid border-black border-opacity-10' style={{ width: '300px' }} placeholder={'Enter Mobile No. or Email'} />
            </label>}
            {but === 'Sign In' && <label className='my-2'>
              <input type="mobile" name="mobile" value={formData.mobile || ''} onChange={handleChange} className="rounded-md shadow-lg p-2 border border-solid border-black border-opacity-10" style={{ width: '300px' }} placeholder={'Enter Phone Number'} />
            </label>}
            {but === 'Sign In' && <label className='my-2'>
              <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className='rounded-md shadow-lg p-2 border border-solid border-black border-opacity-10' style={{ width: '300px' }} placeholder={'Enter Email'} />
            </label>}
            <label className='my-2'>
              <input type="password" name="password" value={formData.password || ''} onChange={handleChange} className="rounded-md shadow-lg p-2 border border-solid border-black border-opacity-10" style={{ width: '300px' }} placeholder={'Enter Password'} />
            </label>
            <button type='submit' className='text-white mt-10 rounded-lg bg-black w-1/2 p-1.5 mb-10'>{but}</button>
            {type === "Customer" && but === 'Log In' && <Link to='../signin'>{text}</Link>}
            {but === 'Sign In' && <Link to={`../login/${'Customer'}`}>{text}</Link>}
          </div>
        </form>
      </div>
    </div>
  );
}
