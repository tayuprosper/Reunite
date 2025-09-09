"use client"
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { MenuIcon, X } from "lucide-react";
import { useSupabase } from "@/lib/supabase/supabase-provider";
const APP_NAME = "Reunite";

const navItems = [
    { to: "/", requireAuth: false, text: "Home", className: "bg-transparent hover:bg-transparent text-gray-700 hover:text-blue-600 text-sm px-2 py-1  transition-colors duration-200 font-bold" },
    { to: "/all-items", requireAuth: false, text: "Find Items", className: "bg-transparent hover:bg-transparent text-gray-700 hover:text-blue-600 text-sm px-2 py-1 transition-colors duration-200 font-bold" },
    { to: "/about", requireAuth: false, text: "About", className: "bg-transparent hover:bg-transparent text-gray-700 hover:text-blue-600 text-sm px-2 py-1 l transition-colors duration-200 font-bold" },
    { to: "/auth/login/", requireAuth: false, text: "Login", className: "bg-black text-white hover:bg-gray-600 hover:text-black text-sm px-2 py-1  transition-colors duration-200 font-bold" },
    {to: "/dashboard", requireAuth: true, text: "Dashboard", className: "bg-transparent hover:bg-transparent text-gray-700 hover:text-blue-600 text-sm px-2 py-1 transition-colors duration-200 font-bold" },
];

const NavBar: React.FC = () => {
  const { user: supabaseUser } = useSupabase(); // ✅ top-level hook
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
    setLoading(true);
    
    // you can now safely use supabase + supabaseUser
    if (!supabaseUser) {
      setUser(null);
    } else {
      setUser(supabaseUser);
    }

    setLoading(false);
  }, [supabaseUser]);


        if (loading) {
            return <div className="skeltonnav">
                <div className="logo">Reunite</div>
            </div>
        }else


        return (
        <nav className="w-full flex items-center justify-between lg:px-30  px-10 py-3 bg-white shadow-md relative">
            {/* Logo */}
            <div className="flex items-center">
                <Link href="/">
                    <span className="text-lg font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors duration-200">{APP_NAME}</span>
                </Link>
            </div>
            {/* Navigation Links (Desktop) */}
            <div className="hidden font-bold md:flex items-center gap-2">
                {
                    navItems.map((item,idx)=>{
                        if (item.requireAuth && !user ) { return null } else{
                            if (item.text === "Login" && user){
                                return null;
                            }
                        return <Link key={idx} href={item.to}>
                        <Button className={item.className}>{item.text}</Button>
                        </Link>
                        }
                    })
                }
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                    type="button"
                    aria-label="Open menu"
                    className="bg-transparent hover:bg-transparent text-gray-700 p-2 rounded-md font-medium border-none shadow-none transition-colors duration-200"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    
                    { 
                        menuOpen ? <X/> : <MenuIcon />
                    }
                </button>
            </div>
            {/* Mobile Navigation Links */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full font-bold bg-white border-b border-gray-200 flex flex-col items-center gap-2 py-2 md:hidden z-50">
                    {navItems.map((item, idx) => (
                        (item.requireAuth && !user ) ? null : (item.text === "Login" && user) ? null :
                        <Link key={item.text + "-mobile-" + idx} href={item.to}><Button  className={item.className.replace("text-sm px-2 py-1", "text-base px-4 py-2 w-fit")} >{item.text}</Button></Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
export default NavBar;