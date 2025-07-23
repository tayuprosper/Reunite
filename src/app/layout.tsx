import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navabar from "./navbar";
import Footer from "./(components)/footer";

// 👇 Configured properly with subset
const poppins = Poppins({
  subsets: ['latin'],
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900"
  ],
  preload: false,
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "ReUnite | Locate Missing Items",
  description: "Easily report, browse, and claim lost or found items near you.",
};

// 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${poppins.className}  antialiased`}>
        <Navabar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
