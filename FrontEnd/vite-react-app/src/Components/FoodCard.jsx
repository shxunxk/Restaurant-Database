/* eslint-disable react/prop-types */
export default function FoodCard({name}) {
  return (
    <div>
      <div className='rounded-md bg-blue-100'>
        <img src='vite.svg' className='h-40 rounded-md'></img>
        <p className="h-10 bg-red-300">{name}</p>
      </div>
    </div>
  )
}
