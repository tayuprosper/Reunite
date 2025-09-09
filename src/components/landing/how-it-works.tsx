"use client"
import React from "react";
import { InfoCard } from "../info-card-drop";

const steps = [
  {
    title: "Post a Missing Item",
    content:
      "Create a post for your lost item or person with details and a photo. This helps others identify and assist in the search.",
      id: 1,
  },
  {
    title: "Search & Connect",
    content:
      "Browse or search posts to find lost items or people. Use filters to narrow results and connect with posters for more info.",
      id: 2,
  },
  {
    title: "Reunite & Update",
    content:
      "Once reunited, update your post to let others know the item or person has been found. Celebrate and help others do the same!",
      id: 3,
  },
];

const HowItWorks: React.FC = () => {
    return (
        <section className="px-[10vw] py-16 bg-gray-50">
          <div className="text-center mb-8">
            <span className="text-2xl font-bold text-center mb-8">How It Works</span><br/>
            <span className="text-gray-400 text-xl text-center">Reunite works in 3 simple steps</span> 
          </div>
            <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, idx) => (
                    <InfoCard
                        key={step.title + idx}
                        title={step.title}
                        content={step.content}
                        id={step.id}
                    />
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
