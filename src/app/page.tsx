import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoriesSection from "@/components/CategoriesSection";
import BrandStory from "@/components/BrandStory";
import InstagramCTA from "@/components/InstagramCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <FeaturedProducts />
      <CategoriesSection />
      <BrandStory />
      <InstagramCTA />
    </>
  );
}
