"use client";

import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Settings,
  MessagesSquare,
  Bell,
  Search,
  Layers,
  Home,
  Menu,
} from "lucide-react";
import clsx from "clsx";
import { Item, User } from "..";
import ItemCardFound from "../(components)/itemCardFound";

const messageCount = 3;
const notificationCount = 5;

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainView, setMainView] = useState("dashboard");
  const [dashboardTab, setDashboardTab] = useState("lost");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [foundItems, setFoundItems] = useState<Item[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [lostItems, setLostItems] = useState<Item[]>([]);
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/login");
        } else {
          const userData = await res.json();
          setUser(userData.user);
          const res2 = await fetch("/api/myitems")
          const data = await res2.json();
          if (res2.status !== 200){
            alert("Error getting your data: " + data.error);
          }else{
            setAllItems(data.data);
          }
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

useEffect(() => {
  const found = allItems.filter((item) => item.status === "found");
  setFoundItems(found);

  const lost = allItems.filter((item) => item.status === "lost");
  setLostItems(lost);
}, [allItems]);

  
  

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (loading) return <div className="pt-6 p-6">Loading...</div>;

  return (
    <div className="min-h-screen pt-[5vh] flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside
        className={clsx(
          "bg-white shadow-md p-4 md:p-6 flex flex-col justify-between transition-all duration-300",
          sidebarOpen ? "w-64" : "w-20 md:w-64"
        )}
      >
        <div>
          <div className="flex justify-between items-center mb-6">
            <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu />
            </button>
          </div>
          <nav className="space-y-4">
            <SidebarItem
              icon={<Home size={18} />}
              label="Dashboard"
              active={mainView === "dashboard"}
              onClick={() => setMainView("dashboard")}
            />
            <SidebarItem
              icon={<MessagesSquare size={18} />}
              label="Messages"
              counter={messageCount}
              active={mainView === "messages"}
              onClick={() => setMainView("messages")}
            />
            <SidebarItem
              icon={<Bell size={18} />}
              label="Notifications"
              counter={notificationCount}
              active={mainView === "notifications"}
              onClick={() => setMainView("notifications")}
            />
            <SidebarItem
              icon={<Settings size={18} />}
              label="Account Settings"
              active={mainView === "settings"}
              onClick={() => setMainView("settings")}
            />
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:underline"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {mainView === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Welcome, {user?.email || "User"}</h1>
            <div className="mb-6 space-y-1">
              <p><strong>Email:</strong> {user?.email || "N/A"}</p>
              <p><strong>User ID:</strong> {user?.id}</p>
              <p><strong>Joined:</strong>  { user?.created_at}</p>
            </div>

            <div className="flex space-x-4 border-b pb-2 mb-6">
              <TabButton label="Lost Items" active={dashboardTab === "lost"} onClick={() => setDashboardTab("lost")} />
              <TabButton label="Seen Items" active={dashboardTab === "seen"} onClick={() => setDashboardTab("seen")} />
              <TabButton label="Search Items" active={dashboardTab === "search"} onClick={() => setDashboardTab("search")} />
              <TabButton label="Posted Claims" active={dashboardTab === "claims"} onClick={() => setDashboardTab("claims")} />
            </div>

            {dashboardTab === "lost" && <LostItemsTab items={foundItems} />}
            {dashboardTab === "seen" && <SeenItemsTab  items={lostItems}/>}
            {dashboardTab === "search" && <PlaceholderTab title="Search Items" icon={<Search size={40} />} />}
            {dashboardTab === "claims" && <PlaceholderTab title="Posted Claims" icon={<Layers size={40} />} />}
          </>
        )}

        {mainView === "messages" && <PlaceholderTab title="Messages" icon={<MessagesSquare size={40} />} />}
        {mainView === "notifications" && <PlaceholderTab title="Notifications" icon={<Bell size={40} />} />}
        {mainView === "settings" && <PlaceholderTab title="Account Settings" icon={<Settings size={40} />} />}
      </main>
    </div>
  );
}

// Sidebar item component
function SidebarItem({ icon, label, counter = 0, active, onClick }:{icon: ReactNode, label:string, counter?: number, active: boolean, onClick: MouseEventHandler}) {
  return (
    <div
      className={clsx(
        "flex justify-between items-center cursor-pointer p-2 rounded-md",
        "hover:text-blue-700",
        active ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-700"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="hidden md:inline">{label}</span>
      </div>
      {counter > 0 && (
        <span className="bg-blue-700 text-white rounded-full px-2 text-xs font-medium">
          {counter}
        </span>
      )}
    </div>
  );
}

// Dashboard tab buttons
function TabButton({ label, active, onClick } : {label: string, active: boolean, onClick: MouseEventHandler}) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-t-lg font-semibold",
        active ? "bg-white shadow text-blue-700" : "text-gray-500 hover:text-gray-800"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// Lost Items Tab
function LostItemsTab({ items }: { items: Item[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Lost Items You Posted</h2>
      <div className="p-4  grid justify-center gap-10 items-center sm:grid-cols-2 grid-cols-1 md:grid-cols-3">
        {
          items.map((item: Item) =>{
            return <ItemCardFound item={item} key={item.id}/>
          })
        }
      </div>
    </div>
  );
}

// Seen Items Tab
function SeenItemsTab({ items }: {items: Item[]}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Seen Items You Reported</h2>
      <div className="bg-white p-4 rounded-lg shadow">No seen items reported yet.</div>
    </div>
  );
}

// Placeholder Tabs for other views
function PlaceholderTab({ title, icon }:{title: string, icon: ReactNode}) {
  return (
    <div className="flex flex-col items-center justify-center h-48 text-gray-400">
      {icon}
      <p className="mt-4 text-sm">{title} feature coming soon...</p>
    </div>
  );
}
