type ButtonProps={
content?:string;
clr?:string;
bgclr?:string;
bordClr?:string
}

export default function ButtonUsable({content="Add",clr="text-black",bgclr="bg-white",bordClr="border-black border-2"}:ButtonProps){
    return(
        <div className={`${bgclr} ${bordClr} ${clr} w-fit cursor-pointer` }>
           <p>{content}</p>
        </div>
    )
}