import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [cond, setCond] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        setUser(user);
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
      }
    }
  }, []);


  return  (
    <div
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
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
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      )}
      {cond && (
        <div className="sidebar-menu fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200" style={{ overflowY: 'auto' }}>
          <div className='bg-blue-600 h-16 flex justify-between items-center px-4'>
            <div className="text-white font-semibold text-xl">Menu</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() => setCond(false)}
              style={{ cursor: 'pointer' }}
              height="24"
              width="24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <div className='flex flex-col h-full text-gray-700 p-4 justify-between'>
            <ul className="flex flex-col space-y-4">
              {user?.type === 'Customer' && (
                <>
                  <Link to='/orders'><li key="my-orders" className="hover:text-blue-600">
                    My Orders
                  </li></Link>
                  <Link to='/newOrder'><li key="place-order" className="hover:text-blue-600">
                    Place Order
                  </li></Link>
                  <Link to='/bill'><li key="my-bill" className="hover:text-blue-600">
                    My Bill
                  </li></Link>
                </>
              )}
              {user?.type === 'Employee' && (
                <>
                  <Link to='/menu'><li key="menu" className="hover:text-blue-600">
                    Menu
                  </li></Link>
                  <Link to='/customers'><li key="customers" className="hover:text-blue-600">
                    Customers
                  </li></Link>
                  <Link to='/orders'><li key="orders" className="hover:text-blue-600">
                    Orders
                  </li></Link>
                  <Link to='/newOrder'><li key="place-order-employee" className="hover:text-blue-600">
                    Place Order
                  </li></Link>
                  <Link to='/bill'><li key="bills" className="hover:text-blue-600">
                    Bills
                  </li></Link>
                  {user?.user?.employee_position === "Manager" && <Link to='/userManagement'><li key="userManagement" className="hover:text-blue-600">
                    User Management
                  </li></Link>}
                </>
              )}
            </ul>
            <Link to='/myAccount'>
              <div className='flex items-center mt-auto'>
                <img src={'vite.svg'} className='w-10 h-10 bg-gray-200 rounded-full' alt="Profile" />
                <p className='ml-4'>My Account</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
