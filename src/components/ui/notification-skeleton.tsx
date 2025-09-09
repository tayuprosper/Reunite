import { Bell } from 'lucide-react'
import React from 'react'


const NotificationSkeleton = () => {
  return (
    <div className='flex cursor:pointer items-center gap-4 bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-pulse'>
        <div className="img">
            <Bell/>
        </div>
        <div className="flex flex-col gap-2">
            <div className='bg-gray-300 h-3 w-10 rounded-lg w-[20vw]'></div>
            <div className="bg-gray-300 h-3 w-10 rounded-lg w-[15vw]"></div>
            <div className="bg-gray-300 h-3 w-10 rounded-lg w-[5vw]"></div>
        </div>
    </div>
  )
}

export default NotificationSkeleton