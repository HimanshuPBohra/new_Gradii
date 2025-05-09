import Link from "next/link"
import { ArrowRight } from "lucide-react"
import TestimonialCarousel from "../custom/testimonial-carousel"
import ScrollSection from "../custom/scroll-section"
import { Timeline } from "../ui/timeline"

export default function Home() {
  // Timeline data
  const timelineData = [
    {
      title: "Step 1",
      content: (
        <div className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-2 text-black dark:text-white">Upload Your Assignments</h4>
          <p className="text-neutral-700 dark:text-neutral-300">
            Simply upload your assignments and let our AI handle the grading process efficiently.
          </p>
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-2 text-black dark:text-white">AI-Powered Grading</h4>
          <p className="text-neutral-700 dark:text-neutral-300">
            Our advanced AI analyzes submissions with precision, providing consistent and fair evaluations.
          </p>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-2 text-black dark:text-white">Review & Feedback</h4>
          <p className="text-neutral-700 dark:text-neutral-300">
            Review AI-generated grades and provide personalized feedback to help students improve.
          </p>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32">
        <h1 className="text-5xl md:text-7xl font-bold max-w-3xl mb-12">Grade Smarter Teach Better</h1>
        <Link
          href="/start-journey"
          className="inline-flex items-center gap-2 bg-white text-black rounded-full px-6 py-3 font-medium hover:bg-gray-200 transition-colors"
        >
          Start your journey <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 pb-10">
        <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-8">HEAR FROM OUR CLIENTS</h2>
        <TestimonialCarousel />
      </div>
      
      {/* Scroll Text Effect Section */}
      <ScrollSection />
      
      {/* Timeline Section */}
      <div className="bg-black">
        <div className="container mx-auto px-4 py-10">
          <Timeline data={timelineData} />
        </div>
      </div>
    </main>
  )
}
