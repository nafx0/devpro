import Hero from "@/components/sections/Hero";
import InstitutionalCapability from "@/components/sections/InstitutionalCapability";
import Pillars from "@/components/sections/Pillars";
import KnowledgeHub from "@/components/sections/KnowledgeHub";
import Partners from "@/components/sections/Partners";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Hero />
      <div id="capability">
        <InstitutionalCapability />
      </div>
      <Pillars />
      <KnowledgeHub />
      <Partners />
      <Footer />
    </main>
  );
}
