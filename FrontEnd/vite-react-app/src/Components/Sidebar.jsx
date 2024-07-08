import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


const Sidebar = () => {

  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        setUserType(user.type);
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
      }
    }
  }, []);
  // const user.type = user ? JSON.parse(user).type : null;

  const [cond, setCond] = useState(false);

  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      className='transparent'
      onClick={() => setCond(!cond)}
    >
      {!cond && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="8" y1="12" x2="16" y2="12" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="15" x2="16" y2="15" />
        </svg>
      )}
      {cond && (
        <div className="sidebar-menu">
            <div className="fixed top-0 left-0 h-full w-48 bg-white border-r border-gray-400">
              <div className='bg-blue-600 h-16 flex justify-start items-center'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
                fill="none"
                stroke="white"
                strokeWidth="0.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <line x1="1" y1="6.5" x2="2" y2="5.5" />
                <line x1="1" y1="5.5" x2="2" y2="6.5" />
                </svg>
              </div>
                <div className='flex flex-col h-full flex-1 justify-between justify-middle p-3 text-gray-600'>
                    <ul className="flex flex-col text-xl my-4">
                    {user?.type === 'Customer' && (
                  <>
                    <li className="p-2 hover:text-2xl"><Link to='/orders'>My Orders</Link></li>
                    <li className="p-2 hover:text-2xl"><Link to='/newOrder'>Place Order</Link></li>
                    <li className="p-2 hover:text-2xl"><Link to='/bill'>My Bill</Link></li>
                  </>
                )}
                {user?.type === 'Employee' && (
                  <>
                    <li className="p-2 hover:text-2xl"><Link to='/menu'>Menu</Link></li>
                    <li className="p-2 hover:text-2xl"><Link to='/customers'>Customers</Link></li>
                    <li className="p-2 hover:text-2xl"><Link to='/orders'>Orders</Link></li>
                    <li className="p-2 hover:text-2xl"><Link to='/newOrder'>Place Order</Link></li>
                    <li className="p-2 hover:text-2xl"><Link to='/bill'>Bills</Link></li>
                  </>
                )}
                    </ul>
                    <li className='flex justify-between p-4 h-fit items-center'>
                      <img src={'vite.svg'} className='h-full bg-gray-200 p-2' style={{borderRadius:'50%'}}/>
                      <p>My Account</p>
                    </li>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
