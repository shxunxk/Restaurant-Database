/* eslint-disable react/jsx-key */
import Navbar from '../Components/Navbar'
import Options from '../Components/Options'
import FoodCard from '../Components/FoodCard'
import Slideshow from '../Components/SlideShow'

export default function Home() {
  
const food = [{name:'1'},{name:'2'}, {name:'1'},{name:'2'}, {name:'1'},{name:'2'},{name:'1'},{name:'Xacuti'}]

  return (
    <div>
      {/* <Slideshow/> */}
      <div className='mt-20 mx-16'>
        <Options/>
        <div className='grid grid-cols-6 gap-12'>
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
