"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

export default function NotFound() {
    return (
        <main className="min-h-[80vh] flex items-center justify-center pt-24 pb-12 px-4 selection:bg-growth-green selection:text-deep-forest">
            <div className="container mx-auto max-w-2xl text-center">
                {/* Animated Icon/Graphic */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative inline-block mb-12"
                >
                    <div className="absolute inset-0 bg-growth-green/10 blur-3xl rounded-full" />
                    <div className="relative w-32 h-32 mx-auto bg-white border border-deep-forest/5 rounded-3xl flex items-center justify-center shadow-xl shadow-deep-forest/5">
                        <FiSearch className="text-4xl text-growth-green" />
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <h1 className="text-6xl md:text-8xl font-display font-bold text-deep-forest mb-4">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-deep-forest/80 mb-6">
                        Resource Not Found
                    </h2>
                    <p className="text-deep-forest/60 max-w-md mx-auto mb-10 leading-relaxed font-sans">
                        The perspective you are looking for has shifted or no longer exists in our primary archive.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="group flex items-center gap-2 px-8 py-4 bg-deep-forest text-oxygen-white rounded-full text-sm font-medium transition-all hover:bg-deep-forest/90 hover:shadow-xl hover:shadow-deep-forest/10 active:scale-95"
                    >
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <Link
                        href="/#contact"
                        className="px-8 py-4 border border-deep-forest/10 text-deep-forest rounded-full text-sm font-medium transition-all hover:bg-deep-forest/5 active:scale-95"
                    >
                        Report Issue
                    </Link>
                </motion.div>

                {/* Decorative elements */}
                <div className="mt-20 flex items-center justify-center gap-6 opacity-20">
                    <div className="h-px w-12 bg-deep-forest" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">DevPro Partners Platform</span>
                    <div className="h-px w-12 bg-deep-forest" />
                </div>
            </div>
        </main>
    );
}
