import Image from "next/image";
import HeroSection from "./(components)/heroSection";
import { Poppins } from "next/font/google";
import RecentlyListed from "./(components)/recentlyListed";
import HowItWorks from "./(components)/howItWorks";
import HowItWorksSection from "./(components)/howItWorks";
import TrustAndSafetySection from "./(components)/trustSecurity";
import TestimonialsSection from "./(components)/testimonials";
import Footer from "./(components)/footer";
const poppins = Poppins ({
  weight: ["100","200","300","400","500","600","700","800","900"],
  fallback: ["latin"],
  subsets: ['latin']
})
export default function Home() {
  return (
    <div>
        <HeroSection/>
        <RecentlyListed/>
        <HowItWorksSection/>
        <TrustAndSafetySection/>
        <TestimonialsSection/>
        
    </div>
  );
}
