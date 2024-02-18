/* eslint-disable react/jsx-key */
import Navbar from '../Components/Navbar'
import Options from '../Components/Options'
import FoodCard from '../Components/FoodCard'

export default function Home() {
  
const food = [{name:'1'},{name:'2'}]
  return (
    <div>
      <Navbar/>
      <div className='mt-36 mx-16'>
        <Options/>
        <div className='grid grid-cols-4 gap-4'>
        {food.map((item)=>(
          <div className='mt-10 justify-between'>
          <FoodCard name={item.name}/>
          </div>
        ))}
        </div>
      </div>   
    </div>
  )
}
