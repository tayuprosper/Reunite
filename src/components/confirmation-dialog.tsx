import { X } from 'lucide-react'
import React from 'react'

export interface DialogProps {
  title: string;
  content: string;
  actions?: React.ReactNode;
  type?: 'info' | 'warning' | 'error' | 'success';
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
}
const ConfirmationDialog: React.FC<DialogProps> = ({
    title,
    content,
    type = 'info',
    onConfirm,
    onCancel,
    showConfirmButton = true,
    showCancelButton = true,
}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white/50 backdrop-blur  z-10'>
        <div className='w-[30%] p-3 bg-white rounded-lg shadow-lg relative'>
            <div className="top flex justify-end mb-2 cursor-pointer">
                <X onClick={()=>onCancel?.()}/>
            </div>
            <h1 className='font-bold text-lg'>{title}</h1>
            <p className='font-bold text-sm text-gray-600'>{content}</p>
            <div className='flex justify-end gap-2 mt-4 font-bold text-sm'>
                {showCancelButton && (
                    <button className=' bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors' onClick={onCancel}>
                        Cancel
                    </button>
                )}
                {showConfirmButton && (
                    <button className={` ${type === 'warning' && "bg-red-600"} text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors`} onClick={onConfirm}>
                        Confirm
                    </button>
                )}
            </div>
        </div>
    </div>
  )
}

export default ConfirmationDialog