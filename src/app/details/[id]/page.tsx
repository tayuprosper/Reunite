"use client"
import { Item } from '@/app';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {}

function Details() {
    const params = useParams();
   const [loading, setLoading] =  useState<boolean>(false)
   const [loadError, setLoadError] =  useState<string>("")
   const [item, setItem] = useState<Item>();

   useEffect(()=>{
    setLoading(true);
        const getItem = async ()=>{
            const res = await fetch(`/api/oneitem?id=${params.id}`);

            const results = await res.json();

            if (res.status !== 200){
                setLoadError(results.error);
                setLoading(false);
            }else{
                setItem(results.data[0]);
                setLoading(false);
                console.log(results.data[0])
            }
        }

        getItem();
   }, [])

   return (
  <div className="max-w-3xl mx-auto pt-[10vh] px-4 py-10">
    {loadError ? (
      <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold">Failed to load item</h2>
        <p className="text-sm mt-2">{loadError}</p>
      </div>
    ) : (
      item && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {item.img_url && (
            <img
              src={item.img_url}
              alt={"item found"}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">{item.title}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Posted on {item.date_found}
            </p>
            <div className="mt-4 text-gray-700">
                 <h1 className='font-bold text-lg text-black'>Description</h1>
                {item.description}
                </div>

            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <span className="inline-block bg-gray-800 text-white text-xs font-medium px-3 py-1 rounded-full">
                {item.status}
              </span>
              <span className="text-sm text-gray-600">Location: {item.location}</span>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-900 transition disabled:opacity-50"
                onClick={() => {
                  // Open contact modal or send message
                }}
              >
                Message Poster
              </button>

              <button
                className="border border-black text-black px-4 py-2 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition disabled:opacity-50"
                onClick={() => {
                  // Mark item as claimed
                }}
              >
                Mark as Claimed
              </button>
            </div>
          </div>
        </div>
      )
    )}
  </div>
);
}

export default Details