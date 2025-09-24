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

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Ocean-themed layered background */}
      <div className="fixed inset-0 z-0">
        {/* Deep ocean base layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900" />
        
        {/* Ocean surface layer with movement */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/30 via-cyan-500/20 to-transparent animate-wave-pulse" />
        
        {/* Light rays and caustics */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-blue-600/10 animate-ocean-swell" />
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-300/40 rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-blue-300/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-cyan-400/50 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-40 right-1/4 w-2 h-2 bg-blue-400/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        
        {/* Subtle grid overlay for data feel */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Collapsible Sidebar */}
        <div
          className={cn(
            "backdrop-blur-xl bg-white/10 border-r border-white/20 transition-all duration-300 flex flex-col shadow-2xl",
            sidebarCollapsed ? "w-16" : "w-80",
          )}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            borderRight: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-white/10 to-cyan-300/10">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div>
                  <h2 className="text-lg font-semibold text-white drop-shadow-md">Dashboard</h2>
                  <p className="text-sm text-cyan-100">ARGO Float Data</p>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm"
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
                  <Filter className="h-4 w-4 text-cyan-300" />
                  <h3 className="font-medium text-white drop-shadow-md">Filters</h3>
                </div>

                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-sm text-cyan-100 font-medium">
                    Search Float ID
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-300" />
                    <Input
                      id="search"
                      placeholder="Enter float ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-cyan-200 focus:border-cyan-300 focus:ring-cyan-300/20 backdrop-blur-sm"
                    />
                  </div>
                </div>

                {/* Date Range */}
                <div className="space-y-2">
                  <Label className="text-sm text-cyan-100 font-medium">Date Range</Label>
                  <Select
                    value={filters.dateRange}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, dateRange: value }))}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-cyan-300 focus:ring-cyan-300/20 backdrop-blur-sm">
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
                  <Label className="text-sm text-cyan-100 font-medium">Region</Label>
                  <Select
                    value={filters.region}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, region: value }))}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-cyan-300 focus:ring-cyan-300/20 backdrop-blur-sm">
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
                  <Label className="text-sm text-cyan-100 font-medium">Primary Parameter</Label>
                  <Select
                    value={filters.parameter}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, parameter: value }))}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-cyan-300 focus:ring-cyan-300/20 backdrop-blur-sm">
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
                  <Label className="text-sm text-cyan-100 font-medium">Status</Label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-cyan-300 focus:ring-cyan-300/20 backdrop-blur-sm">
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
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg backdrop-blur-sm border border-white/20 hover:border-white/30"
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

              <Separator className="bg-white/20" />

              {/* Float List */}
              <div className="flex-1 p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-white drop-shadow-md">Active Floats</h3>
                  <Badge variant="secondary" className="bg-cyan-400/20 text-cyan-100 border-cyan-300/30 backdrop-blur-sm">
                    {filteredFloats.length}
                  </Badge>
                </div>

                <ScrollArea className="h-[calc(100vh-400px)] enhanced-scroll">
                  <div className="space-y-3">
                    {filteredFloats.map((float) => (
                      <Card
                        key={float.id}
                        className={cn(
                          "backdrop-blur-md bg-slate-800/60 border-white/20 hover:bg-slate-800/70 hover:border-white/30 transition-all duration-300 cursor-pointer group shadow-lg",
                          selectedFloat === float.id && "bg-cyan-600/30 border-cyan-300/60 shadow-xl ring-2 ring-cyan-300/40",
                        )}
                        onClick={() => setSelectedFloat(float.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-cyan-200" />
                              <span className="font-medium text-sm text-white drop-shadow-sm">{float.id}</span>
                            </div>
                            <Badge
                              variant={float.status === "active" ? "default" : "secondary"}
                              className={cn(
                                "text-xs backdrop-blur-sm",
                                float.status === "active"
                                  ? "bg-green-500/25 text-green-100 border-green-400/50"
                                  : "bg-gray-500/25 text-gray-100 border-gray-400/50",
                              )}
                            >
                              {float.status}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-xs text-cyan-50">
                            <div className="flex items-center space-x-1">
                              <Thermometer className="h-3 w-3 text-red-300" />
                              <span>{float.temperature}°C</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Droplets className="h-3 w-3 text-blue-300" />
                              <span>{float.salinity} PSU</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Gauge className="h-3 w-3 text-purple-300" />
                              <span>{float.pressure} dbar</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-cyan-200" />
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
          <div className="p-6 border-b border-white/20 backdrop-blur-xl bg-gradient-to-r from-white/10 to-cyan-400/10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                  Ocean Data Dashboard
                </h1>
                <p className="text-cyan-100">Real-time ARGO float monitoring and analysis</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/40 text-white backdrop-blur-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 p-6 space-y-6 overflow-auto">
            {/* Map and Summary Cards */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Interactive Map */}
              <div className="lg:col-span-9">
                <Card className="backdrop-blur-xl bg-slate-900/80 border-white/20 shadow-2xl h-[500px]">
                  <CardHeader className="bg-gradient-to-r from-slate-800/60 to-blue-900/60 border-b border-white/20 pb-4">
                    <CardTitle className="flex items-center space-x-2 text-white drop-shadow-md">
                      <MapPin className="h-5 w-5 text-cyan-300" />
                      <span>ARGO Float Positions</span>
                    </CardTitle>
                    <CardDescription className="text-cyan-100 mt-1">
                      Interactive map showing current float locations with real-time data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 h-[400px]">
                    <div className="map-container h-full p-2">
                      <InteractiveMap
                        floats={filteredFloats}
                        selectedFloat={selectedFloat}
                        onFloatSelect={setSelectedFloat}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary Cards */}
              <div className="lg:col-span-3 space-y-4">
                <Card className="backdrop-blur-xl bg-slate-800/70 border-white/20 hover:bg-slate-800/80 card-hover-lift transition-all duration-300 group shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-cyan-400/25 rounded-lg group-hover:bg-cyan-400/35 transition-colors backdrop-blur-sm">
                        <MapPin className="h-6 w-6 text-cyan-200" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white drop-shadow-md">{filteredFloats.length}</p>
                        <p className="text-sm text-cyan-100">Active Floats</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-xl bg-slate-800/70 border-white/20 hover:bg-slate-800/80 card-hover-lift transition-all duration-300 group shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-red-400/25 rounded-lg group-hover:bg-red-400/35 transition-colors backdrop-blur-sm">
                        <Thermometer className="h-6 w-6 text-red-200" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white drop-shadow-md">
                          {(filteredFloats.reduce((sum, f) => sum + f.temperature, 0) / filteredFloats.length).toFixed(
                            1,
                          )}
                          °C
                        </p>
                        <p className="text-sm text-cyan-100">Avg Temperature</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-xl bg-slate-800/70 border-white/20 hover:bg-slate-800/80 card-hover-lift transition-all duration-300 group shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-blue-400/25 rounded-lg group-hover:bg-blue-400/35 transition-colors backdrop-blur-sm">
                        <Droplets className="h-6 w-6 text-blue-200" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white drop-shadow-md">
                          {(filteredFloats.reduce((sum, f) => sum + f.salinity, 0) / filteredFloats.length).toFixed(1)}
                        </p>
                        <p className="text-sm text-cyan-100">Avg Salinity (PSU)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-xl bg-slate-800/70 border-white/20 hover:bg-slate-800/80 card-hover-lift transition-all duration-300 group shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-purple-400/25 rounded-lg group-hover:bg-purple-400/35 transition-colors backdrop-blur-sm">
                        <Gauge className="h-6 w-6 text-purple-200" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white drop-shadow-md">
                          {filteredFloats.reduce((sum, f) => sum + f.measurements, 0).toLocaleString()}
                        </p>
                        <p className="text-sm text-cyan-100">Total Measurements</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Depth-Time Profile */}
              <Card className="backdrop-blur-xl bg-white/20 border-white/30 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-white/15 to-cyan-400/15 border-b border-white/20 pb-4">
                  <CardTitle className="text-white drop-shadow-md font-semibold">Depth-Time Profile</CardTitle>
                  <CardDescription className="text-cyan-100 mt-1">Temperature and salinity variations with depth over time</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="white-chart-container h-full p-4">
                    <DepthChart selectedFloat={selectedFloat} />
                  </div>
                </CardContent>
              </Card>

              {/* Parameter Comparison */}
              <Card className="backdrop-blur-xl bg-white/20 border-white/30 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-white/15 to-cyan-400/15 border-b border-white/20 pb-4">
                  <CardTitle className="text-white drop-shadow-md font-semibold">Parameter Comparison</CardTitle>
                  <CardDescription className="text-cyan-100 mt-1">Comparative analysis of oceanographic parameters</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="white-chart-container h-full p-4">
                    <ParameterChart floats={filteredFloats} parameter={filters.parameter} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
