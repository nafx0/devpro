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

    // Animate mobile menu
    useEffect(() => {
        if (!mobileMenuRef.current) return;
        if (isOpen) {
            gsap.fromTo(
                mobileMenuRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
            );
            gsap.fromTo(
                mobileMenuRef.current.querySelectorAll("a, button"),
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out", delay: 0.1 }
            );
        }
    }, [isOpen]);

    return (
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

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center text-deep-forest"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    ref={mobileMenuRef}
                    className="lg:hidden bg-oxygen-white/95 backdrop-blur-xl border-t border-deep-forest/5"
                >
                    <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-display font-medium text-deep-forest py-3 border-b border-deep-forest/5 hover:text-growth-green transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="mt-4 px-6 py-4 bg-deep-forest text-oxygen-white rounded-full text-center text-sm font-medium"
                        >
                            Initiate Collaboration
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
