"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const partners = [
    "World Bank",
    "United Nations",
    "ADB",
    "JICA",
    "USAID",
    "GIZ",
    "Ministry of Energy",
    "Department of Environment",
];

export default function Partners() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!scrollerRef.current) return;

        const scrollerContent = Array.from(scrollerRef.current.children);

        // Clone items for seamless loop
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            (duplicatedItem as HTMLElement).setAttribute("aria-hidden", "true");
            scrollerRef.current?.appendChild(duplicatedItem);
        });

        // Simple CSS animation fallback or GSAP loop
        // using GSAP for more control if needed, but CSS is smoother for simple marquees
        // Using a GSAP tween for the "infinite" feel without jank

        const totalWidth = scrollerRef.current.scrollWidth / 2;

        gsap.to(scrollerRef.current, {
            x: -totalWidth,
            duration: 20,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) // Ensures seamless loop if logic was different, but simple tween works for clones
            }
        });

    }, { scope: containerRef });

    return (
        <section id="partners" ref={containerRef} className="py-20 bg-oxygen-white border-t border-deep-forest/5 overflow-hidden w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
                <p className="text-sm font-mono text-deep-forest/40 uppercase tracking-widest">
                    Global Development Partners
                </p>
            </div>

            <div className="relative w-full overflow-hidden mask-linear-fade">
                <div ref={scrollerRef} className="flex gap-16 md:gap-32 w-max px-4 items-center">
                    {partners.map((partner, index) => (
                        <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100 cursor-default">
                            {/* Placeholder for Logos - using Text for now as per instructions (no images provided yet) */}
                            <span className="text-2xl md:text-3xl font-display font-medium text-deep-forest">
                                {partner}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .mask-linear-fade {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </section>
    );
}
