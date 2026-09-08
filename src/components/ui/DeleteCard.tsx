import ButtonUsable from "./Button";
type DeleteCardType = {
    onClose:() => void
   onDelete: () => void;
   
}

export function DeleteCard({onClose,onDelete}:DeleteCardType){
    return(
        <div className="flex flex-col items-center gap-4">
            <h2>Are you sure wanna delete it ?</h2>
            <div className="flex flex-row gap-3 justify-center">
                <ButtonUsable func={()=>onDelete()} content="YES" bgclr="bg-green-500" hoverBg="hover:bg-green-400"/>
                <ButtonUsable func={()=>onClose()} content="NO" bgclr="bg-red-500" hoverBg="hover:bg-red-400"/>
            </div>
        </div>
    )
}