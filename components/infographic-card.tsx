"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface InfographicCardProps {
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
  color: string
  description: string
  trend: string
  delay?: number
}

export function InfographicCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  description,
  trend,
  delay = 0,
}: InfographicCardProps) {
  const colorClasses = {
    primary: "text-primary bg-primary/10 border-primary/20",
    accent: "text-accent bg-accent/10 border-accent/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    green: "text-green-500 bg-green-500/10 border-green-500/20",
  }

  return (
    <Card
      className="glass bg-card/60 border-border/50 hover:bg-card/70 hover:border-border/70 transition-all duration-500 group overflow-hidden relative"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
          <Icon className="w-full h-full" />
        </div>
      </div>

      <CardContent className="p-6 relative z-10">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "p-3 rounded-xl border transition-all duration-300 group-hover:scale-110",
                colorClasses[color as keyof typeof colorClasses],
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <Badge variant="secondary" className="glass bg-card/50 border-border/30 text-xs">
              {trend}
            </Badge>
          </div>

          {/* Main Content */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</h3>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">{value}</p>
              <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000 delay-500",
                  color === "primary" && "bg-primary",
                  color === "accent" && "bg-accent",
                  color === "blue" && "bg-blue-500",
                  color === "green" && "bg-green-500",
                )}
                style={{
                  width: "85%",
                  animationDelay: `${delay + 0.5}s`,
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
