import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">GetItBack</h2>
          <p className="text-sm text-gray-400">
            Helping people reunite with their lost belongings — fast, secure, and community-driven.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Post Item</a></li>
            <li><a href="#" className="hover:text-white transition">Browse Listings</a></li>
            <li><a href="#" className="hover:text-white transition">How It Works</a></li>
            <li><a href="#" className="hover:text-white transition">Trust & Safety</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              support@getitback.app
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +237 680 123 456
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Buea, Cameroon
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-10 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} GetItBack. All rights reserved.
      </div>
    </footer>
  );
}
