import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import Cookies from 'js-cookie';


export default function Navbar() {

  const handleLogout = () => {
    Cookies.remove('user');
    window.location.href = '/start';
  }

  return (
    <div>
      <nav className="bg-blue-400 px-4 py-3 flex items-center justify-between h-20">
        <div className="flex items-center w-1/5 justify-start">
            <Sidebar/>
        </div>
        <p className="text-white text-2xl font-semibold pl-5">One Food Nation</p>
        <div className='flex w-1/5 justify-end'>
            <p className='text-white flex items-center justify-center pl-4'>Account</p>
            <p className='text-white flex items-center justify-center pl-4' onClick={handleLogout}>Log Out</p>
        </div>
      </nav>
    </div>
  )
}
