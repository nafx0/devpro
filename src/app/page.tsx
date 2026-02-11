"use client";

import Hero from "@/components/sections/Hero";
import InstitutionalCapability from "@/components/sections/InstitutionalCapability";
import SectionTeaser from "@/components/sections/SectionTeaser";
import Pillars from "@/components/sections/Pillars";
import KnowledgeHub from "@/components/sections/KnowledgeHub";
import Partners from "@/components/sections/Partners";
import FeedbackForm from "@/components/sections/FeedbackForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Hero />

      {/* About Us Teaser */}
      <SectionTeaser
        id="about"
        label="About Us"
        title={<>Integrated <br /><span className="text-growth-green">Sustainable Solutions.</span></>}
        description="DevPro Partners bridges development with sustainability by providing specialized consultancy and knowledge support to Government, Private Sector, and international development agencies."
        portalHref="/about"
        className="bg-white"
      >
        <InstitutionalCapability />
      </SectionTeaser>

      {/* Services Teaser */}
      <SectionTeaser
        id="services"
        label="Services"
        dark
        title={<>Core Pillars of <br />Intervention.</>}
        description="We provide consultancy and advisory services across business and development sectors including Energy, Environment, Climate Change, and Infrastructure."
        portalHref="/services"
      >
        <div className="scale-95 lg:scale-100 origin-left">
          <Pillars />
        </div>
      </SectionTeaser>

      {/* Projects Teaser */}
      <SectionTeaser
        id="projects"
        label="Projects"
        title={<>End-to-End <br />Lifecycle Support.</>}
        description="From Concept Development and Feasibility Studies to Monitoring and Evaluation, we provide comprehensive project development services."
        portalHref="/projects"
        className="bg-oxygen-white"
      >
        <div className="aspect-video bg-deep-forest/5 rounded-3xl border border-deep-forest/10 flex items-center justify-center overflow-hidden group">
          <div className="text-center p-8">
            <p className="text-sm font-mono text-growth-green mb-4">Project Map & Registry</p>
            <h3 className="text-2xl font-display font-bold text-deep-forest mb-4">Interactive Portfolio</h3>
            <p className="text-deep-forest/50 max-w-sm mx-auto mb-8">Detailed case studies and project data are available in the portal.</p>
            <div className="w-32 h-1 bg-growth-green/20 mx-auto rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-growth-green animate-pulse" />
            </div>
          </div>
        </div>
      </SectionTeaser>

      {/* Info Center Teaser */}
      <SectionTeaser
        id="info-center"
        label="Information Center"
        dark
        title={<>Knowledge Hub <br />& Archive.</>}
        description="Access policy briefs, technical reports, and research publications designed to empower stakeholders with the latest sector analytics."
        portalHref="/info-center"
      >
        <div className="scale-90 lg:scale-95">
          <KnowledgeHub dark />
        </div>
      </SectionTeaser>

      {/* Work Dimensions Teaser */}
      <SectionTeaser
        id="work-dimensions"
        label="Work Dimensions"
        title={<>Major <br />Activities.</>}
        description="Our work focuses on critical dimensions of sustainable development, from GHG accounting to policy advocacy and capacity building."
        portalHref="/work-dimensions"
        className="bg-white"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['GHG Inventory', 'Life Cycle Analysis', 'Sustainable Finance', 'Data Analytics', 'Policy Advocacy', 'Capacity Building'].map((sector) => (
            <div key={sector} className="p-6 rounded-2xl border border-deep-forest/5 bg-oxygen-white hover:bg-growth-green/5 transition-colors group">
              <p className="text-sm font-medium text-deep-forest/70 group-hover:text-deep-forest">{sector}</p>
            </div>
          ))}
          <div className="p-6 rounded-2xl border border-dotted border-deep-forest/20 flex items-center justify-center">
            <p className="text-xs font-mono text-deep-forest/40">+7 More Sectors</p>
          </div>
        </div>
      </SectionTeaser>

      {/* Feedback & Collaboration Section */}
      <SectionTeaser
        id="feedback"
        label="Feedback & Collaboration"
        title={<>Initiate <br /><span className="text-growth-green">Strategic Partnership.</span></>}
        description="Share your objectives or feedback. Our senior consultancy team will analyze your requirements and reach out to explore meaningful collaboration opportunities."
        portalHref="/feedback"
        className="bg-oxygen-white"
      >
        <FeedbackForm />
      </SectionTeaser>

      <div id="contact" className="container mx-auto px-4 py-max pt-12 pb-24">
        <Partners />
      </div>
    </main>
  );
}
