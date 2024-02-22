import { useState } from "react"

export default function Options() {

    const options = ['Starter', 'Main', 'Sides', 'Drinks', 'Extras']

    const [selected, setSelected] = useState(0)

    const changeStyle = (index) => {
      setSelected(index)
    }
  return (
    <div className="flex justify-between">
      {options.map((item, index)=>(
        <div key={index} className='h-8 w-1/6 border border-black-100 rounded-md'  style={{backgroundColor: index===selected? 'blue' : 'white', borderTopRightRadius: index === selected ? '10px' : '0px', color: index === selected?'white':'black'}} onClick={()=>changeStyle(index)}>
            <p className="font-bold">{item}</p>
        </div>
      ))}
    </div>
  );
}
