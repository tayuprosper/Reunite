import React from "react";
import Link from "next/link";
// src/components/layout/Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-black text-gray-200 p-6 mt-10 border-t border-gray-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Reunite</h2>
          <p className="text-sm mt-2 text-gray-400">Helping people reconnect with lost items.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 text-sm">
          <div>
            <h3 className="font-medium mb-2 text-gray-300">Navigation</h3>
            <ul className="space-y-1">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-gray-300">Legal</h3>
            <ul className="space-y-1">
              <li><Link  href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} Lost&Found. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

