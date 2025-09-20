"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface Float {
  id: string
  temperature: number
  salinity: number
  pressure: number
  status: string
}

interface ParameterChartProps {
  floats: Float[]
  parameter: string
}

export function ParameterChart({ floats, parameter }: ParameterChartProps) {
  const chartData = floats.map((float) => ({
    id: float.id,
    temperature: float.temperature,
    salinity: float.salinity,
    pressure: float.pressure / 100, // Convert to easier scale
    status: float.status,
  }))

  const getParameterLabel = (param: string) => {
    switch (param) {
      case "temperature":
        return "Temperature (°C)"
      case "salinity":
        return "Salinity (PSU)"
      case "pressure":
        return "Pressure (100 dbar)"
      default:
        return "Value"
    }
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="id" className="text-muted-foreground" tick={{ fontSize: 12 }} />
          <YAxis
            label={{ value: getParameterLabel(parameter), angle: -90, position: "insideLeft" }}
            className="text-muted-foreground"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              backdropFilter: "blur(10px)",
            }}
            formatter={(value: number, name: string) => [
              `${value}${parameter === "temperature" ? "°C" : parameter === "salinity" ? " PSU" : " dbar"}`,
              name.charAt(0).toUpperCase() + name.slice(1),
            ]}
          />
          <Legend />
          <Bar
            dataKey={parameter}
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
            name={parameter.charAt(0).toUpperCase() + parameter.slice(1)}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
