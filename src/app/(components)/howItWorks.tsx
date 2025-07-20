import { PlusCircle, Search, Handshake } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Post an Item",
      description: "Found or lost something? Upload a photo, location, and details to help others identify it.",
      icon: <PlusCircle className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "Search or Browse",
      description: "Look through posted items or use filters to find matches by location, category, or date.",
      icon: <Search className="w-10 h-10 text-green-500" />,
    },
    {
      title: "Connect & Reunite",
      description: "If you think an item is yours, submit a claim and get in touch securely with the finder.",
      icon: <Handshake className="w-10 h-10 text-yellow-500" />,
    },
  ];

  return (
    <section className="bg-black text-white py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-300 mb-12 max-w-xl mx-auto">
          A simple 3-step process to help people recover what they’ve lost or return what they’ve found.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-2xl p-6 shadow-lg hover:shadow-blue-700/30 transition"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
