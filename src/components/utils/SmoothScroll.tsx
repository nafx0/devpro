"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScroll component using Lenis for smooth scrolling and syncing with GSAP ScrollTrigger.
 * Note: Uses modern 'lenis' package instead of legacy '@studio-freight/react-lenis'.
 */

type LenisContextType = {
    lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextType>({ lenis: null });

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        // Only initialize on client
        if (typeof window === "undefined") return;

        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        // Sync with GSAP ScrollTrigger
        lenisInstance.on('scroll', ScrollTrigger.update);

        // Integration with GSAP Ticker
        const tickerUpdate = (time: number) => {
            lenisInstance.raf(time * 1000);
        };
        gsap.ticker.add(tickerUpdate);

        gsap.ticker.lagSmoothing(0);

        setLenis(lenisInstance);

        return () => {
            lenisInstance.destroy();
            gsap.ticker.remove(tickerUpdate);
        };
    }, []);

    return (
        <LenisContext.Provider value={{ lenis }}>
            {children}
        </LenisContext.Provider>
    );
}
