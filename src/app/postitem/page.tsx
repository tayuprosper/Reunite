'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type PostType = 'found' | 'lost'

type PostItemFormData = {
  type: PostType
  itemName: string
  location: string
  date: string
  description: string
  image?: FileList
}

const PostItemForm = () => {
  const [postType, setPostType] = useState<PostType>('found')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostItemFormData>()

  const onSubmit = (data: PostItemFormData) => {
    console.log(data)
  }

  return (
    <div className="flex justify-center px-4 py-[15vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Post {postType === 'found' ? 'Found' : 'Lost'} Item</h1>

        {/* Toggle Found / Lost */}
        <div className="flex justify-center mb-4 gap-2">
          <button
            type="button"
            onClick={() => setPostType('found')}
            className={`px-4 py-1 text-sm font-semibold rounded border ${
              postType === 'found' ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            Found
          </button>
          <button
            type="button"
            onClick={() => setPostType('lost')}
            className={`px-4 py-1 text-sm font-semibold rounded border ${
              postType === 'lost' ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            Lost
          </button>
        </div>

        {/* Hidden field for type */}
        <input type="hidden" value={postType} {...register('type')} />

        {/* Item Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Item Name</label>
          <input
            type="text"
            {...register('itemName', { required: 'Item name is required' })}
            className="w-full p-2 rounded border bg-white"
            placeholder="e.g. Black Wallet"
          />
          {errors.itemName && <p className="text-sm text-red-600 mt-1">{errors.itemName.message}</p>}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            {...register('location', { required: 'Location is required' })}
            className="w-full p-2 rounded border bg-white"
            placeholder="e.g. Buea Town Road"
          />
          {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            {...register('date', { required: 'Date is required' })}
            className="w-full p-2 rounded border bg-white"
          />
          {errors.date && <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="w-full p-2 rounded border bg-white"
            rows={4}
            placeholder="Briefly describe the item..."
          />
          {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>}
        </div>

        {/* Image Upload (UI only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            {...register('image')}
            accept="image/*"
            className="w-full text-sm"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition"
        >
          Post Item
        </button>
      </form>
    </div>
  )
}

export default PostItemForm
