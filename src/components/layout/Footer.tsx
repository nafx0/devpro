"use client";
import logoImg from "@/assets/DEVPRO_LOGO.png";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
    const footerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Parallax Reveal Logic: 
    // The footer is fixed at the bottom with z-index -1.
    // The previous section needs a margin-bottom equal to footer height.
    // However, a simpler approach for "Reveals" that works well with React structure:
    // Just sticky bottom? No, standard pattern is:
    // Body has min-h-screen. Footer is fixed -1. Main content has z-10 and bg-white.
    // As you scroll to the very bottom, the main content lifts up to reveal footer.

    // We'll implement standard static footer first, then enhance if structure allows easily.
    // Given the page structure, a standard high-quality footer is safer than z-index tricks without fixed height calculations.

    return (
        <footer id="contact" ref={footerRef} className="bg-deep-forest text-oxygen-white py-24 relative overflow-hidden w-full m-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20 text-center items-start">
                    {/* Brand / Vision */}
                    <div className="md:col-span-4 flex flex-col items-center">
                        <div className="mb-8">
                            <Image
                                src={logoImg}
                                alt="DeVPro Logo"
                                width={140}
                                height={45}
                                className="h-12 w-auto opacity-90"
                            />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
                            DevPro Partners
                        </h2>
                        <p className="text-oxygen-white/60 max-w-sm text-base">
                            We support and ensure all sorts of development in a green, clean, and sustainable way.
                        </p>
                    </div>

                    {/* Links Column 1 */}
                    <div className="md:col-span-4 flex flex-col items-center">
                        <h4 className="text-growth-green font-mono text-sm uppercase tracking-widest mb-6">
                            For Donors
                        </h4>
                        <ul className="space-y-4 font-sans text-oxygen-white/80">
                            <li><a href="#" className="hover:text-growth-green transition-colors">Institutional Capability</a></li>
                            <li><a href="#" className="hover:text-growth-green transition-colors">Financial Audits</a></li>
                            <li><a href="#" className="hover:text-growth-green transition-colors">Partnership Framework</a></li>
                            <li><a href="#" className="hover:text-growth-green transition-colors">Impact Reports</a></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="md:col-span-4 flex flex-col items-center">
                        <h4 className="text-growth-green font-mono text-sm uppercase tracking-widest mb-6">
                            For Researchers
                        </h4>
                        <ul className="space-y-4 font-sans text-oxygen-white/80">
                            <li><a href="#" className="hover:text-growth-green transition-colors">Open Access Archive</a></li>
                            <li><a href="#" className="hover:text-growth-green transition-colors">Latest Publications</a></li>
                            <li><a href="#" className="hover:text-growth-green transition-colors">Data Methodologies</a></li>
                            <li><a href="#" className="hover:text-growth-green transition-colors">Fellowship Programs</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-6 text-sm text-oxygen-white/40 font-mono">
                    <p>© 2026 DeVPro</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="#" className="hover:text-white transition-colors">Dhaka, Bangladesh</a>
                        <span>•</span>
                        <a href="mailto:inquiry@devpro.org" className="hover:text-white transition-colors">inquiry@devpro.org</a>
                    </div>
                </div>
            </div>

            {/* Background Abstract */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-growth-green/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
        </footer>
    );
}
