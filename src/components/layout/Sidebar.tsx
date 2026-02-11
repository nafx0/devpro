"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { HiChevronDown, HiChevronRight, HiXMark } from "react-icons/hi2";
import { FiMenu } from "react-icons/fi";
import {
    navigation,
    getCategoryByPath,
    type NavItem,
    type NavCategory,
} from "@/lib/navigation";

/* ─── Recursive sidebar tree item ─── */
function SidebarItem({
    item,
    basePath,
    currentSlug,
    depth = 0,
}: {
    item: NavItem;
    basePath: string;
    currentSlug: string;
    depth?: number;
}) {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = currentSlug === item.slug;
    const [isExpanded, setIsExpanded] = useState(
        hasChildren
            ? item.children!.some((c) => c.slug === currentSlug) || isActive
            : false
    );

    const href = `${basePath}/${item.slug}`;

    return (
        <li>
            <div className="flex items-center">
                <Link
                    href={href}
                    className={`
                        flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                        ${depth > 0 ? "ml-4 text-[13px]" : ""}
                        ${isActive
                            ? "bg-growth-green/10 text-deep-forest border-l-2 border-growth-green"
                            : "text-deep-forest/60 hover:text-deep-forest hover:bg-deep-forest/[0.03]"
                        }
                    `}
                >
                    {/* Active dot indicator */}
                    {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-growth-green shrink-0" />
                    )}
                    <span>{item.label}</span>
                </Link>
                {hasChildren && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1.5 text-deep-forest/40 hover:text-deep-forest/70 transition-colors cursor-pointer"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                    >
                        <HiChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-0" : "-rotate-90"}`}
                        />
                    </button>
                )}
            </div>

            {/* Sub-children */}
            {hasChildren && isExpanded && (
                <ul className="mt-0.5 space-y-0.5">
                    {item.children!.map((child) => (
                        <SidebarItem
                            key={child.slug}
                            item={child}
                            basePath={basePath}
                            currentSlug={currentSlug}
                            depth={depth + 1}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

/* ─── Main Sidebar ─── */
export default function Sidebar() {
    const pathname = usePathname();
    const category = getCategoryByPath(pathname);
    const [mobileOpen, setMobileOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const prevCategoryRef = useRef<string | undefined>(undefined);

    // Extract current slug from pathname
    const pathParts = pathname.split("/").filter(Boolean);
    const currentSlug = pathParts[pathParts.length - 1] || "";

    // Animate sidebar content when category changes
    useEffect(() => {
        if (!sidebarRef.current || !category) return;
        if (prevCategoryRef.current !== category.href) {
            gsap.fromTo(
                sidebarRef.current.querySelectorAll("li"),
                { opacity: 0, x: -12 },
                {
                    opacity: 1,
                    x: 0,
                    stagger: 0.04,
                    duration: 0.4,
                    ease: "power2.out",
                }
            );
            prevCategoryRef.current = category.href;
        }
    }, [category]);

    // Close mobile sidebar on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    if (!category) return null;

    const basePath = category.href === "/" ? "" : category.href;

    const sidebarContent = (
        <div ref={sidebarRef}>
            {/* Category header */}
            <div className="px-4 pt-6 pb-4 border-b border-deep-forest/5">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-growth-green/80 mb-1">
                    Section
                </p>
                <h2 className="text-lg font-display font-bold text-deep-forest">
                    {category.label}
                </h2>
            </div>

            {/* Navigation items */}
            <nav className="p-3">
                <ul className="space-y-0.5">
                    {category.children.map((item) => (
                        <SidebarItem
                            key={item.slug}
                            item={item}
                            basePath={basePath}
                            currentSlug={currentSlug}
                        />
                    ))}
                </ul>
            </nav>
        </div>
    );

    return (
        <>
            {/* ─── Desktop sidebar (lg+) ─── */}
            <aside className="hidden lg:block w-[280px] shrink-0 border-r border-deep-forest/5 bg-oxygen-white/50 backdrop-blur-sm h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto">
                {sidebarContent}
            </aside>

            {/* ─── Mobile / Tablet toggle ─── */}
            <div className="lg:hidden fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-deep-forest text-oxygen-white rounded-full shadow-xl shadow-deep-forest/20 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    aria-label="Open section menu"
                >
                    <FiMenu className="w-4 h-4" />
                    <span className="text-sm font-medium">
                        Explore {category.label}
                    </span>
                </button>
            </div>

            {/* ─── Mobile drawer overlay ─── */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-deep-forest/30 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />

                    {/* Drawer panel */}
                    <div className="absolute bottom-0 left-0 right-0 max-h-[75vh] bg-oxygen-white rounded-t-3xl overflow-y-auto shadow-2xl animate-slide-up">
                        {/* Drag handle */}
                        <div className="sticky top-0 bg-oxygen-white pt-3 pb-2 flex justify-center z-10 rounded-t-3xl">
                            <div className="w-10 h-1 bg-deep-forest/10 rounded-full" />
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="absolute top-4 right-4 p-2 text-deep-forest/50 hover:text-deep-forest transition-colors cursor-pointer"
                            aria-label="Close section menu"
                        >
                            <HiXMark className="w-5 h-5" />
                        </button>

                        {sidebarContent}

                        {/* Safe area padding */}
                        <div className="h-8" />
                    </div>
                </div>
            )}
        </>
    );
}
