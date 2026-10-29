
type ButtonProps =
  | {
      type: "submit"
      content?: string
      clr?: string
      bgclr?: string
      bordClr?: string
      hoverBg?:string
      func?: never
      disabled?: boolean
    }
  | {
      type?: "button"
      content?: string
      clr?: string
      bgclr?: string
      bordClr?: string
      hoverBg?:string
      func: React.MouseEventHandler<HTMLButtonElement>
      disabled?: boolean
     
    }

export default function ButtonUsable({
  type = "button",
  content = "Add",
  clr = "text-black",
  bgclr = "bg-purple-600",
  bordClr = "border-purple border-2",
  hoverBg =  "hover:bg-purple-400",
  func,
  disabled
}: ButtonProps) {

  return (
    <button
      type={type}
     className={`${bgclr} ${bordClr} ${clr} ${hoverBg} inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors focus:ring-2 focus:ring-purple-500/40 focus:outline-none ${
  disabled
    ? "cursor-not-allowed opacity-60"
    : "cursor-pointer"
}`}
      onClick={func}
      disabled={disabled}
    >
      {content}
    </button>
  );
}