type InputTypes ={
    heading:string,
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value:string
}
export default function Input({heading,onChange,value}:InputTypes){
    return (
        <div>
             <label>{heading}</label>
           
        <div className="p-2 border-solid border-2 rounded-sm border-black outline-black ">
           
            <input type="text" className="border-none outline-none w-full" onChange={onChange} value={value}/>
            </div> 
        
        </div>
    )
}