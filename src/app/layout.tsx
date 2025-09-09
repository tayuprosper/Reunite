import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/navBar";
import Footer from "@/components/layout/footer";
import { SupabaseProvider } from "@/lib/supabase/supabase-provider";
import { createClient } from "@/lib/supabase/client";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReUnite | Find and Return Lost Items",
  description:
    "A platform to help you find and return lost items to their rightful owners.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* Pass the initial session down to client */}
        <SupabaseProvider initialUser ={user}>
          <NavBar />
          {children}
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  );
}
