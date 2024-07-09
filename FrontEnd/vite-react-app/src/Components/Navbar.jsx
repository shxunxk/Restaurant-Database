import Sidebar from './Sidebar'
import Cookies from 'js-cookie';


export default function Navbar() {

  const userCookie = Cookies.get('user');

  const handleLogout = () => {
    Cookies.remove('user');
    window.location.href = '/';
  }

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 bg-blue-400 px-4 py-3 flex items-center justify-between h-20">
        <div className="flex items-center w-1/5 justify-start">
        { userCookie && <Sidebar/>}
        </div>
        <p className="text-white text-2xl font-semibold">One Food Nation</p>
        <div className='flex w-1/5 justify-end'>
        { userCookie && <p className='text-white flex items-center justify-center pl-4' onClick={handleLogout}>Log Out</p>}
        </div>
      </nav>
    </div>
  )
}
