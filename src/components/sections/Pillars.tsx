"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface PillarCardProps {
    title: string;
    description: string;
    tags: string[];
    index: number;
}

function PillarCard({ title, description, tags, index }: PillarCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(cardRef.current, {
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.15,
        });
    }, { scope: cardRef });

    return (
        <div
            ref={cardRef}
            className="bg-deep-forest p-8 md:p-10 lg:p-12 rounded-3xl relative overflow-hidden group border border-white/10 flex flex-col justify-between min-h-[340px] md:min-h-[400px]"
        >
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-growth-green/15 rounded-full blur-3xl group-hover:bg-growth-green/25 transition-colors duration-500" />

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                    <span className="text-oxygen-white/30 text-sm font-mono tracking-widest mb-4 block">
                        0{index + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-oxygen-white leading-tight mb-5">
                        {title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full border border-growth-green/30 text-growth-green text-xs tracking-wider uppercase">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <p className="text-base md:text-lg text-oxygen-white/70 font-sans leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Hover Reveal Overlay */}
            <div className="absolute inset-0 bg-growth-green/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    );
}

const pillars = [
    {
        title: "Strategic Consultancy",
        description: "Delivering high-precision GHG inventories, environmental impact assessments (EIA/ESIA), and feasibility studies for national-scale projects.",
        tags: ["Decarbonization", "Feasibility", "Compliance"]
    },
    {
        title: "Capital & Project Development",
        description: "Structuring financial models and circular economy frameworks to unlock international funding mechanics.",
        tags: ["Green Finance", "Circular Economy", "Investment"]
    },
    {
        title: "Institutional Capacity Building",
        description: "Empowering stakeholders through specialized training, workshops, and policy advocacy forums.",
        tags: ["Capacity Building", "Advocacy", "Training"]
    }
];

export default function Pillars() {
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
            ease: "power3.out",
        });
    }, { scope: sectionRef });

    return (
        <section id="pillars" ref={sectionRef} className="py-20 md:py-28 bg-oxygen-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 ref={titleRef} className="text-3xl md:text-4xl font-display font-bold text-deep-forest mb-12 md:mb-16">
                    Core Pillars of <span className="text-growth-green">Intervention</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pillars.map((pillar, index) => (
                        <PillarCard key={index} {...pillar} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
