"use client";

import React, { useState, useEffect } from "react";
import { ItemCard } from "../item-card";
import { Item } from "@/types/item";
import { ItemFetch } from "@/services/items-fetch/itemFetch";
import { useSupabase } from "@/lib/supabase/supabase-provider";

const YourPosts = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ get user directly from context
  const { user: supabaseUser } = useSupabase();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        if (!supabaseUser) {
          setItems([]); // no logged in user
          return;
        }
        const rawRes: Item[] = await ItemFetch.fetchItemsByUserId(supabaseUser.id);
        const res: Item[] = rawRes;
        setItems(res);
      } catch (error) {
        console.error("Error fetching user items:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [supabaseUser]); // re-run when user changes

  // loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto"
          >
            <div className="animate-pulse flex flex-col space-y-4">
              <div className="bg-gray-300 h-48 w-full rounded"></div>
              <div className="space-y-2">
                <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
                <div className="bg-gray-300 h-4 w-full rounded"></div>
                <div className="bg-gray-300 h-4 w-full rounded"></div>
                <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // empty state
  if (!loading && items.length === 0) {
    return <p className="text-center">You have not posted any items yet.</p>;
  }

  // list state
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default YourPosts;
