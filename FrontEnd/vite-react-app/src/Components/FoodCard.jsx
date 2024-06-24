/* eslint-disable react/prop-types */
export default function FoodCard({items}) {
  {console.log(items.image)}
  return (
      <div className='bg-blue-300 hover:text-white border border-l-5 rounded-lg flex flex-col justify-center'>
        <img src={items.image} alt={items.item_name} className='p-4 h-48'></img>
        <div className="rounded-lg">
          <div className="border border-black rounded-lg flex flex-row align-middle text-left p-2 gap-2 border-opacity-40"><p className="w-4/5 max-h-6 overflow-y-scroll">{items.item_name}</p><p>Rs.{items.price}</p></div>
        </div>
      </div>
  )
}
