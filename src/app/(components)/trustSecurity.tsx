import { ShieldCheck, Users, CheckCircle } from "lucide-react";

export default function TrustAndSafetySection() {
  const items = [
    {
      title: "Verified Users",
      description: "We ensure that every account is verified to reduce scams and false claims.",
      icon: <CheckCircle className="w-10 h-10 text-green-500" />,
    },
    {
      title: "Moderated Listings",
      description: "Our team reviews posts for inappropriate or misleading content to keep the platform safe.",
      icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "Community Driven",
      description: "We rely on honest individuals who want to return items or find what they’ve lost.",
      icon: <Users className="w-10 h-10 text-purple-500" />,
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Trust & Safety</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Your security and peace of mind matter. {"Here's"} how we ensure a safe experience for everyone.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
