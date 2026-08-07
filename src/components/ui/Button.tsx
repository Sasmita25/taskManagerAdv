type ButtonProps={
content?:string;
clr?:string;
bgclr?:string;
bordClr?:string
}

export default function ButtonUsable({content="Add",clr="text-black",bgclr="bg-purple-600",bordClr="border-black border-2"}:ButtonProps){
    return(
         <button
          type="button"
          className={`${bgclr} ${bordClr} ${clr} cursor-pointer inline-flex items-center gap-2 rounded-lg  px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-purple-700 focus:ring-2 focus:ring-purple-500/40 focus:outline-none"
        `}>{content}</button>
      
    )
}