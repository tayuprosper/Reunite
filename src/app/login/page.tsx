"use client"
import { Ellipsis, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type formValues = {
    email: string;
    password: string;
}

const Page = () => {
    const router = useRouter();
const { register, handleSubmit, setError, formState: { errors} } = useForm<formValues>();
const [isLoading, setIsLoading] = useState(false);
const onSubmit =async (data: formValues)=>{
    setIsLoading(true);
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    
    const result = await res.json();
    if (res.status === 200){
        router.push("/allitems")
    }else{
        setError("root", {
            type: "manual",
            message: result?.error || "Login Failed"
        })
    }
    setIsLoading(false);
}



  return (
    <div className=' flex h-[80vh] justify-center items-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='bg-gray-200 shadow-xl rounded flex flex-col gap-5 p-5 h-fit items-center justify-center'>
            <h1 className='font-bold text-2xl'>Login To ReUnite</h1>
            <div className="email flex flex-col">
                <label htmlFor="email">Email</label>
                <input  {...register("email", {required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email"}
                })} className='border focus:outline-none bg-white rounded p-2 text-sm' placeholder='email@example.com'/>
                {errors.email && <p className='text-red-700'>{errors.email.message}</p> }
            </div>
            <div className="password flex flex-col">
                <label htmlFor="password">Password</label>
                <input  {...register("password", {required: true})} type='password' className='border bg-white p-2 text-sm focus:outline-none rounded' placeholder='Password' />
                {errors.password && <p className='text-red-700'>Password is required</p> }
            </div>
             {errors.root && <p className='text-red-700 text-sm'>Error {errors.root.message}</p>}
            <button type='submit'   className={` w-full ${isLoading ? "bg-gray-800 cursor-not-allowed" : "bg-black" }  hover:bg-gray-800 text-white font-semibold p-2 rounded flex items-center justify-center`}>{isLoading ? <Ellipsis /> : "Submit"}</button>
               <p className="text-sm text-center mt-2">
  Don't have an account?{" "}
  <a href="/signup" className="text-blue-700 underline hover:text-blue-900 transition">
            Create one
  </a>
</p>
        </form>
    </div>
  )
}

export default Page