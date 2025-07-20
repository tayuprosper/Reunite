import Image from 'next/image'
import React from 'react'
import { Share2, Handshake } from 'lucide-react'

type Props = {}

const ItemCardFound = (props: Props) => {
  return (
    <div className="bg-white w-full rounded-2xl shadow-md hover:shadow-xl transition duration-300 max-w-sm overflow-hidden">
      {/* Image */}
      <div className="relative w-full aspect-[4/3]">
        <Image
          alt="item found"
          fill
          src="https://picsum.photos/300"
          className="rounded-t-2xl object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">Black Leather Wallet</h2>

        <p className="text-xs bg-gray-200 w-fit px-2 py-1 rounded-full font-medium text-gray-700">
          Found at Buea Town Road
        </p>
        <p className="text-xs bg-gray-200 w-fit px-2 py-1 rounded-full font-medium text-gray-700">
          On 12 March 2025
        </p>

        <p className="text-sm text-gray-600 line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem deleniti
          fugiat quis ex, qui ut dolores tenetur molestias optio quaerat numquam
          laboriosam doloribus totam dicta!
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
