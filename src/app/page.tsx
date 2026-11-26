import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { AboutUsSection } from "@/components/home/about-us-section";
import { InfoSection } from "@/components/home/info-section";
import { ServicesSection } from "@/components/home/services-section";
import { ProductsSection } from "@/components/home/products-section";
import { OurProcessSection } from "@/components/home/our-process-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ContactSection } from "@/components/home/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutUsSection />
      <InfoSection />
      <ServicesSection />
      <ProductsSection />
      <OurProcessSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
