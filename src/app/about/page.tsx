"use client";

import { Users, Search, HandHeart, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero / Intro */}
      <section className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Reunite</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            A modern platform where people can{" "}
            <span className="font-semibold">find and return lost items</span> — 
            simple, safe, and community-driven.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Every year, countless belongings go missing — phones, wallets, 
              documents, pets, and more. Many are found by kind strangers who 
              simply don’t know how to reach the rightful owner. <br /> <br />
              Our mission is to{" "}
              <span className="font-semibold">reconnect people with what matters</span>. 
              Whether it’s a valuable possession or a sentimental keepsake, we 
              believe that no item is too small to find its way back home.
            </p>
          </div>
          <div className="bg-white relative shadow rounded-xl p-6 border border-gray-200">
            <Image
              src="https://picsum.photos/600/400?grayscale"
              alt="Lost and found illustration"
              className="rounded-lg"
              fill
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-gray-600 mt-2">Three simple steps to reconnect items with their owners</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-md transition">
            <Search className="h-10 w-10 text-gray-800 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Post an Item</h3>
            <p className="text-gray-600">Found something? Post it with details, location, and how to contact you.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-md transition">
            <Users className="h-10 w-10 text-gray-800 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Search Easily</h3>
            <p className="text-gray-600">Lost something? Use filters to quickly browse categories and locations.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 hover:shadow-md transition">
            <HandHeart className="h-10 w-10 text-gray-800 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Reunite</h3>
            <p className="text-gray-600">Owners and finders connect directly to arrange safe collection.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose ReUnite?</h2>
          <p className="text-gray-600 mt-2">Trust, simplicity, and community at the core</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-8 w-8 text-gray-800 shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Safe & Reliable</h3>
              <p className="text-gray-600">We ensure privacy and safe communication between finders and owners.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Users className="h-8 w-8 text-gray-800 shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Community Driven</h3>
              <p className="text-gray-600">ReUnite thrives on kindness and goodwill, making lost & found simple.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the ReUnite Community</h2>
        <p className="max-w-2xl mx-auto mb-6 text-gray-300">
          Help create a world where lost items always find their way back home.
        </p>
        <a
          href="/auth/signup"
          className="inline-block bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
}
