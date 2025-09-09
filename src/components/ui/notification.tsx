import { Bell } from 'lucide-react'
import React from 'react'

const Notification = () => {
  return (
    <div className='flex cursor:pointer items-center gap-4 bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'>
        <div className="img bg-black text-white p-3 rounded-full flex justify-center items-center">
            <Bell/>
        </div>
        <div className="content">
            <h1 className='font-bold text-medium'>Title of the Notification</h1>
            <p className='text-sm'>Content of the notifucation to be checked</p>
            <p className='text-sm text-gray-600'>10-05-2025, 2:13pm</p>
        </div>
    </div>
  )
}

export default Notification