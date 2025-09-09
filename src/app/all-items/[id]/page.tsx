"use client"
import { Calendar, Copy, MapPin, Share2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { ItemFetch } from '@/services/items-fetch/itemFetch'
import { Item } from '@/types/item'
import DateFormat from "@/utils/date-format/date-format"
import Loading from './loading'
import Image from 'next/image'


function ItemDetail() {
    const [loading, setLoading] = useState(true);
    const [itemDetails, setItemDetails] = useState<Item>({} as Item);
    // fetch item details from backend using the id from params
    const params = useParams<{ id: string }>();
    const id = params.id;

    useEffect(() => {
        setLoading(true);
        const fetchItemDetails = async () => {
            const item = await ItemFetch.fetchItemWithId(id as unknown as number);
            if (!item) {
                console.error("Item not found");
                setLoading(false);
                setItemDetails({} as unknown as Item);
                return;
            }
            setItemDetails(item as unknown as Item);
            setLoading(false);
            console.log("Fetched item details: ", item);
        };

        fetchItemDetails();
    }, [id]);

    // Fetch item details
    if (loading) {
        return (
            <Loading  />
        )
    }

    if (!itemDetails || Object.keys(itemDetails).length === 0) {
        return (
            <div className='h-[85vh] bg-gray-100 flex items-center justify-center'>
                <p className='text-gray-600 text-xl'>Item not found.</p>
            </div>
        )
    }

    return (
        <div className='h-auto bg-gray-100 flex items-center justify-center'>
            <div className="content my-5 max-w-5xl mx-10 p-4 bg-white rounded-lg shadow-md sm:flex gap-4">
                <div className="img flex-1 rounded-lg">
                    <Image src={itemDetails.img_url || "https://picsum.photos/300"} alt="Item Image"  className='rounded-lg h-full'/>
                </div>
                <div className="description flex-1">
                    <h1 className='text-3xl font-bold m-4'>{itemDetails.title}</h1>
                    <p className='text-gray-600 m-4'>{itemDetails.description}</p>
                    <div className="loc">
                        <div className="found-info flex items-center">
                            <span className='font-semibold bg-gray-300 m-4 p-2 flex items-center rounded-lg gap-3'><MapPin/> Found At: {itemDetails.location}</span>
                            <span className='font-semibold bg-gray-300 m-4 p-2 flex items-center rounded-lg gap-3'><Calendar/> Date: { DateFormat(itemDetails.date_found!)}</span>
                        </div>
                        
                        <span className='font-semibold bg-gray-300 m-4 p-2 flex items-center rounded-lg gap-3'><MapPin/>Available At: {itemDetails.collectable_at}</span>
                    </div> 
                    {/* Contact information of the person who found item */}
                    <div className="contact-info m-4 p-4 bg-gray-200 rounded-lg">
                        <h2 className='text-xl font-bold mb-2'>Contact Information</h2>
                        <p className='text-gray-700'>If you believe this item belongs to you, please contact the person who found it.</p>
                        <p className='text-gray-700 mt-2 font-bold'>Name: John Doe</p>
                        <p className='text-gray-700 mt-2 font-bold'>Email: <a href="mailto:example@gmailcom">example@gmail.com</a></p>
                        <p className='text-gray-700 mt-2 font-bold flex items-center gap-3 '>Phone: +1 234 567 890 <Copy/></p>
                        <p className='text-gray-700 mt-2 font-bold flex items-cen ter gap-3 '>WhatsApp: +237 674 676 177 <Copy/> </p>
                    </div>
                    <div className="actions">
                        {/* add a share button to allow users to share item to other places and people */}
                        <button className='bg-black gap-4 text-white px-4 py-2 rounded-lg m-4 font-bold flex items-center'>Share <Share2 color="white" /> </button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ItemDetail