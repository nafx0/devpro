"use client";

import { useRef } from "react";
import Link from "next/link";
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
                        {/* Fast trust signals*/}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-14 md:mt-10">
                            <span className="inline-flex items-center rounded-full bg-growth-green/10 border border-growth-green/20 px-5 py-3 text-xs md:text-sm text-deep-forest/80">
                                Trusted by the Government, NGOs, Institutional partners
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-deep-forest leading-tight md:leading-[1.1] mb-4 mt-4 tracking-tight">
                            Bridging <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-growth-green to-deep-forest">
                                Development with Sustainability
                            </span>
                        </h1>

                        <p className="text-base md:text-xl text-deep-forest/80 max-w-lg mb-6 font-sans font-light leading-snug md:leading-relaxed">
                            We help governments, NGOs, and private partners deliver environmentally responsible, measurable development from planning to impact.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 w-full sm:w-auto">
                            <a
                                href="#contact"
                                className="btn btn-primary group relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                                aria-label="Request a consultation"
                            >
                                <span className="relative z-10">Request a Consultation</span>
                                <div className="absolute inset-0 bg-growth-green opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </a>

                            <Link
                                href="/services"
                                className="btn btn-surface hover:bg-gray-50 transition-all hover:shadow-md hover:-translate-y-1"
                                aria-label="Explore services"
                            >
                                Explore Services
                            </Link>
                        </div>

                        {/* Minimal hero integrations (dummy data) */}
                        <div className="mt-7 w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="rounded-2xl border border-growth-green/20 bg-growth-green/5 p-4 text-left">
                                <p className="text-xs uppercase tracking-wide text-deep-forest/60">Upcoming Event</p>
                                <p className="mt-1 text-sm md:text-base font-medium text-deep-forest">
                                    Sustainable Infrastructure Forum
                                </p>
                                <p className="mt-1 text-xs md:text-sm text-deep-forest/70">March 2026 • Online</p>
                                <Link href="/info-center" className="mt-2 inline-flex text-sm font-medium text-deep-forest hover:underline">
                                    View details
                                </Link>
                            </div>

                            <div className="rounded-2xl border border-growth-green/20 bg-growth-green/5 p-4 text-left">
                                <p className="text-xs uppercase tracking-wide text-deep-forest/60">Message from the Managing Director</p>
                                <p className="mt-1 text-sm md:text-base font-medium text-deep-forest">
                                    “Delivery that strengthens resilience and accountability.”
                                </p>
                            </div>
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

