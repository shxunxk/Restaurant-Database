import { useState } from "react"

export default function Options() {

    const options = ['Starter', 'Main', 'Sides', 'Drinks', 'Extras']

    const [selected, setSelected] = useState(0)

    const changeStyle = (index) => {
      setSelected(index)
    }
  return (
    <div className="flex justify-evenly">
      {options.map((item, index)=>(
        <div key={index} className='h-8 w-1/5 border border-black-100'  style={{backgroundColor: index===selected? 'red' : 'white', borderTopLeftRadius: index === selected ? '10px' : '0px', borderTopRightRadius: index === selected ? '10px' : '0px',}} onClick={()=>changeStyle(index)}>
            <p className="">{item}</p>
        </div>
      ))}
    </div>
  );
}
