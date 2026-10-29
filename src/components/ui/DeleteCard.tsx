import ButtonUsable from "./Button";
type DeleteCardType = {
    onClose:() => void
   onDelete: () => void;
   isDeleting?:boolean;
}

export function DeleteCard({onClose,onDelete,isDeleting}:DeleteCardType){
 
    return(
        <div className="flex flex-col items-center gap-4">
            <h2>Are you sure wanna delete it ?</h2>
            <div className="flex flex-row gap-3 justify-center">
<ButtonUsable
  type="button"
  func={onDelete}
  content={isDeleting ? "Deleting..." : "YES"}
  bgclr="bg-green-500"
  hoverBg="hover:bg-green-400"
  disabled={isDeleting}
/>

<ButtonUsable
  type="button"
  func={onClose}
  content="NO"
  bgclr="bg-red-500"
  hoverBg="hover:bg-red-400"
  disabled={isDeleting}
/>
            </div>
        </div>
    )
}