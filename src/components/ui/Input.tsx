type InputTypes ={
    heading:string,
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value:string
}
export default function Input({heading,onChange,value}:InputTypes){
    return (
        <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
  {heading}
</label>
           
      <div className="p-2 border-2 rounded-sm border-gray-300 dark:border-gray-600">
  <input
    type="text"
    className="w-full border-none bg-transparent text-gray-900 outline-none dark:text-gray-100"
    onChange={onChange}
    value={value}
  />
</div>
        
        </div>
    )
}