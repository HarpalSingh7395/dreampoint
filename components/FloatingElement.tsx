"use client"
import { ReactNode, useEffect, useState } from "react";

const FloatingElement = ({ children, delay = 0, amplitude = 20 }: { children: ReactNode, delay?: number, amplitude?: number }) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            const animate = () => {
                setOffset((prev) => prev + 0.02);
                requestAnimationFrame(animate);
            };
            animate();
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            style={{
                transform: `translateY(${Math.sin(offset) * amplitude}px)`,
                transition: 'transform 0.1s ease-out'
            }}
        >
            {children}
        </div>
    );
};

export default FloatingElement;