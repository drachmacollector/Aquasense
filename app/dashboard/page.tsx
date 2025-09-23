"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InteractiveMap } from "@/components/interactive-map"
import { DepthChart } from "@/components/depth-chart"
import { ParameterChart } from "@/components/parameter-chart"
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  MapPin,
  Thermometer,
  Droplets,
  Gauge,
  Calendar,
  Search,
  Download,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock ARGO float data
const mockFloatData = [
  {
    id: "5906468",
    lat: 35.2,
    lng: -75.1,
    temperature: 18.5,
    salinity: 35.2,
    pressure: 1013.2,
    lastUpdate: "2024-01-15T10:30:00Z",
    status: "active",
    measurements: 1247,
  },
  {
    id: "5906469",
    lat: 40.7,
    lng: -70.3,
    temperature: 12.8,
    salinity: 34.8,
    pressure: 1015.1,
    lastUpdate: "2024-01-15T09:45:00Z",
    status: "active",
    measurements: 892,
  },
  {
    id: "5906470",
    lat: 25.8,
    lng: -80.2,
    temperature: 24.1,
    salinity: 36.1,
    pressure: 1011.8,
    lastUpdate: "2024-01-15T11:15:00Z",
    status: "active",
    measurements: 1456,
  },
  {
    id: "5906471",
    lat: 32.1,
    lng: -64.8,
    temperature: 21.3,
    salinity: 35.7,
    pressure: 1012.5,
    lastUpdate: "2024-01-14T16:20:00Z",
    status: "inactive",
    measurements: 743,
  },
]

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedFloat, setSelectedFloat] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    dateRange: "7d",
    region: "all",
    parameter: "temperature",
    status: "all",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [droplets, setDroplets] = useState<Array<{ id: number; x: number; delay: number }>>([])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Generate droplets on scroll
      if (window.scrollY > 50 && Math.random() > 0.97) {
        const newDroplet = {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          delay: Math.random() * 2,
        }
        setDroplets((prev) => [...prev.slice(-8), newDroplet])
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredFloats = mockFloatData.filter((float) => {
    if (filters.status !== "all" && float.status !== filters.status) return false
    if (searchQuery && !float.id.includes(searchQuery)) return false
    return true
  })

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate data refresh
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const skyOffset = scrollY * 0.1
  const surfaceOffset = scrollY * 0.3
  const deepOffset = scrollY * 0.5

  return (
    <div className="min-h-screen overflow-x-hidden">
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

      <div className="relative z-20 flex h-screen">
        {/* Collapsible Sidebar */}
        <div
          className={cn(
            "bg-card/60 glass border-r border-border/50 transition-all duration-300 flex flex-col",
            sidebarCollapsed ? "w-16" : "w-80",
          )}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
                  <p className="text-sm text-muted-foreground">ARGO Float Data</p>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hover:bg-muted/50"
              >
                {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {!sidebarCollapsed && (
            <>
              {/* Filters Section */}
              <div className="p-4 space-y-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-primary" />
                  <h3 className="font-medium text-foreground">Filters</h3>
                </div>

                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-sm">
                    Search Float ID
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Enter float ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 glass bg-input/50 border-border/50"
                    />
                  </div>
                </div>

                {/* Date Range */}
                <div className="space-y-2">
                  <Label className="text-sm">Date Range</Label>
                  <Select
                    value={filters.dateRange}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, dateRange: value }))}
                  >
                    <SelectTrigger className="glass bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1d">Last 24 hours</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <Label className="text-sm">Region</Label>
                  <Select
                    value={filters.region}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, region: value }))}
                  >
                    <SelectTrigger className="glass bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="atlantic">Atlantic Ocean</SelectItem>
                      <SelectItem value="pacific">Pacific Ocean</SelectItem>
                      <SelectItem value="indian">Indian Ocean</SelectItem>
                      <SelectItem value="arctic">Arctic Ocean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Parameter */}
                <div className="space-y-2">
                  <Label className="text-sm">Primary Parameter</Label>
                  <Select
                    value={filters.parameter}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, parameter: value }))}
                  >
                    <SelectTrigger className="glass bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temperature">Temperature</SelectItem>
                      <SelectItem value="salinity">Salinity</SelectItem>
                      <SelectItem value="pressure">Pressure</SelectItem>
                      <SelectItem value="density">Density</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label className="text-sm">Status</Label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="glass bg-input/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Data
                    </>
                  )}
                </Button>
              </div>

              <Separator className="bg-border/50" />

              {/* Float List */}
              <div className="flex-1 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">Active Floats</h3>
                  <Badge variant="secondary" className="glass bg-primary/10 text-primary">
                    {filteredFloats.length}
                  </Badge>
                </div>

                <ScrollArea className="h-full">
                  <div className="space-y-3">
                    {filteredFloats.map((float) => (
                      <Card
                        key={float.id}
                        className={cn(
                          "glass bg-card/40 border-border/30 hover:bg-card/60 hover:border-border/50 transition-all duration-300 cursor-pointer group",
                          selectedFloat === float.id && "bg-primary/10 border-primary/30",
                        )}
                        onClick={() => setSelectedFloat(float.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span className="font-medium text-sm">{float.id}</span>
                            </div>
                            <Badge
                              variant={float.status === "active" ? "default" : "secondary"}
                              className={cn(
                                "text-xs",
                                float.status === "active"
                                  ? "bg-green-500/10 text-green-600 border-green-500/20"
                                  : "bg-gray-500/10 text-gray-600 border-gray-500/20",
                              )}
                            >
                              {float.status}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Thermometer className="h-3 w-3" />
                              <span>{float.temperature}°C</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Droplets className="h-3 w-3" />
                              <span>{float.salinity} PSU</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Gauge className="h-3 w-3" />
                              <span>{float.pressure} dbar</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(float.lastUpdate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="p-6 border-b border-border/50 bg-card/30 glass">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Ocean Data Dashboard
                </h1>
                <p className="text-muted-foreground">Real-time ARGO float monitoring and analysis</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="glass bg-card/50 border-border/50">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 p-6 space-y-6 overflow-auto">
            {/* Map and Summary Cards */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Interactive Map */}
              <div className="lg:col-span-2">
                <Card className="glass bg-card/60 border-border/50 h-50vh">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>ARGO Float Positions</span>
                    </CardTitle>
                    <CardDescription>
                      Interactive map showing current float locations with real-time data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <InteractiveMap
                      floats={filteredFloats}
                      selectedFloat={selectedFloat}
                      onFloatSelect={setSelectedFloat}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Summary Cards */}
              <div className="space-y-4">
                <Card className="glass bg-card/60 border-border/50 hover:bg-card/70 transition-all duration-300 group">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{filteredFloats.length}</p>
                        <p className="text-sm text-muted-foreground">Active Floats</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass bg-card/60 border-border/50 hover:bg-card/70 transition-all duration-300 group">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                        <Thermometer className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {(filteredFloats.reduce((sum, f) => sum + f.temperature, 0) / filteredFloats.length).toFixed(
                            1,
                          )}
                          °C
                        </p>
                        <p className="text-sm text-muted-foreground">Avg Temperature</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass bg-card/60 border-border/50 hover:bg-card/70 transition-all duration-300 group">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                        <Droplets className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {(filteredFloats.reduce((sum, f) => sum + f.salinity, 0) / filteredFloats.length).toFixed(1)}
                        </p>
                        <p className="text-sm text-muted-foreground">Avg Salinity (PSU)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass bg-card/60 border-border/50 hover:bg-card/70 transition-all duration-300 group">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                        <Gauge className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {filteredFloats.reduce((sum, f) => sum + f.measurements, 0).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Measurements</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Depth-Time Profile */}
              <Card className="glass bg-card/60 border-border/50">
                <CardHeader>
                  <CardTitle>Depth-Time Profile</CardTitle>
                  <CardDescription>Temperature and salinity variations with depth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <DepthChart selectedFloat={selectedFloat} />
                </CardContent>
              </Card>

              {/* Parameter Comparison */}
              <Card className="glass bg-card/60 border-border/50">
                <CardHeader>
                  <CardTitle>Parameter Comparison</CardTitle>
                  <CardDescription>Comparative analysis of oceanographic parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <ParameterChart floats={filteredFloats} parameter={filters.parameter} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
