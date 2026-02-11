"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiRefreshCw, FiHome } from "react-icons/fi";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-[80vh] flex items-center justify-center pt-24 pb-12 px-4 selection:bg-rose-100 selection:text-rose-900">
            <div className="container mx-auto max-w-2xl text-center">
                {/* Animated Icon/Graphic */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative inline-block mb-12"
                >
                    <div className="absolute inset-0 bg-rose-500/10 blur-3xl rounded-full" />
                    <div className="relative w-32 h-32 mx-auto bg-white border border-rose-500/10 rounded-3xl flex items-center justify-center shadow-xl shadow-rose-500/5">
                        <FiAlertTriangle className="text-4xl text-rose-500" />
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-deep-forest mb-4">
                        System Interruption
                    </h1>
                    <p className="text-deep-forest/60 max-w-md mx-auto mb-10 leading-relaxed font-sans">
                        We encountered an unexpected error while processing your request. Our technical team has been notified.
                    </p>

                    {error.digest && (
                        <div className="mb-8 p-3 bg-deep-forest/5 rounded-xl inline-block">
                            <code className="text-[10px] text-deep-forest/40 uppercase tracking-wider">
                                Trace ID: {error.digest}
                            </code>
                        </div>
                    )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => reset()}
                        className="flex items-center gap-2 px-8 py-4 bg-deep-forest text-oxygen-white rounded-full text-sm font-medium transition-all hover:bg-deep-forest/90 hover:shadow-xl hover:shadow-deep-forest/10 active:scale-95"
                    >
                        <FiRefreshCw className="transition-transform group-active:rotate-180" />
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="flex items-center gap-2 px-8 py-4 border border-deep-forest/10 text-deep-forest rounded-full text-sm font-medium transition-all hover:bg-deep-forest/5 active:scale-95"
                    >
                        <FiHome />
                        Return Home
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
