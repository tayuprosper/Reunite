import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const HeroSection: React.FC = () => {
    return (
        <section className="w-full flex flex-col items-center justify-center py-16">
            <h1 className="text-3xl md:text-6xl md:max-w-[60%] text-center font-extrabold text-gray-900"> <span className="text-blue-500">Reunite</span>, A Community Driven Platform. <span className="text-blue-500">Helping you</span> reconnect with your lost items and people.</h1>
            <p className="text-lg m-5 text-center md:text-xl text-gray-600 max-w-xl mx-auto">
                 Post, search, and reunite with what matters most.
            </p>
            <div className="flex flex-col md:flex-row gap-3 justify-center m-7 ">
                <Link href="/post-missing-item">
                    <Button  className="text-white bg-gray-800">Post Missing Item</Button>
                </Link>
                <Link href="/all-items">
                    <Button className="bg-white text-gray-800 hover:text-white border border-gray-400" >
                        Search Found Items
                        <MoveRight/>
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
