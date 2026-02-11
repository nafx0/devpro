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
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.1,
        });
    }, { scope: cardRef });

    return (
        <div
            ref={cardRef}
            className="relative p-10 lg:p-12 rounded-[2.5rem] bg-oxygen-white/[0.03] backdrop-blur-md border border-white/[0.08] flex flex-col justify-between min-h-[420px] transition-all duration-500 hover:bg-white/[0.06] hover:border-white/10 group"
        >
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-growth-green/5 rounded-full blur-[80px] group-hover:bg-growth-green/10 transition-colors duration-700" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-10">
                    <span className="inline-block text-[10px] font-mono tracking-[0.4em] text-growth-green mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                        MODULE / 0{index + 1}
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-display font-bold text-oxygen-white leading-[1.15] mb-6">
                        {title}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                        {tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[10px] text-oxygen-white/40 uppercase tracking-widest group-hover:text-oxygen-white/60 group-hover:border-white/10 transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <p className="mt-auto text-lg text-oxygen-white/50 font-light leading-relaxed group-hover:text-oxygen-white/70 transition-colors">
                    {description}
                </p>
            </div>
        </div>
    );
}

const pillars = [
    {
        title: "Policy Advocacy & Research",
        description: "Shaping national agendas through data-driven advocacy, policy formulation, and high-level stakeholder consultations.",
        tags: ["Advocacy", "Policy", "Strategy"]
    },
    {
        title: "Capacity & Training",
        description: "Empowering institutions with specialized technical training and knowledge transfer systems for sustainable development.",
        tags: ["Institutional", "Training", "Development"]
    },
    {
        title: "Business Case Support",
        description: "Architecting viable project financing models and technical sourcing frameworks for complex environmental assignments.",
        tags: ["Financing", "Sourcing", "Implementation"]
    }
];

export default function Pillars() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, index) => (
                <PillarCard key={index} {...pillar} index={index} />
            ))}
        </div>
    );
}
