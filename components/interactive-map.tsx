"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Thermometer, Droplets, Gauge } from "lucide-react"

interface Float {
  id: string
  lat: number
  lng: number
  temperature: number
  salinity: number
  pressure: number
  status: string
  lastUpdate: string
  measurements: number
}

interface InteractiveMapProps {
  floats: Float[]
  selectedFloat: string | null
  onFloatSelect: (id: string) => void
}

export function InteractiveMap({ floats, selectedFloat, onFloatSelect }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [hoveredFloat, setHoveredFloat] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  // Convert lat/lng to pixel coordinates (simplified projection)
  const projectCoordinates = (lat: number, lng: number) => {
    const mapWidth = 800
    const mapHeight = 400

    // Simple equirectangular projection
    const x = ((lng + 180) / 360) * mapWidth
    const y = ((90 - lat) / 180) * mapHeight

    return { x, y }
  }

  const handleFloatHover = (float: Float, event: React.MouseEvent) => {
    setHoveredFloat(float.id)
    setTooltipPosition({ x: event.clientX, y: event.clientY })
  }

  const handleFloatLeave = () => {
    setHoveredFloat(null)
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-900/20 via-teal-800/10 to-green-900/20 rounded-lg overflow-hidden">
      {/* Ocean Background */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?key=ocean-map')] bg-cover bg-center opacity-30" />

      {/* Map Container */}
      <div ref={mapRef} className="relative w-full h-full">
        <svg className="w-full h-full" viewBox="0 0 800 400">
          {/* Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-border/30"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Continent Outlines (simplified) */}
          <g className="text-muted-foreground/20" fill="currentColor">
            {/* North America */}
            <path d="M 100 80 Q 150 60 200 80 L 220 120 Q 180 140 140 130 Q 110 110 100 80 Z" />
            {/* Europe */}
            <path d="M 380 70 Q 420 60 450 80 L 460 110 Q 430 120 400 110 Q 370 90 380 70 Z" />
            {/* Africa */}
            <path d="M 420 140 Q 450 130 470 160 L 480 240 Q 450 260 430 240 Q 410 200 420 140 Z" />
            {/* South America */}
            <path d="M 250 200 Q 280 190 300 220 L 310 300 Q 280 320 260 300 Q 240 250 250 200 Z" />
            {/* Asia */}
            <path d="M 500 60 Q 600 50 650 80 L 680 140 Q 620 160 580 140 Q 520 100 500 60 Z" />
            {/* Australia */}
            <path d="M 620 280 Q 680 270 720 290 L 730 320 Q 690 330 650 320 Q 610 300 620 280 Z" />
          </g>

          {/* ARGO Floats */}
          {floats.map((float) => {
            const { x, y } = projectCoordinates(float.lat, float.lng)
            const isSelected = selectedFloat === float.id
            const isHovered = hoveredFloat === float.id

            return (
              <g key={float.id}>
                {/* Float Marker */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 8 : isHovered ? 6 : 4}
                  fill={float.status === "active" ? "#15803d" : "#6b7280"}
                  stroke={isSelected ? "#84cc16" : "white"}
                  strokeWidth={isSelected ? 3 : 2}
                  className="cursor-pointer transition-all duration-300 hover:scale-110"
                  onClick={() => onFloatSelect(float.id)}
                  onMouseEnter={(e) => handleFloatHover(float, e as any)}
                  onMouseLeave={handleFloatLeave}
                />

                {/* Pulse Animation for Active Floats */}
                {float.status === "active" && (
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill="none"
                    stroke="#15803d"
                    strokeWidth="2"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}

                {/* Float ID Label */}
                {(isSelected || isHovered) && (
                  <text
                    x={x}
                    y={y - 15}
                    textAnchor="middle"
                    className="text-xs font-medium fill-foreground"
                    style={{ textShadow: "0 0 4px rgba(0,0,0,0.5)" }}
                  >
                    {float.id}
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* Tooltip */}
        {hoveredFloat && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltipPosition.x + 10,
              top: tooltipPosition.y - 10,
            }}
          >
            <Card className="glass bg-card/90 border-border/50 p-3 shadow-lg">
              {(() => {
                const float = floats.find((f) => f.id === hoveredFloat)
                if (!float) return null

                return (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">{float.id}</span>
                      <Badge variant={float.status === "active" ? "default" : "secondary"} className="text-xs">
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
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Lat: {float.lat.toFixed(2)}°, Lng: {float.lng.toFixed(2)}°
                    </div>
                  </div>
                )
              })()}
            </Card>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 glass bg-card/80 border border-border/50 rounded-lg p-3">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Legend</h4>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-muted-foreground">Active Float</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Inactive Float</span>
          </div>
        </div>
      </div>
    </div>
  )
}
