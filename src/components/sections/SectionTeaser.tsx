"use client";

import { useRef } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import Link from "next/link";
import gsap from "gsap";

interface SectionTeaserProps {
    id: string;
    label: string;
    title: string | React.ReactNode;
    description: string;
    portalHref: string;
    children?: React.ReactNode;
    className?: string;
    dark?: boolean;
}

export default function SectionTeaser({
    id,
    label,
    title,
    description,
    portalHref,
    children,
    className,
    dark = false,
}: SectionTeaserProps) {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const arrowRef = useRef<HTMLSpanElement>(null);

    const onMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        gsap.to(buttonRef.current, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out",
        });

        if (arrowRef.current) {
            gsap.to(arrowRef.current, {
                x: 4 + x * 0.1,
                y: -4 + y * 0.1,
                duration: 0.3,
                ease: "back.out(2)",
            });
        }
    };

    const onMouseEnter = () => {
        // Handled by mouse move for position
    };

    const onMouseLeave = () => {
        gsap.to([buttonRef.current, arrowRef.current], {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
        });
    };

    return (
        <section
            id={id}
            className={clsx(
                "relative py-24 lg:py-32 overflow-hidden",
                dark ? "bg-deep-forest text-oxygen-white" : "bg-oxygen-white text-deep-forest",
                className
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    {/* Content */}
                    <div className="lg:col-span-5 flex flex-col items-center text-center md:items-start md:text-left">
                        <p className={clsx(
                            "text-xs font-mono uppercase tracking-[0.2em] mb-6",
                            dark ? "text-growth-green/80" : "text-growth-green"
                        )}>
                            {label}
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-8">
                            {title}
                        </h2>
                        <p className={clsx(
                            "text-lg mb-10 leading-relaxed font-light",
                            dark ? "text-oxygen-white/60" : "text-deep-forest/70"
                        )}>
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start w-full">
                            <Link
                                href={portalHref}
                                ref={buttonRef}
                                onMouseMove={onMouseMove}
                                onMouseEnter={onMouseEnter}
                                onMouseLeave={onMouseLeave}
                                className={clsx(
                                    "btn group relative overflow-hidden transition-all duration-300 hover:shadow-xl",
                                    dark
                                        ? "bg-oxygen-white text-deep-forest hover:bg-white"
                                        : "bg-deep-forest text-oxygen-white hover:bg-black"
                                )}
                            >
                                <span className="relative z-10 text-sm">Explore Professional Portal</span>
                                <span ref={arrowRef} className="relative z-10">
                                    <HiArrowUpRight className="w-4 h-4" />
                                </span>
                                <div className={clsx(
                                    "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full",
                                    dark ? "bg-deep-forest" : "bg-growth-green"
                                )} />
                            </Link>
                        </div>
                    </div>

                    {/* Visual / Children */}
                    <div className="lg:col-span-7">
                        {children}
                    </div>
                </div>
            </div>

            {/* Decorative element */}
            <div className={clsx(
                "absolute top-0 right-0 w-96 h-96 blur-[120px] rounded-full pointer-events-none opacity-20 translate-x-1/2 -translate-y-1/2 z-0",
                dark ? "bg-growth-green" : "bg-growth-green/30"
            )} />
        </section>
    );
}

import clsx from "clsx";
