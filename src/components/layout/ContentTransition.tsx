"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function ContentTransition({
    children,
}: {
    children: React.ReactNode;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (!contentRef.current) return;

        // Kill existing animations
        gsap.killTweensOf(contentRef.current);

        gsap.fromTo(
            contentRef.current,
            {
                opacity: 0,
                y: 30,
                filter: "blur(10px)",
            },
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power4.out",
                clearProps: "all"
            }
        );
    }, [pathname]);

    return (
        <div ref={contentRef} className="w-full min-h-[60vh]">
            {children}
        </div>
    );
}
