import type { ReactNode } from 'react'

type ModalProps = {
  children: ReactNode
  onClose: () => void
}

export function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer"
        >
          ✕
        </button>

        {children}

      </div>

    </div>
  )
}