"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

// Import images from assets
import img1 from "@/assets/Whisk_0628af7034bb1ff87b64bf1941d9398aeg.png";
import img2 from "@/assets/Whisk_5756044016d5ffe90a74c0568b790c5fdr.jpeg";
import img3 from "@/assets/Whisk_7827ac0ac23a5e4b2d5428d18ed6d8a9eg.png";
import img4 from "@/assets/Whisk_7931c818b4b079f86f14505203580451dr.jpeg";
import img5 from "@/assets/Whisk_9ad869ca2e90820b336470a27f01b1bcdr.jpeg";

const slides = [img1, img2, img3, img4, img5];

const AUTO_PLAY_INTERVAL = 5000;

export default function HeroSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
    const [isPaused, setIsPaused] = useState(false);

    const swipeRef = useRef<{
        pointerId: number | null;
        startX: number;
        startY: number;
        lastX: number;
        lastY: number;
        isDown: boolean;
    }>({
        pointerId: null,
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        isDown: false,
    });

    const goToSlide = useCallback((index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    }, [currentIndex]);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        // Only enable swipe behavior for touch/pen (avoid interfering with desktop mouse interactions)
        if (e.pointerType === "mouse") return;

        swipeRef.current.pointerId = e.pointerId;
        swipeRef.current.isDown = true;
        swipeRef.current.startX = e.clientX;
        swipeRef.current.startY = e.clientY;
        swipeRef.current.lastX = e.clientX;
        swipeRef.current.lastY = e.clientY;

        setIsPaused(true);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === "mouse") return;
        if (!swipeRef.current.isDown) return;
        if (swipeRef.current.pointerId !== e.pointerId) return;

        swipeRef.current.lastX = e.clientX;
        swipeRef.current.lastY = e.clientY;
    };

    const finishPointer = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === "mouse") return;
        if (!swipeRef.current.isDown) return;
        if (swipeRef.current.pointerId !== e.pointerId) return;

        const dx = swipeRef.current.lastX - swipeRef.current.startX;
        const dy = swipeRef.current.lastY - swipeRef.current.startY;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        // Only treat as swipe if it's mostly horizontal and above threshold
        const SWIPE_THRESHOLD = 50;
        if (absDx > SWIPE_THRESHOLD && absDx > absDy) {
            if (dx < 0) nextSlide();
            else prevSlide();
        }

        swipeRef.current.isDown = false;
        swipeRef.current.pointerId = null;
        setIsPaused(false);
    };

    // Auto-play with pause on hover
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    // Framer Motion variants for the crossfade + subtle Ken Burns
    const slideVariants = {
        enter: {
            opacity: 0,
            scale: 1.04,
        },
        center: {
            opacity: 1,
            scale: 1,
            transition: {
                opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                scale: { duration: 12, ease: "linear" as const },
            },
        },
        exit: {
            opacity: 0,
            transition: {
                opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
            },
        },
    };

    return (
        <div
            className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-deep-forest group touch-pan-y select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={finishPointer}
            onPointerCancel={finishPointer}
        >
            {/* ─── Slides ─── */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={slides[currentIndex]}
                        alt={`Hero slide ${currentIndex + 1}`}
                        fill
                        className="object-cover object-center"
                        priority={currentIndex === 0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Premium bottom gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/60 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* ─── Desktop Arrow Navigation ─── */}
            <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="
                    hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-30
                    items-center justify-center w-11 h-11
                    rounded-full border border-white/25
                    bg-white/[0.08] backdrop-blur-md
                    text-white/70 hover:text-white hover:bg-white/[0.18] hover:border-white/40
                    transition-all duration-300 ease-out
                    opacity-0 group-hover:opacity-100
                    cursor-pointer shadow-lg shadow-black/10
                "
            >
                <HiChevronLeft className="w-5 h-5" />
            </button>

            <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="
                    hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-30
                    items-center justify-center w-11 h-11
                    rounded-full border border-white/25
                    bg-white/[0.08] backdrop-blur-md
                    text-white/70 hover:text-white hover:bg-white/[0.18] hover:border-white/40
                    transition-all duration-300 ease-out
                    opacity-0 group-hover:opacity-100
                    cursor-pointer shadow-lg shadow-black/10
                "
            >
                <HiChevronRight className="w-5 h-5" />
            </button>

            {/* ─── Dot Indicators ─── */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className="relative flex items-center justify-center p-1 cursor-pointer group/dot"
                    >
                        {/* Outer ring (hollow dot) */}
                        <motion.span
                            className="block rounded-full border border-white/50"
                            animate={{
                                width: index === currentIndex ? 28 : 10,
                                height: 10,
                                borderColor: index === currentIndex
                                    ? "rgba(255,255,255,0.9)"
                                    : "rgba(255,255,255,0.4)",
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            {/* Inner fill for active */}
                            <motion.span
                                className="block w-full h-full rounded-full"
                                animate={{
                                    backgroundColor: index === currentIndex
                                        ? "rgba(255,255,255,0.85)"
                                        : "rgba(255,255,255,0)",
                                    scale: index === currentIndex ? 1 : 0,
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            />
                        </motion.span>
                    </button>
                ))}
            </div>

            {/* ─── Progress Bar (thin line at bottom for auto-play feedback) ─── */}
            {!isPaused && (
                <motion.div
                    key={`progress-${currentIndex}`}
                    className="absolute bottom-0 left-0 h-[2px] bg-white/30 z-30"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                        duration: AUTO_PLAY_INTERVAL / 1000,
                        ease: "linear",
                    }}
                />
            )}
        </div>
    );
}
