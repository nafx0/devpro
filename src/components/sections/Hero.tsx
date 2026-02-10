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
        <section id="home" ref={containerRef} className="relative min-h-screen w-full flex items-center pt-16 pb-8 lg:pt-20 lg:pb-10 bg-oxygen-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center h-full">

                    {/* Left Content */}
                    <div ref={textRef} className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-deep-forest leading-tight md:leading-[1.1] mb-4 mt-10 md:mt-0 tracking-tight">
                            Bridging <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-growth-green to-deep-forest">
                                Development with Sustainability
                            </span>
                        </h1>

                        <p className="text-base md:text-xl text-deep-forest/80 max-w-lg mb-6 font-sans font-light leading-snug md:leading-relaxed">
                            We support and ensure all sorts of development in a green, clean, and sustainable way.
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <a href="#contact" className="group relative px-8 py-3.5 bg-deep-forest text-oxygen-white rounded-full font-medium overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 text-center">
                                <span className="relative z-10">Initiate Collaboration</span>
                                <div className="absolute inset-0 bg-growth-green opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </a>

                            <a href="#capability" className="px-8 py-3.5 bg-white border border-deep-forest/10 text-deep-forest rounded-full font-medium hover:bg-gray-50 transition-all hover:shadow-md hover:-translate-y-1 text-center">
                                Explore Our Impact
                            </a>
                        </div>
                    </div>

                    {/* Right Slideshow */}
                    <div className="relative h-[50vh] lg:h-[80vh] w-full">
                        <HeroSlideshow />

                        {/* Decorative Blob */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-growth-green/5 blur-3xl rounded-full pointer-events-none" />
                    </div>

                </div>
            </div>
        </section>
    );
}

