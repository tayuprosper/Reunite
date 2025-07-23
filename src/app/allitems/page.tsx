'use client'

import React, { useEffect, useState } from 'react'
import { Search, Filter, PlusCircle, Layers } from 'lucide-react'
import ItemCardFound from '../(components)/itemCardFound'
import { useRouter } from 'next/navigation'
import { Item } from '..'
// <-- assume this displays one item

const ItemsBoard = () => {
  const [viewType, setViewType] = useState<'found' | 'missing'>('found')
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();
  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await fetch("/api/auth/me");
      const user = await res.json();
      if (res.status !== 200){
          router.push("/login");
          return;
      }

      const data = await fetch("/api/allitems");
      const datares = await data.json();

      if (data.status != 200){
        setItems([]);
      }else{
        setItems(datares.data);
      }


    }

    fetchUser();
  },[]);
  return (
    <div className="px-4 md:px-10 py-8 pt-[10vh]">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Title + Switch View */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <h2 className="text-xl font-bold">
            {viewType === 'found' ? 'Found Items' : 'Missing Items'}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewType('found')}
              className={`px-3 py-1 rounded text-sm font-semibold border ${
                viewType === 'found'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Found
            </button>
            <button
              onClick={() => setViewType('missing')}
              className={`px-3 py-1 rounded text-sm font-semibold border ${
                viewType === 'missing'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Missing
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded w-full md:w-[300px]">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search item..."
            className="ml-2 bg-transparent focus:outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* Filters (UI only) */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button className="flex items-center gap-2 border px-3 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200 transition">
          <Filter size={16} />
          Location
        </button>
        <button className="flex items-center gap-2 border px-3 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200 transition">
          <Layers size={16} />
          Category
        </button>
        <button className="flex items-center gap-2 border px-3 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200 transition">
          <PlusCircle size={16} />
          Date Posted
        </button>
      </div>

      {/* Grid of Items */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Replace with dynamic items later */}
        {
        items.map((item: Item) => (
          <ItemCardFound  key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default ItemsBoard
