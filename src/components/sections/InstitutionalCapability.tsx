"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface StatCardProps {
    label: string;
    value: string; // Keep as string to handle "25+" etc
    numericValue: number; // For animation
    suffix?: string;
    className?: string; // For bento spans
}

function StatCard({ label, value, numericValue, suffix = "+", className = "" }: StatCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        // Hover effect handled by CSS, Entrance here
        gsap.from(cardRef.current, {
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
        });

        // Counter Animation
        const obj = { count: 0 };
        gsap.to(obj, {
            count: numericValue,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 80%",
            },
            onUpdate: () => {
                if (valueRef.current) {
                    valueRef.current.innerText = Math.floor(obj.count) + suffix;
                }
            }
        });

    }, { scope: cardRef });

    return (
        <div ref={cardRef} className={`bg-white border border-deep-forest/5 p-8 rounded-3xl hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group ${className}`}>
            <div>
                <span ref={valueRef} className="text-6xl md:text-7xl font-display font-medium text-deep-forest block mb-2">
                    0{suffix}
                </span>
            </div>
            <p className="text-lg text-deep-forest/60 font-sans border-t border-deep-forest/10 pt-4 mt-4 group-hover:border-growth-green/50 transition-colors">
                {label}
            </p>
        </div>
    );
}

export default function InstitutionalCapability() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 bg-oxygen-white relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 max-w-3xl">
                    <h2 ref={titleRef} className="text-4xl md:text-5xl font-display font-bold text-deep-forest mb-4">
                        Driven by Data. <br />
                        <span className="text-growth-green">Defined by Impact.</span>
                    </h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                    {/* Card 1: Experience (Large) */}
                    <StatCard
                        label="Years of Leadership Policy Experience"
                        value="25+"
                        numericValue={25}
                        className="lg:col-span-8 bg-gradient-to-br from-white to-oxygen-white"
                    />

                    {/* Card 2: Sectors (Standard) */}
                    <StatCard
                        label="Sectors Transformed"
                        value="10+"
                        numericValue={10}
                        className="lg:col-span-4"
                    />

                    {/* Card 3: Briefs (Standard) */}
                    <StatCard
                        label="Policy Briefs Published"
                        value="500+"
                        numericValue={500}
                        className="lg:col-span-4"
                    />

                    {/* Card 4: Trust/Authority (Wide Text Card) */}
                    <div className="lg:col-span-8 bg-deep-forest text-oxygen-white p-8 rounded-3xl flex items-center justify-center text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-growth-green/10 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                        <h3 className="text-2xl md:text-4xl font-display font-light leading-snug">
                            Led by <span className="font-bold text-growth-green">Architects</span> of National Climate Policy.
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
}
