import { useMemo, useState } from "react"

export default function Options({getType}) {

    const options = ['Starter', 'Main', 'Sides', 'Drinks', 'Extras']

    const [selected, setSelected] = useState(0)

    useMemo(()=>{
      getType(options[selected])
    },[selected, getType])

    const changeStyle = (index) => {
      setSelected(index)
    }
  return (
    <div className="flex flex-col sm:flex-row justify-between">
      {options.map((item, index)=>(
        <div key={index} className='flex-1 border border-b-gray-600 border-opacity-60' style={{backgroundColor: index===selected? '#1E9FDC' : 'white', color: index === selected?'white':'black'}} onClick={()=>changeStyle(index)}>
            <p className="font-bold text-center p-1 hover:bg-blue-300  hover:text-white">{item}</p>
        </div>
      ))}
    </div>
  );
}
