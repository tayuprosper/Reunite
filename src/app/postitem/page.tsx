'use client'

// import { redirect } from 'next/dist/server/api-utils'
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type PostType = 'found' | 'lost'

type PostItemFormData = {
  status: PostType
  title: string
  location: string
  date_found: string
  description: string
  image: FileList
}

const PostItemForm = () => {
const router = useRouter();
 const [posting, setPosting] = useState(false)
 

   useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me')

        if (res.status !== 200) {
          router.push('/login')
        }
      } catch (err) {
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  const [postType, setPostType] = useState<PostType>('found')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostItemFormData>()

  const onSubmit = async (data: PostItemFormData) => {
    setPosting(true);
    if(!data.image || data.image.length === 0){
      alert("Please select an image of the item");
      setPosting(false);
      return
    }

    const imageData = data.image[0];

    const imageForm = new FormData();
    imageForm.append("file", imageData);

    const uploadRes = await fetch("/api/upload",
      {
        method: "POST",
        body: imageForm,
      }
    );

    const imgres = await uploadRes.json();

    if(uploadRes.status !== 200){
      alert("Image upload failed" + imgres.error);
      setPosting(false);
      return;
    }

    const img_path = imgres.data;
    console.log(img_path);

     const postItemRes = await fetch("/api/post-item", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status: data.status,
      title: data.title,
      location: data.location,
      date_found: data.date_found,
      description: data.description,
      img_url: img_path,
    }),
  });


const postResult = await postItemRes.json();

  if (!postItemRes.ok) {
    alert("Item creation failed: " + postResult.error);
  } else {
    console.log("Item saved:", postResult);
    setPosting(false);
    redirect("/account");
  }
  setPosting(false);
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
        <input type="hidden" value={postType} {...register('status')} />

        {/* Item Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Item Name</label>
          <input
            type="text"
            {...register('title', { required: 'Item name is required' })}
            className="w-full p-2 rounded border bg-white"
            placeholder="e.g. Black Wallet"
          />
          {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
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
            {...register('date_found', { required: 'Date is required' })}
            className="w-full p-2 rounded border bg-white"
          />
          {errors.date_found && <p className="text-sm text-red-600 mt-1">{errors.date_found.message}</p>}
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
          className={`w-full ${posting ? "bg-gray-800 disabled" : "bg-black"} text-white py-2 rounded font-semibold hover:bg-gray-800 transition`}
        >
          { posting? "..." : "Post Item" }
        </button>
      </form>
    </div>
  )
}

export default PostItemForm
