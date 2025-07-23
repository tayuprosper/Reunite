import Image from 'next/image'
import React from 'react'
import { Share2, Handshake } from 'lucide-react'
import { Item } from '..'
import { useRouter } from 'next/navigation'



const ItemCardFound = ({ item } : {item: Item}) => {
  const router = useRouter();
  const getDetails = ()=>{
      router.push(`/details/${item.id}`);
  }

  return (
    <div className="bg-white w-full rounded-2xl shadow-md hover:shadow-xl transition duration-300 max-w-sm overflow-hidden">
      {/* Image */}
      <div className="relative w-full aspect-[4/3]">
        <Image
          alt="item found"
          fill
          src={item.img_url}
          className="rounded-t-2xl object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 onClick={()=>getDetails()} className="text-lg md:text-xl font-bold text-gray-800 hover:underline hover:cursor-pointer">{item.title}</h2>

        <p className="text-xs bg-gray-200 w-fit px-2 py-1 rounded-full font-medium text-gray-700">
          {item.location}
        </p>
        <p className="text-xs bg-gray-200 w-fit px-2 py-1 rounded-full font-medium text-gray-700">
          {item.date_found}
        </p>

        <h1 className='font-bold text-lg text-black'>Description</h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {item.description}
        </p>

        {/* Actions */}
        <div className="flex justify-between items-center pt-2">
          <button className="flex items-center gap-1 bg-black text-white text-sm px-3 py-1.5 rounded-xl hover:bg-gray-800 transition">
            <Handshake className="w-4 h-4" />
            Claim
          </button>
          <button className="flex items-center gap-1 border text-sm px-3 py-1.5 rounded-xl hover:bg-gray-100 transition">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemCardFound
