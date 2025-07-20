"use client"
import { useEffect, useState } from "react";
import { LogOut, PlusCircle, ArchiveRestore, Search, CheckCircle, Bell, User, Eye } from "lucide-react";

type User = {
  name: string,
  id: number,
  email: string
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>();
  const [notificationCount, setNotificationCount] = useState(3); // Example counter


  useEffect(()=>{
      const fetchUser = ()=>{
      }
  }, [])



  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-800">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome, {user.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative text-gray-600 hover:text-gray-800 flex items-center gap-2">
            <Bell size={18} /> Notifications
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                {notificationCount}
              </span>
            )}
          </button>
          <button className="text-blue-500 hover:text-blue-700 flex items-center gap-2">
            <User size={18} /> Edit Profile
          </button>
          <button className="text-red-500 hover:text-red-700 flex items-center gap-2">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <button className="bg-white shadow p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-gray-50">
          <PlusCircle size={24} />
          <span>Report Lost Item</span>
        </button>
        <button className="bg-white shadow p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-gray-50">
          <ArchiveRestore size={24} />
          <span>Report Found Item</span>
        </button>
        <button className="bg-white shadow p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-gray-50">
          <Search size={24} />
          <span>Search Items</span>
        </button>
      </div>

      {/* My Reports */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">My Reports</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Lost Items */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Items I've Lost</h3>
            <ul className="divide-y divide-gray-200">
              <li className="py-2 flex justify-between items-center">
                <span>Blue Backpack</span>
                <span className="text-sm text-gray-400">Pending</span>
              </li>
            </ul>
          </div>

          {/* Found Items */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Items I've Found</h3>
            <ul className="divide-y divide-gray-200">
              <li className="py-2 flex justify-between items-center">
                <span>Samsung Phone</span>
                <span className="text-sm text-green-500 flex items-center gap-1">
                  <CheckCircle size={16} /> Claimed
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Matches */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Recent Matches</h2>
        <div className="bg-white p-4 rounded-xl shadow">
          <ul className="divide-y divide-gray-200">
            <li className="py-2">Wallet matched to John D. - July 15</li>
            <li className="py-2">Keys returned to Sarah - July 13</li>
          </ul>
        </div>
      </div>

      {/* Recently Posted Items */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Recently Posted Items</h2>
        <div className="bg-white p-4 rounded-xl shadow">
          <ul className="divide-y divide-gray-200">
            <li className="py-2 flex justify-between items-center">
              <span>Lost: Black Wallet</span>
              <span className="text-sm text-gray-400">July 17</span>
            </li>
            <li className="py-2 flex justify-between items-center">
              <span>Found: iPhone X</span>
              <span className="text-sm text-gray-400">July 16</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Account Management */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="bg-white p-4 rounded-xl shadow space-y-3">
          <button className="block text-left w-full text-blue-600 hover:underline">Edit Profile Information</button>
          <button className="block text-left w-full text-blue-600 hover:underline">Change Password</button>
          <button className="block text-left w-full text-red-600 hover:underline">Delete Account</button>
        </div>
      </div>
    </div>
  );
}
