"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HeroSlideshow from "@/components/sections/HeroSlideshow";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP);
}

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(textRef.current?.children || [], {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            delay: 0.2
        });
    }, { scope: containerRef });

    return (
        <section id="home" ref={containerRef} className="relative min-h-screen w-full flex items-center pt-20 pb-10 bg-oxygen-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full">

                    {/* Left Content */}
                    <div ref={textRef} className="flex flex-col justify-center order-2 lg:order-1">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-deep-forest leading-[1.1] mb-6 tracking-tight">
                            Bridging <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-growth-green to-deep-forest">
                                Policy & Planet
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-deep-forest/80 max-w-lg mb-10 font-sans font-light leading-relaxed">
                            Accelerating the green transition through rigorous research, strategic consultancy, and institutional authority.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a href="#contact" className="group relative px-8 py-4 bg-deep-forest text-oxygen-white rounded-full font-medium overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                                <span className="relative z-10">Initiate Collaboration</span>
                                <div className="absolute inset-0 bg-growth-green opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </a>

                            <a href="#capability" className="px-8 py-4 bg-white border border-deep-forest/10 text-deep-forest rounded-full font-medium hover:bg-gray-50 transition-all hover:shadow-md hover:-translate-y-1">
                                Explore Our Impact
                            </a>
                        </div>
                    </div>

                    {/* Right Slideshow */}
                    <div className="relative order-1 lg:order-2 h-[50vh] lg:h-[80vh] w-full">
                        <HeroSlideshow />

                        {/* Decorative Blob */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-growth-green/5 blur-3xl rounded-full pointer-events-none" />
                    </div>

                </div>
            </div>
        </section>
    );
}

