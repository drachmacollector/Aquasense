"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock depth-time data
const mockDepthData = [
  { depth: 0, temperature: 24.5, salinity: 35.2, time: "00:00" },
  { depth: 50, temperature: 22.1, salinity: 35.4, time: "02:00" },
  { depth: 100, temperature: 18.7, salinity: 35.6, time: "04:00" },
  { depth: 200, temperature: 15.2, salinity: 35.8, time: "06:00" },
  { depth: 500, temperature: 8.9, salinity: 34.9, time: "08:00" },
  { depth: 1000, temperature: 4.2, salinity: 34.7, time: "10:00" },
  { depth: 1500, temperature: 2.8, salinity: 34.6, time: "12:00" },
  { depth: 2000, temperature: 1.9, salinity: 34.5, time: "14:00" },
]

interface DepthChartProps {
  selectedFloat: string | null
}

export function DepthChart({ selectedFloat }: DepthChartProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockDepthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis
            dataKey="depth"
            label={{ value: "Depth (m)", position: "insideBottom", offset: -5 }}
            className="text-muted-foreground"
          />
          <YAxis
            yAxisId="temp"
            orientation="left"
            label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft" }}
            className="text-muted-foreground"
          />
          <YAxis
            yAxisId="sal"
            orientation="right"
            label={{ value: "Salinity (PSU)", angle: 90, position: "insideRight" }}
            className="text-muted-foreground"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              backdropFilter: "blur(10px)",
            }}
          />
          <Legend />
          <Line
            yAxisId="temp"
            type="monotone"
            dataKey="temperature"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "hsl(var(--chart-1))", strokeWidth: 2 }}
            name="Temperature"
          />
          <Line
            yAxisId="sal"
            type="monotone"
            dataKey="salinity"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "hsl(var(--chart-2))", strokeWidth: 2 }}
            name="Salinity"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
