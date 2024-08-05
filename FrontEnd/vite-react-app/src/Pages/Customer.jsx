/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import Slip from '../Components/Slip';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import SearchBar from '../Components/SearchBar';

export default function Customers() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/customerEmployee/customer')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  console.log(data)

  const filteredData = data.filter(customer =>
    customer?.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className='mt-10 mx-4 sm:mx-16'>
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} page={'Customer'}/>
      </div>
      <div className="mt-20 mx-4 sm:mx-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <Slip key={index} data={item} button={['View', 'Delete']} />
          ))
        ) : (
          <div>No customers found.</div>
        )}
      </div>
    </>
  );
}
