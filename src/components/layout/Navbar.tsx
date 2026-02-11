"use client";

import { useState, useRef, useEffect, useCallback, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import logoImg from "@/assets/DEVPRO_LOGO.png";
import { navigation, NavItem } from "@/lib/navigation";
import { useLenis } from "@/components/utils/SmoothScroll";
import clsx from "clsx";

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollToPlugin);
}

/** Recursive Mobile Nav Item */
function MobileNavItem({
    item,
    parentHref,
    isOpen,
    expandedItems,
    toggleAccordion,
    onNavClick
}: {
    item: any;
    parentHref: string;
    isOpen: boolean;
    expandedItems: string[];
    toggleAccordion: (label: string) => void;
    onNavClick: (e: React.MouseEvent, href: string, anchorId: string, isNested: boolean) => void;
}) {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);
    const href = item.href || (parentHref === '/' ? '/' + item.slug : parentHref + '/' + item.slug);
    const anchorId = item.anchorId || "";

    return (
        <div className="mobile-nav-item border-b border-deep-forest/5 last:border-0">
            <div className="flex items-center justify-between py-2">
                <Link
                    href={href.startsWith("#") ? href : href}
                    onClick={(e) => onNavClick(e, href, anchorId, !!parentHref)}
                    className={clsx(
                        "flex-1 py-3 font-display transition-colors",
                        parentHref ? "text-lg font-medium" : "text-2xl font-bold",
                        isExpanded ? "text-growth-green" : "text-deep-forest"
                    )}
                >
                    {item.label}
                </Link>
                {hasChildren && (
                    <button onClick={() => toggleAccordion(item.label)} className="w-12 h-12 flex items-center justify-center">
                        <ChevronDown className={clsx("w-6 h-6 transition-transform duration-300", isExpanded && "rotate-180")} />
                    </button>
                )}
            </div>

            {hasChildren && (
                <div className={clsx("overflow-hidden transition-all duration-500 ease-in-out pl-4 border-l border-growth-green/10 ml-1", isExpanded ? "max-h-[1000px] mb-4 opacity-100" : "max-h-0 opacity-0")}>
                    <div className="flex flex-col gap-2 py-1">
                        {item.children.map((child: any) => (
                            <MobileNavItem
                                key={child.slug}
                                item={child}
                                parentHref={href}
                                isOpen={isOpen}
                                expandedItems={expandedItems}
                                toggleAccordion={toggleAccordion}
                                onNavClick={onNavClick}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [, startTransition] = useTransition();

    const pathname = usePathname();
    const router = useRouter();
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const { lenis } = useLenis();
    const isHome = pathname === "/";

    // Header Background State
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Robust IntersectionObserver for ScrollSpy
    useEffect(() => {
        if (!isHome) return;

        // Track which sections are currently visible and pick the topmost one
        const visibleSections = new Map<string, IntersectionObserverEntry>();
        const sections = navigation.map(cat => cat.anchorId);

        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    visibleSections.set(entry.target.id, entry);
                } else {
                    visibleSections.delete(entry.target.id);
                }
            });

            // Of all visible sections, pick the one closest to the top of the viewport
            if (visibleSections.size > 0) {
                let topId = "";
                let topDistance = Infinity;
                visibleSections.forEach((entry, id) => {
                    const dist = Math.abs(entry.boundingClientRect.top);
                    if (dist < topDistance) {
                        topDistance = dist;
                        topId = id;
                    }
                });
                if (topId) {
                    requestAnimationFrame(() => setActiveSection(topId));
                }
            }
        };

        const observer = new IntersectionObserver(callback, {
            // Top 40% of viewport is the detection zone
            rootMargin: "0px 0px -60% 0px",
            threshold: [0, 0.1, 0.2]
        });

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [isHome, pathname]);

    // Conditional Click Logic: Anchor vs Route
    const handleNavClick = useCallback((e: React.MouseEvent, href: string, anchorId: string, isNested: boolean = false) => {
        // Global Close Trigger
        setIsOpen(false);

        if (isHome && anchorId) {
            e.preventDefault();

            if (lenis) {
                lenis.scrollTo(`#${anchorId}`, {
                    offset: -80,
                    duration: 1.2,
                    easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t) // expo out
                });
            } else {
                gsap.to(window, {
                    scrollTo: { y: `#${anchorId}`, offsetY: 80 },
                    duration: 1.2,
                    ease: "power4.out"
                });
            }
        }
    }, [isHome, lenis]);

    // Body scroll lock
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // Auto-close on route change
    useEffect(() => {
        startTransition(() => {
            setIsOpen(false);
        });
    }, [pathname, startTransition]);

    // Mobile Menu Animation
    useEffect(() => {
        if (!mobileMenuRef.current) return;
        if (isOpen) {
            gsap.fromTo(mobileMenuRef.current,
                { x: "100%", opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, ease: "expo.out" }
            );
            gsap.fromTo(".mobile-nav-item",
                { x: 40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.2 }
            );
        }
    }, [isOpen]);

    const toggleAccordion = (label: string) => {
        setExpandedItems(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
    };

    return (
        <>
            <nav ref={navRef} className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 flex items-center",
                scrolled || !isHome ? "bg-oxygen-white border-b border-deep-forest/5 shadow-sm" : "bg-transparent"
            )}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="relative z-50 py-2">
                            <Image src={logoImg} alt="DeVPro" width={140} height={40} className="h-9 w-auto object-contain" priority />
                        </Link>

                        <div className="hidden lg:flex items-center gap-1">
                            {navigation.map((cat) => {
                                const isActive = isHome
                                    ? activeSection === cat.anchorId
                                    : cat.href === "/" ? pathname === "/" : pathname.startsWith(cat.href);
                                const hasChildren = cat.children && cat.children.length > 0;

                                return (
                                    <div key={cat.label} className="relative group/nav">
                                        <Link
                                            href={isHome ? `#${cat.anchorId}` : cat.href}
                                            onClick={(e) => handleNavClick(e, cat.href, cat.anchorId)}
                                            className={clsx(
                                                "relative px-4 py-2 text-[13px] font-medium transition-all flex items-center gap-1",
                                                isActive ? "text-deep-forest" : "text-deep-forest/40 hover:text-deep-forest"
                                            )}
                                        >
                                            <span className="relative z-10">{cat.label}</span>
                                            {hasChildren && <ChevronDown size={14} className="opacity-40 group-hover/nav:opacity-100 transition-opacity" />}

                                            {isActive && (
                                                <motion.div layoutId="nav-glow" className="absolute inset-0 bg-growth-green/5 rounded-full -z-0" />
                                            )}
                                            {isActive && (
                                                <motion.div layoutId="nav-line" className="absolute bottom-0 left-4 right-4 h-0.5 bg-growth-green" />
                                            )}
                                        </Link>

                                        {/* Dropdown Menu */}
                                        {hasChildren && (
                                            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform group-hover/nav:translate-y-0 translate-y-2 z-[60]">
                                                <div className="bg-white border border-deep-forest/5 shadow-2xl shadow-deep-forest/10 rounded-2xl p-2 min-w-[260px]">
                                                    <div className="flex flex-col gap-1">
                                                        {cat.children!.map((child) => {
                                                            const hasSubSub = child.children && child.children.length > 0;
                                                            return (
                                                                <div key={child.slug} className="relative group/sub">
                                                                    <Link
                                                                        href={cat.href === '/' ? `/${child.slug}` : `${cat.href}/${child.slug}`}
                                                                        onClick={(e) => handleNavClick(e, `${cat.href}/${child.slug}`, "", true)}
                                                                        className="flex items-center justify-between px-4 py-2.5 rounded-xl text-[13px] font-medium text-deep-forest/60 hover:text-growth-green hover:bg-growth-green/5 transition-colors"
                                                                    >
                                                                        {child.label}
                                                                        {hasSubSub && <ChevronRight size={14} className="opacity-40" />}
                                                                    </Link>

                                                                    {hasSubSub && (
                                                                        <div className="absolute left-full top-0 pl-1 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 transform group-hover/sub:translate-x-0 -translate-x-2">
                                                                            <div className="bg-white border border-deep-forest/5 shadow-2xl shadow-deep-forest/10 rounded-2xl p-2 min-w-[240px]">
                                                                                <div className="flex flex-col gap-1">
                                                                                    {child.children!.map((subChild) => (
                                                                                        <Link
                                                                                            key={subChild.slug}
                                                                                            href={cat.href === '/' ? `/${child.slug}/${subChild.slug}` : `${cat.href}/${child.slug}/${subChild.slug}`}
                                                                                            onClick={(e) => handleNavClick(e, `${cat.href}/${child.slug}/${subChild.slug}`, "", true)}
                                                                                            className="px-4 py-2 rounded-xl text-xs font-medium text-deep-forest/60 hover:text-growth-green hover:bg-growth-green/5 transition-colors"
                                                                                        >
                                                                                            {subChild.label}
                                                                                        </Link>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-4 relative z-50">
                            <Link
                                href="/feedback"
                                onClick={(e) => handleNavClick(e, "/feedback", "feedback")}
                                className="hidden md:flex px-6 py-2.5 bg-deep-forest text-oxygen-white rounded-full text-sm font-medium hover:bg-deep-forest/90 transition-all shadow-lg shadow-deep-forest/5 active:scale-95"
                            >
                                Initiate Partnership
                            </Link>

                            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center text-deep-forest cursor-pointer">
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <div ref={mobileMenuRef} className="fixed inset-0 z-[45] bg-oxygen-white lg:hidden overflow-hidden flex flex-col pt-24">
                        <div className="flex-1 overflow-y-auto px-6 pb-12 custom-scrollbar">
                            <div className="space-y-1">
                                {navigation.map((cat) => (
                                    <MobileNavItem
                                        key={cat.label}
                                        item={cat}
                                        parentHref=""
                                        isOpen={isOpen}
                                        expandedItems={expandedItems}
                                        toggleAccordion={toggleAccordion}
                                        onNavClick={handleNavClick}
                                    />
                                ))}
                            </div>

                            <Link
                                href="/feedback"
                                onClick={(e) => handleNavClick(e, "/feedback", "feedback")}
                                className="mobile-nav-item mt-12 block py-5 bg-deep-forest text-oxygen-white rounded-2xl text-center text-lg font-bold shadow-xl shadow-deep-forest/10"
                            >
                                Initiate Strategic Collaboration
                            </Link>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
