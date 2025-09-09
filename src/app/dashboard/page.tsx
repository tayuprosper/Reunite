"use client"
import React, { useState } from 'react'
import ProfileInfo from '@/components/dashboard/dashboard-profile'
import DashboardTabs from '@/components/dashboard/dashboard-tabs'
import { TabItem } from '@/types/tabs-item'
import { BellDot, PenSquare, Settings } from 'lucide-react'
import Notifications from '@/components/dashboard/notifications-dashbord'
import YourPosts from '@/components/dashboard/your-posts'

const navItems: TabItem[] = [
  { name: "Your Posts", id: 1, icon: <PenSquare height={15} width={15}/> },
  { name: "Notification", id: 2, icon: <BellDot height={15} width={15}/> },
  { name: "Settings", id: 3, icon: <Settings height={15} width={15}/> },
]

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<number>(navItems[0].id)
  return (
    <div className='lg:px-30 bg-gray-100 min-h-screen'>
      <ProfileInfo />
      <DashboardTabs
        items={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {activeSection === 1 && <YourPosts />}
      {activeSection === 2 && <Notifications />}
      {activeSection === 3 && <div className='mx-30'>Settings Section</div>}
    </div>
  )
}

export default Dashboard