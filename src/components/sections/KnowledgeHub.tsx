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

export default function KnowledgeHub({ dark = false }: { dark?: boolean }) {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [searchTerm, setSearchTerm] = useState("");
    const sectionRef = useRef<HTMLDivElement>(null);

    const filteredResources = resources.filter(item => {
        const matchesCategory = activeCategory === "All" || item.category === activeCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div ref={sectionRef} className="w-full">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    {(["All", "Policy Briefs", "Research Papers", "Training"] as Category[]).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={clsx(
                                "px-5 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300",
                                activeCategory === cat
                                    ? (dark ? "bg-growth-green text-deep-forest" : "bg-deep-forest text-oxygen-white")
                                    : (dark ? "bg-white/5 text-oxygen-white/40 hover:text-oxygen-white hover:bg-white/10" : "bg-deep-forest/5 text-deep-forest/40 hover:text-deep-forest hover:bg-deep-forest/10")
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64 lg:w-72 group">
                    <FiSearch className={clsx(
                        "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                        dark ? "text-oxygen-white/20 group-focus-within:text-growth-green" : "text-deep-forest/20 group-focus-within:text-growth-green"
                    )} />
                    <input
                        type="text"
                        placeholder="Search archives..."
                        className={clsx(
                            "w-full pl-11 pr-4 py-3 border-none rounded-full focus:outline-none focus:ring-2 transition-all font-sans text-sm",
                            dark
                                ? "bg-white/5 text-oxygen-white placeholder:text-oxygen-white/20 focus:ring-growth-green/20"
                                : "bg-deep-forest/[0.03] text-deep-forest placeholder:text-deep-forest/20 focus:ring-growth-green/20"
                        )}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Resource List */}
            <div className="space-y-1">
                {filteredResources.map((item) => (
                    <div
                        key={item.id}
                        className={clsx(
                            "group flex items-center justify-between p-6 lg:px-8 rounded-[1.5rem] transition-all duration-500",
                            dark
                                ? "hover:bg-white/5"
                                : "hover:bg-white hover:shadow-[0_20px_60px_-15px_rgba(12,45,39,0.08)]"
                        )}
                    >
                        <div className="flex items-center gap-6 lg:gap-12 min-w-0 flex-1">
                            <span className={clsx(
                                "hidden md:block text-[10px] font-mono flex-shrink-0 w-24",
                                dark ? "text-oxygen-white/20" : "text-deep-forest/20"
                            )}>
                                {item.date}
                            </span>
                            <div className="flex flex-col min-w-0">
                                <h3 className={clsx(
                                    "text-lg lg:text-xl font-display font-semibold transition-colors truncate",
                                    dark
                                        ? "text-oxygen-white group-hover:text-growth-green"
                                        : "text-deep-forest group-hover:text-growth-green"
                                )}>
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-3 mt-1.5 md:hidden">
                                    <span className={clsx("text-[10px] font-mono", dark ? "text-oxygen-white/30" : "text-deep-forest/30")}>{item.date}</span>
                                    <span className={clsx("w-1 h-1 rounded-full", dark ? "bg-white/10" : "bg-deep-forest/10")} />
                                    <span className="text-[10px] font-sans text-growth-green uppercase tracking-widest">{item.category}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 lg:gap-10 shrink-0">
                            <span className={clsx(
                                "hidden md:block text-[9px] font-mono uppercase tracking-[0.2em]",
                                dark ? "text-oxygen-white/30" : "text-deep-forest/30"
                            )}>
                                {item.category}
                            </span>
                            <button className={clsx(
                                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                                dark
                                    ? "bg-white/5 text-oxygen-white group-hover:bg-growth-green group-hover:text-deep-forest"
                                    : "bg-deep-forest/5 text-deep-forest group-hover:bg-growth-green group-hover:text-deep-forest"
                            )}>
                                {item.type === "PDF" ? <FiDownload size={18} /> : <FiArrowUpRight size={18} />}
                            </button>
                        </div>
                    </div>
                ))}

                {filteredResources.length === 0 && (
                    <div className={clsx(
                        "text-center py-24 text-sm italic",
                        dark ? "text-oxygen-white/20" : "text-deep-forest/20"
                    )}>
                        No matches in the knowledge archive.
                    </div>
                )}
            </div>
        </div>
    );
}

import clsx from "clsx";
