"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BarChart3, Bot, Map, Search, Users, Droplets } from "lucide-react"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate parallax offsets with reduced intensity to prevent glitching
  const surfaceOffset = scrollY * 0.2
  const deepOffset = scrollY * 0.4

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Fixed Background - No parallax to prevent white sections */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center z-20 pt-20">
        {/* Floating Water Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float blur-sm"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Droplets className="h-20 w-20 text-white/80 animate-pulse" />
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-ping" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 text-balance">
            <span className="text-white drop-shadow-2xl shadow-black/50 filter">
              FloatChat
            </span>
            <br />
            <span className="text-white/90 text-3xl md:text-4xl font-semibold drop-shadow-lg">Ocean Intelligence</span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100/80 mb-8 text-pretty max-w-2xl mx-auto">
            Dive deep into ARGO float data with AI-powered insights, interactive visualizations, and real-time ocean
            exploration tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0"
            >
              <Link href="/explore">
                Explore Ocean Data
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="glass bg-white/10 hover:bg-white/20 border-white/20 text-white"
            >
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>

        {/* Animated Multi-Layer Waves */}
        <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
          {/* Wave Layer 1 - Fast Flowing */}
          <svg
            className="absolute bottom-0 w-[200%] h-24 text-blue-500/30 animate-wave-flow"
            viewBox="0 0 2400 120"
            preserveAspectRatio="none"
          >
            <path d="M0,60 C600,120 1800,0 2400,60 L2400,120 L0,120 Z" fill="currentColor" />
          </svg>

          {/* Wave Layer 2 - Pulsing */}
          <svg
            className="absolute bottom-0 w-full h-28 text-blue-600/40 animate-wave-pulse"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,80 C400,20 800,100 1200,40 L1200,120 L0,120 Z" fill="currentColor" />
          </svg>

          {/* Wave Layer 3 - Ocean Swell */}
          <svg
            className="absolute bottom-0 w-[150%] h-32 text-blue-700/50 animate-ocean-swell"
            viewBox="0 0 1800 120"
            preserveAspectRatio="none"
          >
            <path d="M0,40 C450,90 1350,10 1800,70 L1800,120 L0,120 Z" fill="currentColor" />
          </svg>

          {/* Wave Layer 4 - Tide Animation */}
          <svg
            className="absolute bottom-0 w-full h-36 text-blue-800/60 animate-tide"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,50 C300,100 900,10 1200,50 L1200,120 L0,120 Z" fill="currentColor" />
          </svg>

          {/* Wave Layer 5 - Reverse Wave */}
          <svg
            className="absolute bottom-0 w-full h-30 text-blue-900/70 animate-wave-reverse"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,70 C250,30 950,110 1200,70 L1200,120 L0,120 Z" fill="currentColor" />
          </svg>

          {/* Wave Layer 6 - Base Layer */}
          <svg
            className="absolute bottom-0 w-full h-20 text-slate-900"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,60 C350,90 850,30 1200,60 L1200,120 L0,120 Z" fill="currentColor" />
          </svg>

          {/* Wave Layer 7 - Surface Foam with Float */}
          <svg
            className="absolute bottom-0 w-full h-16 text-white/15 animate-float"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,80 C200,120 1000,40 1200,80 L1200,120 L0,120 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 z-20 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-white">
              Powerful Ocean Intelligence Tools
            </h2>
            <p className="text-lg text-blue-200/80 text-pretty max-w-2xl mx-auto">
              Access comprehensive oceanographic data through our suite of AI-powered analysis and interactive
              visualization tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-white/95 dark:bg-slate-800/95 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-slate-900 dark:text-white">Data Exploration</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Browse and filter ARGO float data with advanced search capabilities and timeline navigation.
              </p>
            </Card>

            <Card className="p-6 bg-white/95 dark:bg-slate-800/95 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <Map className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-slate-900 dark:text-white">Interactive Maps</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Visualize ARGO float positions on interactive maps with real-time data overlays and tooltips.
              </p>
            </Card>

            <Card className="p-6 bg-white/95 dark:bg-slate-800/95 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                  <BarChart3 className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-slate-900 dark:text-white">Data Visualization</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Create dynamic charts and graphs to analyze depth-time profiles and parameter comparisons.
              </p>
            </Card>

            <Card className="p-6 bg-white/95 dark:bg-slate-800/95 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                  <Bot className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-slate-900 dark:text-white">AI Assistant</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Get intelligent insights and answers about ocean data through our AI-powered chatbot interface.
              </p>
            </Card>

            <Card className="p-6 bg-white/95 dark:bg-slate-800/95 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-slate-900 dark:text-white">Collaboration</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Share discoveries and collaborate with researchers worldwide through our platform.
              </p>
            </Card>

            <Card className="p-6 bg-white/95 dark:bg-slate-800/95 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-slate-900 dark:text-white">Real-time Updates</h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Access the latest oceanographic data with real-time updates from ARGO float networks.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
