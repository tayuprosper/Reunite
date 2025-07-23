"use client";

import React, { useState, useRef, useEffect } from "react";
import { SquarePlus, X } from "lucide-react";
import ItemCardFound from "./itemCardFound";
import { Item } from "..";

const RecentlyListed = () => {
  const [filterShowing, setIsFilterShowing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("location");
  const [filterValue, setFilterValue] = useState("");
  const [recentlyListed, setRecentlyListed] = useState<Item[]>([]);
  const [loadingRecent, setLoadingRecent] = useState<boolean>(false);

  useEffect(()=>{

    const fetchRecent = async ()=>{
      setLoadingRecent(true);
      const recentRes = await fetch("/api/allitems");

      const data = await recentRes.json();

      if (recentRes.status !== 200 ){
        setRecentlyListed([]);
      }else{
        setRecentlyListed(data.data);
        // console.log(data);
        setLoadingRecent(false);
      }
    }

    fetchRecent();
  }, [])

  const filterRef = useRef<HTMLDivElement>(null);

  // Close popup if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterShowing(false);
      }
    }
    if (filterShowing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterShowing]);

  return (
    <div className="px-3 md:px-10 relative">
      <div className="header flex items-center justify-between py-4">
        <div className="filters flex items-center gap-2 relative">
          <div
            className="filteradd flex items-center cursor-pointer select-none"
            onClick={() => setIsFilterShowing((prev) => !prev)}
          >
            <h1 className="bg-gray-100 font-bold w-fit p-2 rounded m-2">Filters</h1>
            <SquarePlus color={"white"} className="bg-black rounded p-1" size={20} />
          </div>

          {/* Filter Popup */}
          {filterShowing && (
            <div
              ref={filterRef}
              className="absolute top-full left-0 mt-2 bg-white shadow-lg border rounded-xl p-4 w-64 z-50"
            >
              <label htmlFor="filterCategory" className="block mb-2 font-semibold text-gray-700">
                Select Filter Category
              </label>
              <select
                id="filterCategory"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full mb-4 border rounded p-2 text-sm"
              >
                <option value="location">Location</option>
                <option value="category">Category</option>
                <option value="date">Date</option>
              </select>

              <label htmlFor="filterValue" className="block mb-2 font-semibold text-gray-700">
                Enter {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
              </label>
              <input
                id="filterValue"
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder={`Enter ${selectedFilter}`}
                className="w-full mb-4 border rounded p-2 text-sm"
              />

              <button
                onClick={() => setIsFilterShowing(false)}
                className="w-full bg-black text-white rounded py-2 font-semibold hover:bg-gray-900 transition"
              >
                Apply
              </button>
            </div>
          )}

          {/* Example active filter pill */}
          {filterValue && (
            <div className="filter flex items-center text-sm font-semibold gap-2 bg-gray-100 w-fit p-1 rounded cursor-default select-none">
              <p>
                {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}: {filterValue}
              </p>
              <X
                size={15}
                className="cursor-pointer"
                onClick={() => setFilterValue("")}
                
              />
            </div>
          )}
        </div>
      </div>

      <hr />

      <div className="p-4  grid justify-center gap-10 items-center sm:grid-cols-2 grid-cols-1 md:grid-cols-3">
        {
          loadingRecent ? 
          <div className="font-black text-2xl text-black">Loading Items...</div>
          :

          recentlyListed.map((item: Item)=>{
            return <ItemCardFound key={item.id} item={item}/>
          })
        }
       
        
      </div>
    </div>
  );
};

export default RecentlyListed;
