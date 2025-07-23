import { Search } from 'lucide-react'
import React from 'react'


const HeroSection = () => {
  return (
    <div className="bg-gray-100 w-[100%] pt-[10vh] shadow-lg  min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="font-extrabold text-xl md:text-3xl lg:text-6xl max-w-4xl mb-4">
        Lost Something? Found Something? Let’s Get It Back to Where It Belongs.
      </h1>

      <p className="font-medium text-sm md:text-lg lg:text-xl text-gray-700 mb-6 max-w-xl">
        Easily report, browse, and claim lost or found items near you.
      </p>

      {/* Call to Actions */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button className="bg-transparent border-2 border-black text-black px-4 py-2 rounded hover:bg-black hover:text-white transition">
          Learn How
        </button>
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
          Find Item
        </button>
      </div>

      {/* Search Box */}
      <div className="w-full max-w-md">
        <div className="flex items-center bg-gray-200 rounded px-3 py-2">
          <Search className="text-gray-600" />
          <input
            type="text"
            placeholder="Search lost item..."
            className="bg-transparent flex-1 pl-3 text-sm focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
