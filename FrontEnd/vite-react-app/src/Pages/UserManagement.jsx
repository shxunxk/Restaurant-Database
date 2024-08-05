/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Slip from '../Components/Slip';
import SearchBar from '../Components/SearchBar';

export default function UserManagement() {
  const [emp, setEmp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/customerEmployee/employee')
      .then(response => {
        setEmp(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = emp.filter(employee =>
    employee?.employee_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='mt-10 mx-4 sm:mx-16'>
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} page={'Employee'}/>
      </div>
      <div className="mt-20 mx-4 sm:mx-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((item, index) => (
            <Slip key={index} data={item} button={['View', 'Delete']} />
          ))
        ) : (
          <div>No employees found.</div>
        )}
      </div>
    </>
  );
}
