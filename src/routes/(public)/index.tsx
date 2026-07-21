import { createFileRoute } from "@tanstack/react-router";

import FeaturesShowcase from "@/features/landing/components/FeaturesShowcase";
import HeroSection from "@/features/landing/components/HeroSection";
import HowItWorks from "@/features/landing/components/HowItWorks";

export const Route = createFileRoute("/(public)/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex-1 flex flex-col">
      <HeroSection />
      <HowItWorks />
      <FeaturesShowcase />
    </div>
  );
}
