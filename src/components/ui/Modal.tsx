import type { ReactNode } from 'react'

type ModalProps = {
  children: ReactNode
  heading: string
  onClose: () => void
}

export function Modal({ children, heading, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
        className="relative w-full max-w-lg rounded-xl bg-white shadow-xl"
      >
        <div className="relative border-b-2 border-gray-300 p-2">
          <p id="modal-heading">{heading}</p>

          <div className="absolute top-1 right-2">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-4">
          {children}
        </div>
      </div>

    </div>
  )
}