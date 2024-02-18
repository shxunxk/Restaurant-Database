/* eslint-disable react/prop-types */
export default function FoodCard({name}) {
  return (
    <div>
      <div className=''>
        <img src='vite.svg' className='h-36'></img>
        <p>{name}</p>
      </div>
    </div>
  )
}
