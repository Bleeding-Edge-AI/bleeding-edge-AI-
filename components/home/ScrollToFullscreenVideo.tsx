'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export const ScrollToFullscreenVideo: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], [24, 0]);

    // Smooth out the scale animation
    const smoothScale = useSpring(scale, { damping: 20, stiffness: 100 });
    const smoothBorderRadius = useSpring(borderRadius, { damping: 20, stiffness: 100 });

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest > 0.95 && videoRef.current) {
                // Ensure the video plays if checking scroll position
                // Note: Unmuted autoplay is blocked by browsers unless user interacted
                const playPromise = videoRef.current.play();

                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Auto-play was prevented
                        // We could show a "Play" button here if needed
                    });
                }
            } else if (latest < 0.5 && videoRef.current) {
                videoRef.current.pause();
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section ref={containerRef} className="relative h-[150vh] bg-neutral-950 flex flex-col justify-start pt-20">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{
                        scale: smoothScale,
                        borderRadius: smoothBorderRadius
                    }}
                    className="relative w-full h-full max-w-[1920px] max-h-[1080px] overflow-hidden shadow-2xl group"
                >
                    <video
                        ref={videoRef}
                        muted={isMuted} // React handles attribute binding
                        playsInline
                        loop
                        className="w-full h-full object-cover"
                    >
                        <source src="/BE_Intro.mp4" type="video/mp4" />
                    </video>

                    {/* Overlay Title - Fades out as it gets bigger/plays */}
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0.6, 0.9], [1, 0]) }}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none"
                    >
                        <div className="bg-neutral-900/40 backdrop-blur-sm p-4 md:p-8 rounded-2xl border border-white/10">
                            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter text-center">
                                ENTER THE <span className="text-amber-500">NEW ERA</span>
                            </h2>
                        </div>
                    </motion.div>

                    {/* Audio Control Button - Visible on Hover/Interaction */}
                    <button
                        onClick={toggleMute}
                        className="absolute bottom-8 left-8 z-30 p-3 bg-neutral-900/60 backdrop-blur-md rounded-full text-white/80 hover:text-white hover:bg-neutral-800 transition-all border border-white/10"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>

                </motion.div>
            </div>
        </section>
    );
};
