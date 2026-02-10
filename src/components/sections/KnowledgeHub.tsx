"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiSearch, FiDownload, FiArrowUpRight } from "react-icons/fi";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Category = "All" | "Policy Briefs" | "Research Papers" | "Training";

interface Resource {
    id: string;
    date: string;
    title: string;
    category: Category;
    type: "PDF" | "Link";
}

const resources: Resource[] = [
    { id: "1", date: "Oct 24, 2025", title: "National Hydrogen Strategy Framework", category: "Policy Briefs", type: "PDF" },
    { id: "2", date: "Sep 12, 2025", title: "Urban Climate Resilience: A Policy Roadmap", category: "Research Papers", type: "PDF" },
    { id: "3", date: "Aug 05, 2025", title: "Circular Economy in Textile Sector", category: "Research Papers", type: "PDF" },
    { id: "4", date: "Jul 18, 2025", title: "Renewable Energy Financing Workshop", category: "Training", type: "Link" },
    { id: "5", date: "Jun 30, 2025", title: "Impact of Carbon Pricing on SMEs", category: "Policy Briefs", type: "PDF" },
    { id: "6", date: "May 15, 2025", title: "Sustainable Agriculture Practices Guide", category: "Training", type: "PDF" },
];

export default function KnowledgeHub() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [searchTerm, setSearchTerm] = useState("");
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const filteredResources = resources.filter(item => {
        const matchesCategory = activeCategory === "All" || item.category === activeCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
        <section id="knowledge" ref={sectionRef} className="py-20 md:py-28 bg-oxygen-white relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 text-center md:text-left">
                    <div>
                        <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-deep-forest mb-3">
                            The Knowledge Archive
                        </h2>
                        <p className="text-deep-forest/60 max-w-xl text-base md:text-lg">
                            A digital museum of rigorous research, serving as a bridge between data and policy implementation.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-80 lg:w-96 group flex-shrink-0">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-forest/40 group-focus-within:text-growth-green transition-colors" />
                        <input
                            type="text"
                            placeholder="Search policy briefs..."
                            className="w-full pl-12 pr-4 py-3 md:py-4 bg-white border border-deep-forest/10 rounded-full focus:outline-none focus:border-growth-green/50 focus:ring-1 focus:ring-growth-green/50 transition-all font-sans text-sm md:text-base"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mb-8 md:mb-12">
                    {(["All", "Policy Briefs", "Research Papers", "Training"] as Category[]).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border ${activeCategory === cat
                                ? "bg-deep-forest text-oxygen-white border-deep-forest"
                                : "bg-transparent text-deep-forest/60 border-deep-forest/10 hover:border-deep-forest/30"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Resource List */}
                <div className="flex flex-col gap-2 md:gap-3">
                    {filteredResources.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-white border border-deep-forest/5 p-5 md:p-6 lg:p-8 rounded-2xl lg:rounded-full hover:border-growth-green/30 transition-colors duration-300 flex flex-row items-center justify-between gap-4 overflow-hidden"
                        >
                            {/* Hover Background */}
                            <div className="absolute inset-0 bg-growth-green/5 rounded-2xl lg:rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="flex flex-row items-center gap-4 md:gap-8 lg:gap-12 relative z-10 min-w-0 flex-1 text-left">
                                <span className="hidden sm:block text-xs md:text-sm font-mono text-deep-forest/40 flex-shrink-0 md:min-w-[100px]">
                                    {item.date}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base md:text-lg lg:text-xl font-display font-medium text-deep-forest truncate w-full">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1 md:hidden">
                                        <span className="text-[10px] font-mono text-deep-forest/40 sm:hidden">
                                            {item.date}
                                        </span>
                                        <span className="text-[10px] font-sans text-growth-green uppercase tracking-wider">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 md:gap-6 lg:gap-8 relative z-10 flex-shrink-0">
                                <span className="hidden md:block text-xs font-sans text-deep-forest/40 uppercase tracking-wider px-3 py-1 border border-deep-forest/5 rounded-full whitespace-nowrap">
                                    {item.category}
                                </span>

                                <button className="w-10 h-10 rounded-full bg-oxygen-white border border-deep-forest/10 flex items-center justify-center text-deep-forest group-hover:bg-deep-forest group-hover:text-growth-green transition-all duration-300 flex-shrink-0">
                                    {item.type === "PDF" ? <FiDownload size={16} /> : <FiArrowUpRight size={16} />}
                                </button>
                            </div>
                        </div>
                    ))}

                    {filteredResources.length === 0 && (
                        <div className="text-center py-16 md:py-20 text-deep-forest/40 text-sm md:text-base">
                            No resources found matching your criteria.
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}
