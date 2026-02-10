"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Import images from assets
import img1 from "@/assets/Whisk_0628af7034bb1ff87b64bf1941d9398aeg.png";
import img2 from "@/assets/Whisk_5756044016d5ffe90a74c0568b790c5fdr.jpeg";
import img3 from "@/assets/Whisk_7827ac0ac23a5e4b2d5428d18ed6d8a9eg.png";
import img4 from "@/assets/Whisk_7931c818b4b079f86f14505203580451dr.jpeg";
import img5 from "@/assets/Whisk_9ad869ca2e90820b336470a27f01b1bcdr.jpeg";

const slides = [img1, img2, img3, img4, img5];

export default function HeroSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-deep-forest">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    <div
                        className={`w-full h-full transition-transform duration-[15000ms] ease-out ${index === currentIndex ? "scale-[1.15]" : "scale-100"
                            }`}
                    >
                        <Image
                            src={slide}
                            alt={`Hero slide ${index + 1}`}
                            fill
                            className="object-cover object-center"
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Premium Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/50 to-transparent mix-blend-multiply" />
                    </div>
                </div>
            ))}
        </div>
    );
}
