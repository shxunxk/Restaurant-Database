import Navbar from '../Components/Navbar'
import Options from '../Components/Options'
export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className='mt-36 mx-16 bg-slate-500'>
        <Options/>
      </div>
    </div>
  )
}
