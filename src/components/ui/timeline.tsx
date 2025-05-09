"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const semicircleRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // Set up window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial value
    setWindowWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  // Scroll progress for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  // Scroll progress specifically for the semicircle expansion
  const { scrollYProgress: semicircleScrollProgress } = useScroll({
    target: semicircleRef,
    offset: ["start 80%", "start 20%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Transform values for the semicircle expansion
  const initialCircleSize = windowWidth < 768 ? 150 : 300; // Smaller on mobile
  const finalCircleSize = windowWidth < 768 ? windowWidth : windowWidth * 0.8;
  
  const semicircleSize = useTransform(
    semicircleScrollProgress,
    [0, 1],
    [initialCircleSize, finalCircleSize]
  );
  
  const semicircleBorderRadius = useTransform(
    semicircleScrollProgress,
    [0, 1],
    ["50%", windowWidth < 768 ? "30%" : "10%"]
  );

  return (
    <div
      className="w-full bg-black font-sans md:px-10 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Expanding Semicircle Section */}
      <div 
        ref={semicircleRef}
        className="w-full py-32 flex items-center justify-center relative"
      >
        <motion.div
          className="bg-gradient-to-r from-purple-800 to-blue-600 absolute z-10"
          style={{
            width: semicircleSize,
            height: semicircleSize,
            borderTopLeftRadius: semicircleBorderRadius,
            borderTopRightRadius: semicircleBorderRadius,
            bottom: 0,
            left: "50%",
            x: "-50%",
          }}
        />
        <div className="relative z-20 text-center px-4">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-6">
            Our Process
          </h2>
          <p className="text-neutral-300 max-w-xl mx-auto">
            Follow our seamless workflow to transform how you manage and grade assignments
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-white max-w-4xl">
          How It Works
        </h2>
        <p className="text-neutral-300 text-sm md:text-base max-w-sm">
          Our streamlined process makes grading assignments easier than ever before.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          // Calculate individual item progress for staggered animations
          const itemProgress = useTransform(
            scrollYProgress,
            // Adjust these values to control when each item's animation starts and ends
            [index * 0.2, index * 0.2 + 0.3],
            [0, 1]
          );
          
          // Create transforms for this specific item
          const itemCircleScale = useTransform(itemProgress, [0, 1], [1, 1.5]);
          const itemInnerCircleScale = useTransform(itemProgress, [0, 1], [1, 1.8]);
          
          return (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <motion.div 
                  className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center"
                  style={{ scale: itemCircleScale }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700"
                    style={{ scale: itemInnerCircleScale }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-400">
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-400">
                  {item.title}
                </h3>
                <motion.div
                  style={{ opacity: itemProgress }}
                  transition={{ duration: 0.5 }}
                >
                  {item.content}{" "}
                </motion.div>
              </div>
            </div>
          );
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};