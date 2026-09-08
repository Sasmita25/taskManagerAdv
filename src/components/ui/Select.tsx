type SelectTypes ={
    heading:string
    options:string[]
    value:string
    onChange:(e:React.ChangeEvent<HTMLSelectElement>)=>void
}
export default function Select({heading,options,onChange,value}:SelectTypes){
    return (
        <div>
             <label>{heading}</label>
              <div className="p-2 border-solid border-2 rounded-sm border-black outline-black ">
            <select className="w-full border-none outline-none" onChange={onChange}  value={value}>
                {options.map((val,i)=><option key={`${val}-${i}`} value={val}>{val}</option>)} 

            </select>
            </div>
        </div>
    )
}