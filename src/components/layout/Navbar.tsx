"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiMenu, FiX } from "react-icons/fi";
import logoImg from "@/assets/DEVPRO_LOGO.png";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Capability", href: "#capability" },
    { label: "Expertise", href: "#pillars" },
    { label: "Knowledge Hub", href: "#knowledge" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Animate mobile menu
    useEffect(() => {
        if (!mobileMenuRef.current) return;
        if (isOpen) {
            gsap.fromTo(
                mobileMenuRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power3.out" }
            );
            gsap.fromTo(
                mobileMenuRef.current.querySelectorAll("a"),
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.15 }
            );
        }
    }, [isOpen]);

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-oxygen-white/80 backdrop-blur-xl border-b border-deep-forest/5 shadow-sm"
                    : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20 px-2">
                        {/* Logo Container */}
                        <div className="flex items-center">
                            <a href="#home" className="flex items-center transition-opacity hover:opacity-90">
                                <Image
                                    src={logoImg}
                                    alt="DeVPro Logo"
                                    width={140}
                                    height={45}
                                    className="h-9 w-auto object-contain"
                                    priority
                                />
                            </a>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-medium text-deep-forest/70 hover:text-deep-forest transition-colors relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-growth-green group-hover:w-full transition-all duration-300" />
                                </a>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-4">
                            <a
                                href="#contact"
                                className="group relative px-6 py-3 bg-deep-forest text-oxygen-white rounded-full text-sm font-medium overflow-hidden transition-transform hover:scale-105 active:scale-95"
                            >
                                <span className="relative z-10">Initiate Collaboration</span>
                                <div className="absolute inset-0 bg-growth-green opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                            </a>
                        </div>

                        {/* Mobile Hamburger - reset to z-50 to stay behind or just keep it simple */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center text-deep-forest"
                            aria-label="Toggle menu"
                        >
                            <FiMenu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay — rendered outside <nav> to avoid stacking context issues */}
            {isOpen && (
                <div
                    ref={mobileMenuRef}
                    className="fixed inset-0 z-[60] bg-oxygen-white flex flex-col items-center justify-center lg:hidden"
                >
                    {/* Dedicated Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-deep-forest"
                        aria-label="Close menu"
                    >
                        <FiX size={32} />
                    </button>

                    <div className="flex flex-col items-center gap-8 w-full px-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-3xl font-display font-medium text-deep-forest hover:text-growth-green transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="mt-6 px-10 py-5 bg-deep-forest text-oxygen-white rounded-full text-center text-lg font-medium w-full max-w-xs"
                        >
                            Initiate Collaboration
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}
