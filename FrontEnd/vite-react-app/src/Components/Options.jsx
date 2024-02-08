export default function Options() {

    const options = ['Starter', 'Main', 'Sides', 'Drinks', 'Extras']
  return (
    <div className="flex justify-evenly">
      {options.map((item)=>(
        <div key={item} className='w-1/5'>
            <p>{item}</p>
        </div>
      ))}
    </div>
  );
}
