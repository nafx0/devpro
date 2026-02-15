"use client";

import { useState, useRef } from "react";
import { HiPaperAirplane, HiCheckCircle } from "react-icons/hi2";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FeedbackForm() {
    const [submitted, setSubmitted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const successRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // GSAP Success Animation
        const tl = gsap.timeline({
            onComplete: () => setSubmitted(true)
        });

        tl.to(formRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in"
        });
    };

    useGSAP(() => {
        if (submitted && successRef.current) {
            gsap.fromTo(successRef.current,
                { opacity: 0, scale: 0.9, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
            );
        }
    }, [submitted]);

    if (submitted) {
        return (
            <div ref={successRef} className="rounded-[2.5rem] border border-growth-green/20 bg-growth-green/5 p-12 lg:p-20 flex flex-col items-center text-center shadow-2xl shadow-growth-green/5">
                <div className="w-20 h-20 bg-growth-green rounded-full flex items-center justify-center mb-8 shadow-lg shadow-growth-green/20">
                    <HiCheckCircle className="w-10 h-10 text-deep-forest" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-display font-bold text-deep-forest mb-4">
                    Collaboration Initiated.
                </h3>
                <p className="text-deep-forest/60 max-w-md text-lg leading-relaxed">
                    Your request has been prioritized. A senior consultant will reach out within 24-48 business hours to discuss your objectives.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                        onClick={() => setSubmitted(false)}
                        className="btn btn-muted text-sm hover:text-deep-forest hover:bg-white transition-all cursor-pointer"
                    >
                        Submit New Query
                    </button>
                    <button
                        onClick={() => window.location.href = "/info-center"}
                        className="btn btn-primary text-sm transition-all hover:shadow-xl active:scale-95 cursor-pointer"
                    >
                        Visit Knowledge Hub
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-[2.5rem] border border-deep-forest/10 bg-white/60 backdrop-blur-md p-8 lg:p-12 space-y-8 shadow-xl shadow-deep-forest/[0.02] text-deep-forest"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-deep-forest/70 ml-1">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-6 py-4 bg-oxygen-white/80 border border-deep-forest/10 rounded-2xl text-deep-forest placeholder:text-deep-forest/40 focus:outline-none focus:ring-2 focus:ring-growth-green/20 focus:border-growth-green/30 transition-all font-sans"
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-deep-forest/70 ml-1">
                        Corporate Email *
                    </label>
                    <input
                        type="email"
                        required
                        placeholder="john@organization.com"
                        className="w-full px-6 py-4 bg-oxygen-white/80 border border-deep-forest/10 rounded-2xl text-deep-forest placeholder:text-deep-forest/40 focus:outline-none focus:ring-2 focus:ring-growth-green/20 focus:border-growth-green/30 transition-all font-sans"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Organization */}
                <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-deep-forest/70 ml-1">
                        Organization
                    </label>
                    <input
                        type="text"
                        placeholder="Company or Agency Name"
                        className="w-full px-6 py-4 bg-oxygen-white/80 border border-deep-forest/10 rounded-2xl text-deep-forest placeholder:text-deep-forest/40 focus:outline-none focus:ring-2 focus:ring-growth-green/20 focus:border-growth-green/30 transition-all font-sans"
                    />
                </div>
                {/* Designation */}
                <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-deep-forest/70 ml-1">
                        Designation
                    </label>
                    <input
                        type="text"
                        placeholder="Your Role"
                        className="w-full px-6 py-4 bg-oxygen-white/80 border border-deep-forest/10 rounded-2xl text-deep-forest placeholder:text-deep-forest/40 focus:outline-none focus:ring-2 focus:ring-growth-green/20 focus:border-growth-green/30 transition-all font-sans"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Number */}
                <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-deep-forest/70 ml-1">
                        Contact Number
                    </label>
                    <input
                        type="tel"
                        placeholder="+880 1XXX XXXXXX"
                        className="w-full px-6 py-4 bg-oxygen-white/80 border border-deep-forest/10 rounded-2xl text-deep-forest placeholder:text-deep-forest/40 focus:outline-none focus:ring-2 focus:ring-growth-green/20 focus:border-growth-green/30 transition-all font-sans"
                    />
                </div>
            </div>

            {/* Comment */}
            <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-deep-forest/70 ml-1">
                    Collaboration Query *
                </label>
                <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your requirements or inquiry..."
                    className="w-full px-6 py-4 bg-oxygen-white/80 border border-deep-forest/10 rounded-2xl text-deep-forest placeholder:text-deep-forest/40 focus:outline-none focus:ring-2 focus:ring-growth-green/20 focus:border-growth-green/30 transition-all font-sans resize-none"
                />
            </div>

            {/* Submit */}
            <div className="pt-4 flex justify-center">
                <button
                    type="submit"
                    className="btn btn-primary group relative overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(12,45,39,0.15)] hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                    <span className="relative z-10 text-lg">Initiate Collaboration</span>
                    <HiPaperAirplane className="relative z-10 w-5 h-5 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    <div className="absolute inset-0 bg-growth-green opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </button>
            </div>
        </form>
    );
}
