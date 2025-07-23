"use client"
import { HamIcon, Menu, Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NavItem } from '.';

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Post Item",
    href: "/postitem",
  },
  {
    label: "Browse Items",
    href: "/allitems",
  },
  {
    label: "My Account",
    href: "/account",
    requiresAuth: true,
  },
  {
    label: "Login",
    href: "/login",
    requiresAuth: false,
  },
];

interface User {
  id: number;
  email: string;
  fullName: string;
}

const Navabar = () => {

  const [user, setUser] = useState<any | null>();

  useEffect(()=>{
  const checkAuth = async ()=>{
      const res = await fetch('/api/auth/me');
      const data = await res.json();

      if(res.ok){
        setUser(data.user);
        console.log(data.user);
      }else{
        setUser(null);
      }
    }
    checkAuth();
  },
  [])


    const [isNavbarShowing, setIsNavbarShowing] = useState(false);
  return (
    <div className='bg-gray-50 z-10 fixed w-screen flex items-center justify-between'>
        <div className="logo flex m-3 gap-5">
            <div className="txt">
                <h1 className='font-black text-lg'>ReUnite</h1>
            </div>
            <div className='bg-gray-200 p-1 hidden md:flex rounded'>
               
                <Search/>
                <input type="text"  className="pl-3 focus:outline-none" placeholder='Search...' />
            </div>
        </div>
        {
            isNavbarShowing ? <X onClick={()=> setIsNavbarShowing(!isNavbarShowing)} className='mr-5 sm:hidden'/> :  <Menu onClick={()=> setIsNavbarShowing(!isNavbarShowing)} className='mr-5 sm:hidden'/>
        }
       
         <motion.div 
      initial={{ x: -100, opacity: 0 }}   // Start off-screen to the left
      animate={{ x: 0, opacity: 1 }}      // Slide in to position
      transition={{ duration: 0.5, ease: 'easeOut' }}
         className={`navigation  ${isNavbarShowing ? "absolute h-fit w-full" : "hidden z-0 sm:block sm:absolute  "} bg-white sm:bg-transparent sm:top-0
          font-semibold right-0 top-[8vh] pr-10`}>
          {
             <ul className={`flex flex-col ${!isNavbarShowing && 'z-50'} md:flex-row sm:flex-row text-sm `}>
                {
  navItems.map((item) => {
    if (item.requiresAuth && !user) return null; // Hide items that need auth when not logged in
    if (item.label === "Login" && user) return null; // Hide login when user is present
    return (
      <Link key={item.href} href={item.href} className="flex items-center gap-2 p-2">
        <li className='hover:bg-gray-200 rounded p-2'>{item.label}</li>
      </Link>
    );
  })
}

            </ul>
          }   
           
        </motion.div> 
       
        
    </div>
  )
}

export default Navabar