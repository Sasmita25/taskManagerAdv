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
className="relative w-full max-w-lg rounded-xl border border-gray-200 bg-white text-gray-900 shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        <div className="relative border-b border-gray-200 p-4 dark:border-gray-700">
          <p id="modal-heading"  className="pr-8 text-lg font-semibold text-gray-900 dark:text-gray-100">{heading}</p>

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