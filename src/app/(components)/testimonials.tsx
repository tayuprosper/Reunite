import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Linda M.",
    role: "University Student",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "I found my student ID within hours of posting it here. This platform is a lifesaver!",
  },
  {
    name: "Mark N.",
    role: "Taxi Driver",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Someone left a phone in my car. Thanks to this site, I reunited it with its owner the same day.",
  },
  {
    name: "Sophie T.",
    role: "Retail Assistant",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    quote:
      "I lost my purse at the mall. A kind stranger posted it here. I’m so grateful!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Real stories from people who’ve recovered their lost items or helped others find theirs.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm italic">“{t.quote}”</p>
              <div className="flex mt-4 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
