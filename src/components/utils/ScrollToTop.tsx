"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/utils/SmoothScroll";

export default function ScrollToTop() {
    const pathname = usePathname();
    const { lenis } = useLenis();

    useEffect(() => {
        // If lenis is available, use it to scroll to top
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            // Fallback to standard window scroll
            window.scrollTo(0, 0);
        }
    }, [pathname, lenis]);

    return null;
}
