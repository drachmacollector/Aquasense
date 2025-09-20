"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Insight {
  id: number
  title: string
  description: string
  image: string
  category: string
  date: string
  readTime: string
}

interface InsightCarouselProps {
  insights: Insight[]
}

export function InsightCarousel({ insights }: InsightCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % insights.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, insights.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? insights.length - 1 : prev - 1))
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % insights.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {insights.map((insight, index) => (
            <div key={insight.id} className="w-full flex-shrink-0">
              <Card className="glass bg-card/60 border-border/50 overflow-hidden group">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={insight.image || "/placeholder.svg"}
                      alt={insight.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute top-4 left-4 glass bg-card/80 border-border/50" variant="secondary">
                      {insight.category}
                    </Badge>
                  </div>

                  {/* Content */}
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{new Date(insight.date).toLocaleDateString()}</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{insight.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground text-balance">{insight.title}</h3>

                      <p className="text-muted-foreground leading-relaxed text-pretty">{insight.description}</p>

                      <Button className="w-fit bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 group">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          className="glass bg-card/50 border border-border/50 hover:bg-card/70"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {insights.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex ? "bg-primary scale-110" : "bg-muted hover:bg-muted-foreground/50",
              )}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="glass bg-card/50 border border-border/50 hover:bg-card/70"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-2 glass bg-card/80 border border-border/50 rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Auto-play</span>
          </div>
        </div>
      )}
    </div>
  )
}
