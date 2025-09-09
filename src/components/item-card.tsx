import {Item} from '@/types/item';
import {  CalendarRange, MoveRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import DateFormat from '@/utils/date-format/date-format';
export const ItemCard = ({ item }: {item: Item}) => {
    return (
        <div key={item.id} className="item-card shadow-lg min-w-auto  m-3 rounded-lg p-3 flex flex-col gap-2">
            <div className="img relative w-full h-40 rounded-lg overflow-hidden">
                <Image
                    src={item.img_url || 'https://picsum.photos/150/150?random='}
                    alt={item.title || 'Item Image'}
                    fill
                    className="rounded-lg object-cover "
                 />
            </div>
            
            <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
            <div className="info flex gap-5">
                <span className='flex gap-2 text-xs font-medium items-center bg-gray-400 w-fit p-1 rounded-sm'><CalendarRange size={'15px'} />{DateFormat(item.date_found!)}</span>
                <span className='flex gap-2 text-xs font-medium items-center bg-green-600 text-white w-fit p-1 rounded-sm'>{item.category}</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-5 min-h-[5em]">{item.description || 'No description available'}</p>
            <div className="actions flex justify-between">
                <Button className='bg-trasparent text-black hover:text-white border-1 w-fit'> Details</Button>
                <Link href={`/all-items/${item.id}`} ><Button className='bg-black text-white w-fit' > Claim <MoveRight/> </Button></Link> 
            </div>
            
        </div>
    );
}