
type ButtonProps =
  | {
      type: "submit"
      content?: string
      clr?: string
      bgclr?: string
      bordClr?: string
      hoverBg?:string
      func?: never
    
    }
  | {
      type?: "button"
      content?: string
      clr?: string
      bgclr?: string
      bordClr?: string
      hoverBg?:string
      func: React.MouseEventHandler<HTMLButtonElement>
     
    }

export default function ButtonUsable({
  type = "button",
  content = "Add",
  clr = "text-black",
  bgclr = "bg-purple-600",
  bordClr = "border-black border-2",
  hoverBg =  "hover:bg-purple-200",
  func,
}: ButtonProps) {

  return (
    <button
      type={type}
      className={`${bgclr} ${bordClr} ${clr} ${hoverBg} cursor-pointer inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors  focus:ring-2 focus:ring-purple-500/40 focus:outline-none`}
      onClick={func}
    >
      {content}
    </button>
  );
}