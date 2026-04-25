import Nav from "@/components/Nav";
import HeroFP from "@/components/HeroFP";
import TrioCards from "@/components/TrioCards";
import AppShowcase from "@/components/AppShowcase";
import CoreFeatures from "@/components/CoreFeatures";
import AdvancedTrading from "@/components/AdvancedTrading";
import Barriers from "@/components/Barriers";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import Roadmap from "@/components/Roadmap";
import Upcoming from "@/components/Upcoming";
import Infrastructure from "@/components/Infrastructure";
import Chains from "@/components/Chains";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import FooterFP from "@/components/FooterFP";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1 relative">
        <HeroFP />
        <TrioCards />
        <AppShowcase />
        <CoreFeatures />
        <AdvancedTrading />
        <Barriers />
        <HowItWorks />
        <Comparison />
        <Roadmap />
        <Upcoming />
        <Infrastructure />
        <Chains />
        <FAQ />
        <FinalCTA />
      </main>
      <FooterFP />
    </>
  );
}
