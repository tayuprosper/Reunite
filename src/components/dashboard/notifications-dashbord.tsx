import React from 'react'
import Notification from '../ui/notification'
import NotificationSkeleton from '../ui/notification-skeleton'

const Notifications = () => {
  return (
    <div className='flex flex-col px-3 sm:mx-3 gap-4  m-t-10'>
        <h1 className='font-bold text-xl py-3'>Notifications</h1>
        <Notification/>
        <Notification/>
        <NotificationSkeleton/>
        <Notification/>
        <NotificationSkeleton/>
    </div>
  )
}

export default Notifications