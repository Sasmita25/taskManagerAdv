type SelectTypes ={
    heading:string
    options:string[]
    value:string
    onChange:(e:React.ChangeEvent<HTMLSelectElement>)=>void
}
export default function Select({heading,options,onChange,value}:SelectTypes){
    return (
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
  {heading}
</label>
              <div className="p-2 border-2 rounded-sm border-gray-300 dark:border-gray-600">
  <select
    className="w-full border-none bg-transparent text-gray-900 outline-none dark:text-gray-100 dark:bg-gray-900"
    onChange={onChange}
    value={value}
  >
    {options.map((val, i) => (
      <option key={`${val}-${i}`} value={val}>
        {val}
      </option>
    ))}
  </select>
</div>
        </div>
    )
}