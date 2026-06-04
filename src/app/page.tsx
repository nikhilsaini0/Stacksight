import Hero from "@/components/hero";
import PricingComparison from "@/components/pricing-comparison";
import SpendForm from "@/components/spend-form";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="section-divider" />
      <PricingComparison />
      <div className="section-divider" />
      <SpendForm />
      <div className="section-divider" />
      <FAQ />
      <div className="section-divider" />
      <Footer />
    </main>
  );
}
