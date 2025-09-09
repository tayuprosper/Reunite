"use client"
import React, { useState } from "react";
import Link from "next/link";
import { MoveRight, User } from "lucide-react";
import { FormBuilder, FormField } from "@/components/form-builder";
import { useRouter } from "next/navigation";

const fields: FormField[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
];

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  const onSubmit = async (data: Record<string,string>) => {
    setLoading(true);
    setLoginError("")
    try {
      const req = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const res = await req.json();
      if (!req.ok){
        if(req.status === 500){
          setLoginError("An unknown error occured. Try again")
        }else if(req.status === 401){
          setLoginError(res.error);
        }
      }
      if (res.success) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An unexpected error occurred. Please try again.");
    }
       finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-2 text-center">Log In</h2>
      <FormBuilder fields={fields} onSubmit={onSubmit} submitLabel={loading ? "Logging in..." : "Log In"} className={` ${loading && "disabled"}`} />
      { loginError && <p className="text-xs m-2 text-red-600">{loginError}</p> }
      <div className="flex items-center gap-2 my-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <button
        type="button"
        className="flex items-center justify-center gap-2 w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded px-4 py-2 font-medium"
        onClick={handleGoogleLogin}
      >
        <User size={18} /> Sign in with Google
      </button>
      <div className="text-center text-sm text-gray-500 mt-2 flex gap-3">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="text-blue-600 hover:underline flex items-center gap-1">Sign up <MoveRight size={16} /></Link>
      </div>
    </div>
  );
};

export default LoginForm;
