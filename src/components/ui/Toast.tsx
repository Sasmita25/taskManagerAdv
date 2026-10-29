type ToastProps = {
  message: string;
  type: "success" | "error";
};

export default function Toast({ message, type }: ToastProps) {
  return (
    <div className={`fixed right-4 bottom-4 z-50 rounded-lg px-4 py-3 text-white ${type === "success" ? "bg-green-500" : "bg-red-500"}`}>
      {message}
    </div>
  )
}