"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BarChart3, Bot, Map, Search, Users, Droplets } from "lucide-react"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [droplets, setDroplets] = useState<Array<{ id: number; x: number; delay: number }>>([])
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Generate droplets on scroll
      if (window.scrollY > 100 && Math.random() > 0.95) {
        const newDroplet = {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          delay: Math.random() * 2,
        }
        setDroplets((prev) => [...prev.slice(-10), newDroplet])
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate parallax offsets
  const skyOffset = scrollY * 0.1
  const surfaceOffset = scrollY * 0.3
  const deepOffset = scrollY * 0.5
  const waveOffset = Math.sin(Date.now() * 0.001) * 10

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Parallax Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Sky Layer */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-sky-200 via-blue-300 to-blue-500"
          style={{ transform: `translateY(${skyOffset}px)` }}
        />

        {/* Ocean Surface Layer */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/50 to-blue-700"
          style={{ transform: `translateY(${surfaceOffset}px)` }}
        />

        {/* Deep Ocean Layer */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-800 to-slate-900"
          style={{
            transform: `translateY(${deepOffset}px)`,
            opacity: Math.min(scrollY / 1000, 0.8),
          }}
        />
      </div>

      {/* Animated Droplets */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {droplets.map((droplet) => (
          <div
            key={droplet.id}
            className="absolute w-1 h-4 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full opacity-60 animate-droplet"
            style={{
              left: `${droplet.x}px`,
              top: "-20px",
              animationDelay: `${droplet.delay}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center z-20">
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
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Droplets className="h-16 w-16 text-blue-600 animate-pulse" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-ping" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            <span className="bg-gradient-to-r from-blue-700 via-cyan-700 to-teal-600 bg-clip-text text-transparent animate-pulse">
              FloatChat
            </span>
            <br />
            <span className="text-white/90 text-4xl md:text-5xl">Ocean Intelligence</span>
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

        {/* Interactive Wave Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
          {/* Multiple wave layers for depth */}
          <svg
            className="absolute bottom-0 w-full h-32 text-blue-600/60"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ transform: `translateY(${waveOffset * (-2)}px)` }}
          >
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="currentColor" className="animate-wave" />
          </svg>

          <svg
            className="absolute bottom-0 w-full h-28 text-blue-700/70"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ transform: `translateY(${waveOffset * 5.0}px)` }}
          >
            <path
              d="M0,80 C400,20 800,100 1200,40 L1200,120 L0,120 Z"
              fill="currentColor"
              className="animate-wave-reverse"
            />
          </svg>

          <svg
            className="absolute bottom-0 w-full h-24 text-blue-800/80"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ transform: `translateY(${waveOffset * 0.5}px)` }}
          >
            <path d="M0,40 C200,80 1000,20 1200,70 L1200,120 L0,120 Z" fill="currentColor" className="animate-wave" />
          </svg>
        </div>
      </section>

      {/* Features Section with Scroll Reveal */}
      <section
        className="relative py-20 px-4 z-20 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          opacity: Math.max(0.3, 1 - scrollY / 2000),
        }}
      >
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
            <Card className="p-6 glass bg-blue-900/30 hover:bg-blue-800/40 transition-all duration-300 group border-blue-400/20 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Search className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-white">Data Exploration</h3>
              </div>
              <p className="text-blue-200/80">
                Browse and filter ARGO float data with advanced search capabilities and timeline navigation.
              </p>
            </Card>

            <Card className="p-6 glass bg-blue-900/30 hover:bg-blue-800/40 transition-all duration-300 group border-blue-400/20 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                  <Map className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-white">Interactive Maps</h3>
              </div>
              <p className="text-blue-200/80">
                Visualize ARGO float positions on interactive maps with real-time data overlays and tooltips.
              </p>
            </Card>

            <Card className="p-6 glass bg-blue-900/30 hover:bg-blue-800/40 transition-all duration-300 group border-blue-400/20 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-teal-500/20 rounded-lg group-hover:bg-teal-500/30 transition-colors">
                  <BarChart3 className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-white">Data Visualization</h3>
              </div>
              <p className="text-blue-200/80">
                Create dynamic charts and graphs to analyze depth-time profiles and parameter comparisons.
              </p>
            </Card>

            <Card className="p-6 glass bg-blue-900/30 hover:bg-blue-800/40 transition-all duration-300 group border-blue-400/20 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
                  <Bot className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-white">AI Assistant</h3>
              </div>
              <p className="text-blue-200/80">
                Get intelligent insights and answers about ocean data through our AI-powered chatbot interface.
              </p>
            </Card>

            <Card className="p-6 glass bg-blue-900/30 hover:bg-blue-800/40 transition-all duration-300 group border-blue-400/20 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                  <Users className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-white">Collaboration</h3>
              </div>
              <p className="text-blue-200/80">
                Share discoveries and collaborate with researchers worldwide through our platform.
              </p>
            </Card>

            <Card className="p-6 glass bg-blue-900/30 hover:bg-blue-800/40 transition-all duration-300 group border-blue-400/20 backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                  <BarChart3 className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-white">Real-time Updates</h3>
              </div>
              <p className="text-blue-200/80">
                Access the latest oceanographic data with real-time updates from ARGO float networks.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
