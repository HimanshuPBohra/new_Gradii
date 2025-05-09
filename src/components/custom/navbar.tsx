"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollingUp, setScrollingUp] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Add scroll event listener to change navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrolled = currentScrollY > 10

      // Determine scroll direction
      if (currentScrollY < lastScrollY) {
        setScrollingUp(true)
      } else {
        setScrollingUp(false)
      }

      setScrolled(isScrolled)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${!scrollingUp && scrolled ? "opacity-0 -translate-y-full" : "opacity-100"}`}
    >
      <div
        className={`transition-all duration-300 ${
          scrolled && scrollingUp ? "mx-4 my-4 rounded-lg bg-zinc-800/50 backdrop-blur-sm" : "bg-black"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-white font-bold text-2xl">
              Dezerv
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-8">
                <Link href="/products" className="text-white hover:text-gray-300 transition-colors text-lg">
                  Products
                </Link>
                <Link href="/our-team" className="text-white hover:text-gray-300 transition-colors text-lg">
                  Our Team
                </Link>
              </div>
              <div className="flex items-center gap-6">
                <Link href="/login" className="text-white hover:text-gray-300 transition-colors text-lg">
                  Member login
                </Link>
                <Button
                  variant="outline"
                  className="text-black bg-white hover:bg-gray-200 rounded-full flex items-center gap-2 px-6 py-5 text-base font-medium"
                >
                  Review my portfolio <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white rounded-lg shadow-lg mx-4 mt-2">
          <nav className="flex flex-col">
            <Link
              href="/products"
              className="flex items-center justify-between text-black hover:bg-gray-100 transition-colors p-4 border-b border-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              href="/our-team"
              className="flex items-center justify-between text-black hover:bg-gray-100 transition-colors p-4 border-b border-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Team
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-between text-black hover:bg-gray-100 transition-colors p-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Member login
              <ChevronRight className="h-5 w-5" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
