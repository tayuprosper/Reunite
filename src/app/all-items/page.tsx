"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { ItemCard } from "@/components/item-card";
import { ItemFetch } from "@/services/items-fetch/itemFetch";
import ItemCardLoading from "@/components/item-card-loading";
import { Item } from "@/types/item";
import { useSupabase } from "@/lib/supabase/supabase-provider";


// locations for filter
const locations = ["All", "New York", "Los Angeles", "Chicago", "Houston", "Miami"];
// categories for filter
const categories = ["All", "Gadgets", "Clothing", "Documents", "Accessories", "Others"];

export default function AllItemsPage() {
  const [locationFilterOpen, setLocationFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ categoryFilterOpen, setCateoryFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<Item[]>([]); // Replace 'any' with your item type
  const { user: supabaseUser } = useSupabase();
  const [locationFilter, setLocationFilter] = useState<string >("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);



  useEffect(() => {
    
   
    // Fetch items from your backend or database
    const fetchItems = async () => {
      setLoading(true);
      let items: Item[] = [];
      if (!supabaseUser) {
        items =  await ItemFetch.fetchAllItems(); // no logged in user
        setItems(items);
        setFilteredItems(items);
        setLoading(false);
        return;
      }
      const rawRes = await ItemFetch.fetchItemsNotByUserId(supabaseUser.id); 
      const fetchedItems = rawRes;
      setItems(fetchedItems);
      setFilteredItems(fetchedItems);
      setLoading(false);
    };

    fetchItems();
  }, [items.length, supabaseUser]);

  //handle location change
  useEffect(() => {
    setLoading(true)
    let updatedItems = [...items];
    
    // Filter by location
    if (locationFilter && locationFilter !== "All") {
      updatedItems = updatedItems.filter((item) =>
        item.location === locationFilter
      );
    }
    setFilteredItems(updatedItems);
    setLoading(false)
  }, [locationFilter, items]);

  useEffect(() => {
    
    let updatedItems = [...items];

    // Filter by search query
    if (searchQuery) {
      setLoading(true)
      updatedItems = updatedItems.filter((item) =>
        item.title!.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description!.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(updatedItems);
      setLoading(false)
    }
   
  }, [searchQuery, items]);

  //filter items based on selected location
  useEffect(() => {
    setLoading(true)
    let updatedItems = [...items];
    
    // Filter by location
    if (locationFilter) {
      updatedItems = updatedItems.filter((item) =>
        item.location === locationFilter
      );
    }
    setLoading(false)
    setFilteredItems(updatedItems);
  }, [locationFilter, items]);

  //filter items based on selected category
  useEffect(() => {
    setLoading(true)
    let updatedItems = [...items];
    
    // Filter by category
    if (categoryFilter && categoryFilter !== "All") {
      updatedItems = updatedItems.filter((item) =>
        item.category === categoryFilter.toLowerCase()
      );
    }
    setFilteredItems(updatedItems);
    setLoading(false)
  }, [categoryFilter, items]);

  // Handlers for filter toggles
  const toggleLocationFilter = ()=>{
    setLocationFilterOpen(!locationFilterOpen);
  }
  const toggleCategoryFilter = ()=>{
    setCateoryFilterOpen(!categoryFilterOpen);
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="filter flex items-center justify-center">
        <div className="search bg-white flex items-center border-gray-300 rounded m-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 focus:outline-none rounded-lg"
          />
          <Search className="m-3 h-7 w-7" color="gray" />
        </div>
        <div className="location-filter hidden sm:block relative items-center border bg-white border-gray-300 gap-5 rounded px-3 py-2 m-4 cursor-pointer" onClick={toggleLocationFilter}>
          <h3>Location:</h3>
          <div className="filter-head flex items-center gap-15">
              <div className="font-bold">{locationFilter}</div>
              <ChevronDown className={`ml-2 transition-transform ${locationFilterOpen ? "rotate-180" : ""}`} size={16} />
          </div>
          <div className={`filter-menu absolute p-3 left-0 w-full mt-3 z-10 bg-white font-semibold  ${ !locationFilterOpen && "hidden"}`}>
            {
              locations.map((loc) => (
                <div onClick={()=>setLocationFilter(loc)} className="filter-option mb-2 cursor-pointer p-2 shadow hover:bg-gray-300 rounded-sm" key={loc}>{loc}</div>
              ))
            }
            
          </div>
        </div>
        <div className="category-filter hidden md:block relative items-center border bg-white border-gray-300 gap-5 rounded px-3 py-2 m-4 cursor-pointer" onClick={toggleCategoryFilter}>
          <h3>Category:</h3>
          <div className="filter-head flex items-center gap-15">
              <div className="font-bold">{categoryFilter}</div>
              <ChevronDown className={`ml-2 transition-transform ${categoryFilterOpen ? "rotate-180" : ""}`} size={16} />
          </div>
          <div className={`filter-menu absolute p-3 left-0 w-full mt-3 z-10 bg-white font-semibold  ${ !categoryFilterOpen && "hidden"}`}>
            {
              categories.map((cat) => (
                <div onClick={()=>setCategoryFilter(cat)} className="filter-option mb-2 cursor-pointer p-2 shadow hover:bg-gray-300 rounded-sm" key={cat}>{cat}</div>
              ))
            }
            
            
          </div>
        </div>
      </div>
      <div className="main bg-white flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
     {
        loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ItemCardLoading key={index} />
          ))
        ) : (
          filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No items found.
            </div>
          )
        )
     }
      </div>
    </div>
  );
}
