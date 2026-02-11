import PlaceholderPage from "@/components/sections/PlaceholderPage";

export default function ContactPage() {
    return (
        <div className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-growth-green mb-3">
                Contact Us
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-deep-forest leading-tight mb-6">
                Get in Touch
            </h1>

            <p className="text-lg text-deep-forest/60 leading-relaxed mb-10 max-w-2xl">
                For inquiries, partnerships, and collaboration opportunities — we&apos;re here to help advance sustainable development together.
            </p>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="rounded-2xl border border-deep-forest/5 bg-white/60 backdrop-blur-sm p-6">
                    <p className="text-xs font-mono uppercase tracking-wider text-growth-green mb-2">Address</p>
                    <p className="text-deep-forest font-medium">Dhaka, Bangladesh</p>
                </div>
                <div className="rounded-2xl border border-deep-forest/5 bg-white/60 backdrop-blur-sm p-6">
                    <p className="text-xs font-mono uppercase tracking-wider text-growth-green mb-2">Email</p>
                    <a href="mailto:inquiry@devpro.org" className="text-deep-forest font-medium hover:text-growth-green transition-colors">
                        inquiry@devpro.org
                    </a>
                </div>
            </div>

            {/* External Links */}
            <div className="rounded-2xl border border-deep-forest/5 bg-white/60 backdrop-blur-sm p-8">
                <h3 className="text-sm font-mono uppercase tracking-wider text-growth-green mb-5">External Resources</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                        { label: "UNFCCC", url: "https://unfccc.int" },
                        { label: "IPCC", url: "https://www.ipcc.ch" },
                        { label: "UNEP", url: "https://www.unep.org" },
                        { label: "Green Climate Fund", url: "https://www.greenclimate.fund" },
                        { label: "DOE", url: "https://www.energy.gov" },
                    ].map((link) => (
                        <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-3 rounded-xl border border-deep-forest/5 text-sm font-medium text-deep-forest/70 hover:text-deep-forest hover:bg-deep-forest/[0.02] hover:border-deep-forest/10 transition-all text-center"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
