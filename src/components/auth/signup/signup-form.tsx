"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MoveRight, User } from "lucide-react";
import { FormBuilder, FormField } from "@/components/form-builder";

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

const SignupForm: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [signupError, setSignupError] = useState("");
	console.log(signupError)
	const onSubmit = async (data: Record<string, string>) => {
		setLoading(true);
		setSignupError("");
		if (!data.email || !data.password) {
			setSignupError("Email and password are required.");
			setLoading(false);
			return;
		}
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({ email: data.email, password: data.password }),
			});
			const result = await res.json();
			if (!res.ok) throw new Error(result.message || "Signup failed");
			// Optionally redirect or show success
			window.location.href = "/profile";
		} catch (error) {
			console.error("Signup error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignup = () => {
		// Handle Google signup logic here
	};

	return (
		<div className="mx-auto bg-white p-8 rounded shadow mt-10">
			<h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
			<FormBuilder
				fields={fields}
				onSubmit={onSubmit}
				submitLabel={loading ? "Signing up..." : "Sign Up"}
			/>
			<div className="flex items-center gap-2 my-4">
				<div className="flex-1 h-px bg-gray-200" />
				<span className="text-xs text-gray-400">or</span>
				<div className="flex-1 h-px bg-gray-200" />
			</div>
			<button
				type="button"
				className="flex items-center justify-center gap-2 w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 rounded px-4 py-2 font-medium"
				onClick={handleGoogleSignup}
			>
				<User size={18} /> Sign up with Google
			</button>
			<div className="text-center text-sm text-gray-500 mt-2 flex gap-5">
				Already have an account?{" "}
				<Link
					href="/auth/login"
					className="text-blue-600 hover:underline flex items-center gap-1"
				>
					Log in{" "}
					<MoveRight size={16} />
				</Link>
			</div>
		</div>
	);
};

export default SignupForm;
