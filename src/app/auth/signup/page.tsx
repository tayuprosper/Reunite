import React from "react";
import SignupForm from "@/components/auth/signup/signup-form";

const SignupPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignupForm />
    </main>
  );
};

export default SignupPage;
export const metadata = {
  title: "Sign Up",
  description: "Create a new account to start using our services.",
};