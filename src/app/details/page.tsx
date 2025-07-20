'use client'

import Image from 'next/image'
import React from 'react'

type ItemType = 'found' | 'lost'

type Props = {
  item: {
    id: string
    type: ItemType
    name: string
    description: string
    date: string
    location: string
    imageUrl: string
    contact?: string
  }
}

const ItemDetails = ({
  item = {
    id: '1',
    type: 'found',
    name: 'Black Wallet',
    description:
      'A black leather wallet with some IDs and receipts inside. Found near Buea Town Road.',
    date: '2025-07-10',
    location: 'Buea Town Road',
    imageUrl: 'https://picsum.photos/600',
    contact: '+237 6XX XXX XXX',
  },
}: Props) => {
  return (
    <div className="max-w-4xl pt-[10vh] mx-auto px-4 py-8">
      {/* Image */}
      <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-md">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-2">{item.name}</h1>

        {/* Labels */}
        <div className="flex flex-wrap gap-2 mb-4 text-sm">
          <span
            className={`px-2 py-1 rounded font-semibold text-white ${
              item.type === 'found' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            {item.type === 'found' ? 'Found Item' : 'Missing Item'}
          </span>
          <span className="bg-gray-200 px-2 py-1 rounded">
            📍 {item.location}
          </span>
          <span className="bg-gray-200 px-2 py-1 rounded">
            📅 {new Date(item.date).toDateString()}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>

        {/* Actions */}
        <div className="flex gap-4 flex-wrap">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            {item.type === 'found' ? 'Claim Item' : 'Report Info'}
          </button>
          <button className="border border-black px-4 py-2 rounded hover:bg-gray-100 transition">
            Share
          </button>
        </div>

        {/* Contact (if found item) */}
        {item.type === 'found' && item.contact && (
          <div className="mt-6 text-sm text-gray-600">
            <p>
              Contact poster:{" "}
              <span className="font-semibold">{item.contact}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ItemDetails
