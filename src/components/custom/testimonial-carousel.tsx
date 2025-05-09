"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Testimonial data matching exact quotes from screenshots
const testimonials = [
  {
    id: 1,
    quote: "Dezerv's transparency gave me the confidence I needed.",
    name: "Sudeep Goenka",
    title: "Director, Goldiee Group",
    image: "/john1.jpg",
  },
  {
    id: 2,
    quote: "With Dezerv, I found the right partner for the next 25 years.",
    name: "Dr. Sanjay Arora",
    title: "Founder, Suburban Diagnostics",
    image: "/john1.jpg",
  },
  {
    id: 3,
    quote: "Investment experts at Dezerv have a solid investment thesis.",
    name: "Aadil Bandukwala",
    title: "Marketing Director, HackerRank",
    image: "/john1.jpg",
  },
  {
    id: 4,
    quote: "Dezerv brought simplicity and clarity to my investments.",
    name: "Pooja Jauhari",
    title: "Founder & CEO, VMLYoung",
    image: "/john1.jpg",
  },
  {
    id: 5,
    quote: "I am sure Dezerv will invest my money better than I could.",
    name: "Brijesh Bhardwaj",
    title: "Co-founder, SpareBar",
    image: "/john1.jpg",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      goToNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  // Go directly to an index
  const goToIndex = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={carouselRef}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="min-w-full px-2">
              <div className="bg-gray-50 rounded-xl overflow-hidden h-full border border-gray-200">
                <div className="flex flex-col md:flex-row">
                  {/* Left side - Image */}
                  <div className="w-full md:w-5/12 lg:w-4/12 relative h-80 md:h-96">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>

                  {/* Right side - Content */}
                  <div className="w-full md:w-7/12 lg:w-8/12 p-6 md:p-10 flex flex-col justify-center">
                    <blockquote className="text-2xl md:text-4xl font-medium mb-6 leading-tight">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="mt-4">
                      <cite className="text-lg md:text-xl font-medium not-italic block text-gray-800">
                        {testimonial.name}
                      </cite>
                      <span className="text-sm md:text-base text-gray-600">{testimonial.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-lg z-10"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-lg z-10"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-gray-800" : "w-1.5 bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
