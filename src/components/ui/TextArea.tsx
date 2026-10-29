type TextAreaTypes ={
    heading:string,
    onChange:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void
    value:string
}
export default function TextArea({heading,onChange,value}:TextAreaTypes){
    return (
        <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
  {heading}
</label>

    <div className="p-2 border-2 rounded-sm border-gray-300 dark:border-gray-600">
  <textarea
    onChange={onChange}
    value={value}
    className="w-full border-none bg-transparent text-gray-900 outline-none dark:text-gray-100"
  />
</div>
            
        </div>
    )
}