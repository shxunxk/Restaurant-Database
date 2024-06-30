import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Navbar() {
  return (
    <div>
      <nav className="bg-blue-400 px-4 py-3 flex items-center justify-between h-20">
        <div className="flex items-center w-1/5 justify-start">
            <Sidebar/>
        </div>
        <p className="text-white text-2xl font-semibold pl-5">One Food Nation</p>
        <div className='flex w-1/5 justify-end'>
            <Link to='./about'><p className='text-white flex items-center justify-center pl-4'>Account</p></Link>
            <Link to='./about'><p className='text-white flex items-center justify-center pl-4'>Log Out</p></Link>
        </div>
      </nav>
    </div>
  )
}
