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
    numericValue: number; // For animation
    suffix?: string;
    className?: string; // For bento spans
}

function StatCard({ label, numericValue, suffix = "+", className = "" }: StatCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        // Entrance Animation
        gsap.from(cardRef.current, {
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        });

        // Counter Animation
        const obj = { count: 0 };
        gsap.to(obj, {
            count: numericValue,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
            },
            onUpdate: () => {
                if (valueRef.current) {
                    valueRef.current.innerText = Math.floor(obj.count) + suffix;
                }
            }
        });

    }, { scope: cardRef });

    return (
        <div ref={cardRef} className={`p-8 lg:p-10 rounded-[2rem] bg-oxygen-white border border-deep-forest/5 flex flex-col items-center lg:items-start transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(12,45,39,0.05)] group ${className}`}>
            <span ref={valueRef} className="text-5xl lg:text-6xl font-display font-bold text-deep-forest mb-4">
                0{suffix}
            </span>
            <p className="text-sm font-mono uppercase tracking-widest text-deep-forest/40 border-t border-deep-forest/5 pt-4 w-full group-hover:text-growth-green transition-colors">
                {label}
            </p>
        </div>
    );
}

export default function InstitutionalCapability() {
    return (
        <section className="py-24 lg:py-32 overflow-hidden">
            <div className="container-custom">
                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
                    {/* Card 1: Experience */}
                    <StatCard
                        label="Years of Experience"
                        numericValue={25}
                        className="lg:col-span-8"
                    />

                    {/* Card 2: Sectors */}
                    <StatCard
                        label="Active Sectors"
                        numericValue={12}
                        className="lg:col-span-4"
                    />

                    {/* Card 3: Briefs */}
                    <StatCard
                        label="Knowledge Briefs"
                        numericValue={150}
                        className="lg:col-span-4"
                    />

                    {/* Card 4: Trust/Authority */}
                    <div className="lg:col-span-8 bg-oxygen-white border border-deep-forest/5 p-8 lg:p-10 rounded-[2rem] flex items-center justify-center text-center lg:text-left relative overflow-hidden group">
                        <div className="absolute inset-0 bg-deep-forest/[0.02] transition-opacity duration-700 group-hover:bg-deep-forest/[0.04]" />
                        <h3 className="text-xl lg:text-2xl font-display font-light leading-relaxed text-deep-forest relative z-10 transition-colors group-hover:text-deep-forest">
                            Pioneering <span className="font-bold text-growth-green">Institutional Strategies</span> for meaningful climate resilience and sustainable economic growth.
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
}
