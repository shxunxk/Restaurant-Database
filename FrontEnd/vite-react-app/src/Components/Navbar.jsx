import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <nav className="bg-black px-4 py-3 flex items-center justify-between">
        <div className="">
            <p className="text-white text-2xl font-semibold">One Food Nation</p>
        </div>
        <div className='flex'>
            <Link to='./about'><p className='text-white flex items-center justify-center pl-4'>About</p></Link>
            <Link to='./about'><p className='text-white flex items-center justify-center pl-4'>Account</p></Link>
            <Link to='./about'><p className='text-white flex items-center justify-center pl-4'>Cart</p></Link>
        </div>
      </nav>
    </div>
  )
}
