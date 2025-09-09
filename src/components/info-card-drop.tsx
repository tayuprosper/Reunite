
interface InfoCardProps {
    title: string;
    content: string;
    id: number;
}

export const  InfoCard: React.FC<InfoCardProps> = (
    {title,
    content,
    id,
})=>{
    return( 
        <div className="max-h-[30vh] bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-5">
                <span className="bg-gray-800 text-white font-bold p-3 w-15 h-15 rounded-full text-4xl flex justify-center items-center">{id}</span>
                <h1 className="font-bold text-black">{title}</h1>
            </div>
            <div className="pt-3">{content}</div>  
        </div>
     )
}