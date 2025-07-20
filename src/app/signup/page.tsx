"use client"

import { Ellipsis } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  fullName: string
  email: string
  phone: string
  password: string
}

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await res.json();

      if(!res.ok) {
        setError("root", {
        type: "manual",
        message: result.error || "An error occured"
        })
        setIsLoading(false);
      }else{
        setIsLoading(false);
      }
      
  }

  return (
    <div className="flex min-h-[80vh] justify-center items-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-200 w-full max-w-sm rounded-xl flex flex-col gap-5 p-6 mt-10 shadow-md"
      >
        <h1 className="font-bold text-2xl text-center">Sign Up to ReUnite</h1>

        {/* Full Name */}
        <div className="flex flex-col">
          <label htmlFor="fullName" className="mb-1 font-medium text-sm">Full Name</label>
          <input
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters"
              }
            })}
            className="p-1 rounded border focus:outline-none bg-white"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium text-sm">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/,
                message: "Invalid email format"
              }
            })}
            className="p-1 rounded border focus:outline-none bg-white"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 font-medium text-sm">Phone Number</label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^(237)?6[5-9][0-9]{7}$/,
                message: "Enter a valid Cameroon phone number"
              }
            })}
            className="p-1 rounded border focus:outline-none bg-white"
            placeholder="6XXXXXXXX or 2376XXXXXXXX"
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-medium text-sm">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters"
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                message: "Include uppercase, number, and special character"
              }
            })}
            className="p-1 rounded border focus:outline-none bg-white"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>
          {errors.root && <p className='text-red-700 text-sm'>Error: {errors.root.message}</p>}
        {/* Submit Button */}
        <button
          type="submit"
          className={`${isLoading ? "bg-gray-800 cursor-not-allowed" : "bg-black" } w-full text-white font-semibold p-2 rounded  hover:bg-gray-800 transition flex justify-center`}
        >
        { isLoading ? <Ellipsis/> : "Sign Up"}  
        </button>
        <p className="text-sm text-center mt-2">
  Already have an account?{" "}
  <a href="/login" className="text-blue-700 underline hover:text-blue-900 transition">
    Login here
  </a>
</p>

      </form>
    </div>
  )
}

export default SignUpPage
