type TextAreaTypes ={
    heading:string,
    onChange:(e:React.ChangeEvent<HTMLTextAreaElement>)=>void
    value:string
}
export default function TextArea({heading,onChange,value}:TextAreaTypes){
    return (
        <div>
                      <label>{heading}</label>

             
        <div className="p-2 border-solid border-2 rounded-sm border-black outline-black ">
           
            <textarea  onChange={onChange} value={value} className="border-none outline-none w-full"/>
            </div> 
            
        </div>
    )
}