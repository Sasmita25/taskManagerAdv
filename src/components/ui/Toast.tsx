type ToastProps = {
  message: string
}

export default function Toast({ message }: ToastProps) {

  return (
    <div className="fixed right-4 bottom-4 z-50 rounded-lg bg-green-500 px-4 py-3 text-white">
      {message}
    </div>
  )
}