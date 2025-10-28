"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BarChart3, Bot, Map, Search, Users, Volume2, VolumeX } from "lucide-react"

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Background video (full-bleed) with dark overlay for legibility */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/floatchat-video2.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{ transform: "scale(1)", transformOrigin: "center" }}
        />
      </div>

      {/* Mute/Unmute Button - Outside video container for proper z-index */}
      <button
        onClick={toggleMute}
        className="fixed bottom-80 right-8 z-50 p-4 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full border border-white/20 transition-all duration-300 hover:scale-110 group cursor-pointer"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <VolumeX className="h-8 w-8 text-white drop-shadow-lg" />
        ) : (
          <Volume2 className="h-8 w-8 text-white drop-shadow-lg" />
        )}
      </button>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center z-20 pt-20">
        {/* Floating particles removed to reduce distraction over video background */}

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-xl mx-auto px-4 mt-40">
          {/* Simple hero text - smaller and further down */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
            <p className="text-sm md:text-base text-white/90 font-normal mb-0 drop-shadow-md">
              Explore ARGO ocean data with AI-powered insights
            </p>
          </div>
        </div>

        {/* Bottom-positioned CTAs (centered) */}
        <div className="absolute left-0 right-0 bottom-16 flex justify-center z-20 px-4">
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
      </section>

      {/* Features Section */}
      <section className="relative pt-32 pb-20 px-4 z-20 bg-slate-900">
        
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
