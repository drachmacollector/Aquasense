"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TimelineSlider } from "@/components/timeline-slider"
import { InsightCarousel } from "@/components/insight-carousel"
import { InfographicCard } from "@/components/infographic-card"
import { Calendar, TrendingUp, Waves, Thermometer, Droplets, Globe, ArrowRight, Play, Pause } from "lucide-react"

// Mock data for different time periods
const timelineData = {
  "2024-01": {
    floats: 4247,
    measurements: 892456,
    avgTemp: 18.2,
    avgSalinity: 35.1,
    insights: ["Temperature anomaly detected in North Atlantic", "New float deployment in Pacific"],
  },
  "2024-02": {
    floats: 4251,
    measurements: 901234,
    avgTemp: 17.8,
    avgSalinity: 35.3,
    insights: ["Salinity increase in Mediterranean", "Deep water formation event observed"],
  },
  "2024-03": {
    floats: 4263,
    measurements: 915678,
    avgTemp: 18.5,
    avgSalinity: 35.0,
    insights: ["Spring warming trend begins", "Arctic ice melt acceleration"],
  },
}

const featuredInsights = [
  {
    id: 1,
    title: "Global Ocean Warming Accelerates",
    description:
      "ARGO data reveals unprecedented warming rates in the upper 2000m of the ocean, with implications for sea level rise and marine ecosystems.",
    image: "/ocean-temperature-visualization.jpg",
    category: "Climate Change",
    date: "2024-01-15",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Deep Water Formation Patterns Shift",
    description:
      "New analysis of ARGO float data shows changing patterns in deep water formation, particularly in the North Atlantic and Southern Ocean.",
    image: "/ocean-currents-deep-water-formation.jpg",
    category: "Ocean Circulation",
    date: "2024-01-10",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Marine Heatwaves Increase in Frequency",
    description:
      "ARGO temperature records document a 50% increase in marine heatwave events over the past decade, affecting global fisheries.",
    image: "/marine-heatwave-ocean-temperature.jpg",
    category: "Marine Biology",
    date: "2024-01-05",
    readTime: "4 min read",
  },
]

const infographicData = [
  {
    title: "Global ARGO Network",
    value: "4,000+",
    subtitle: "Active Floats Worldwide",
    icon: Globe,
    color: "primary",
    description: "Autonomous floats collecting data across all ocean basins",
    trend: "+2.3%",
  },
  {
    title: "Temperature Monitoring",
    value: "0-2000m",
    subtitle: "Depth Range Coverage",
    icon: Thermometer,
    color: "accent",
    description: "Continuous temperature profiling from surface to deep ocean",
    trend: "24/7",
  },
  {
    title: "Salinity Precision",
    value: "±0.003",
    subtitle: "PSU Accuracy",
    icon: Droplets,
    color: "blue",
    description: "High-precision conductivity sensors for salinity measurement",
    trend: "99.9%",
  },
  {
    title: "Data Collection",
    value: "2M+",
    subtitle: "Profiles Per Year",
    icon: TrendingUp,
    color: "green",
    description: "Massive dataset enabling climate research and forecasting",
    trend: "+15%",
  },
]

export default function ExplorePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024-01")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const periods = Object.keys(timelineData)
  const currentData = timelineData[selectedPeriod as keyof typeof timelineData]

  // Auto-play timeline
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setSelectedPeriod((prev) => {
        const currentIndex = periods.indexOf(prev)
        const nextIndex = (currentIndex + 1) % periods.length
        return periods[nextIndex]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying, periods])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-teal-800/10 to-green-900/20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?key=ocean-explore')] bg-cover bg-center opacity-20" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-accent/5 rounded-full blur-lg animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
              Explore Ocean Data
            </span>
            <br />
            <span className="text-foreground">Through Time</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            Navigate through years of ARGO float data, discover insights, and understand how our oceans are changing
            over time.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Interactive Timeline</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Explore ARGO data across different time periods and observe ocean changes
            </p>
          </div>

          {/* Timeline Controls */}
          <Card className="glass bg-card/60 border-border/50 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {new Date(selectedPeriod + "-01").toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </h3>
                    <p className="text-sm text-muted-foreground">Selected time period</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  variant="outline"
                  className="glass bg-card/50 border-border/50"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
              </div>

              <TimelineSlider
                periods={periods}
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
                isPlaying={isPlaying}
              />
            </CardContent>
          </Card>

          {/* Current Period Data */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="glass bg-card/60 border-border/50 hover:bg-card/70 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{currentData.floats.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Active Floats</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass bg-card/60 border-border/50 hover:bg-card/70 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{currentData.measurements.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Measurements</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass bg-card/60 border-border/50 hover:bg-card/70 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <Thermometer className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{currentData.avgTemp}°C</p>
                    <p className="text-sm text-muted-foreground">Avg Temperature</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass bg-card/60 border-border/50 hover:bg-card/70 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                    <Droplets className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{currentData.avgSalinity}</p>
                    <p className="text-sm text-muted-foreground">Avg Salinity (PSU)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Period Insights */}
          <Card className="glass bg-card/60 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Waves className="h-5 w-5 text-primary" />
                <span>
                  Key Insights for{" "}
                  {new Date(selectedPeriod + "-01").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentData.insights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 glass bg-card/30 rounded-lg border border-border/30"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-foreground">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Insights Carousel */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Featured Insights</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Discover the latest findings and research from ARGO data analysis
            </p>
          </div>

          <InsightCarousel insights={featuredInsights} />
        </div>
      </section>

      {/* Infographic Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">ARGO by the Numbers</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Understanding the scale and impact of the global ARGO network
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infographicData.map((item, index) => (
              <InfographicCard key={index} {...item} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-blue-500/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-balance">Ready to Dive Deeper?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Access the full dashboard for detailed analysis and real-time monitoring
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            Open Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}
