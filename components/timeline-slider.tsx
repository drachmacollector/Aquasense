"use client"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimelineSliderProps {
  periods: string[]
  selectedPeriod: string
  onPeriodChange: (period: string) => void
  isPlaying: boolean
}

export function TimelineSlider({ periods, selectedPeriod, onPeriodChange, isPlaying }: TimelineSliderProps) {
  const currentIndex = periods.indexOf(selectedPeriod)

  const handleSliderChange = (value: number[]) => {
    onPeriodChange(periods[value[0]])
  }

  const goToPrevious = () => {
    const prevIndex = Math.max(0, currentIndex - 1)
    onPeriodChange(periods[prevIndex])
  }

  const goToNext = () => {
    const nextIndex = Math.min(periods.length - 1, currentIndex + 1)
    onPeriodChange(periods[nextIndex])
  }

  return (
    <div className="space-y-6">
      {/* Timeline Visualization */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            disabled={currentIndex === 0 || isPlaying}
            className="hover:bg-muted/50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex-1 mx-4">
            <div className="relative h-2 bg-muted rounded-full">
              {/* Progress bar */}
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / periods.length) * 100}%` }}
              />

              {/* Period markers */}
              {periods.map((period, index) => (
                <button
                  key={period}
                  onClick={() => onPeriodChange(period)}
                  disabled={isPlaying}
                  className={cn(
                    "absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 hover:scale-110",
                    index === currentIndex
                      ? "bg-primary border-primary shadow-lg shadow-primary/50"
                      : "bg-background border-border hover:border-primary/50",
                  )}
                  style={{ left: `${(index / (periods.length - 1)) * 100}%`, marginLeft: "-8px" }}
                />
              ))}
            </div>

            {/* Period labels */}
            <div className="flex justify-between mt-3">
              {periods.map((period, index) => (
                <span
                  key={period}
                  className={cn(
                    "text-xs transition-colors duration-300",
                    index === currentIndex ? "text-primary font-medium" : "text-muted-foreground",
                  )}
                >
                  {new Date(period + "-01").toLocaleDateString("en-US", {
                    month: "short",
                    year: "2-digit",
                  })}
                </span>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            disabled={currentIndex === periods.length - 1 || isPlaying}
            className="hover:bg-muted/50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Slider Alternative */}
      <div className="px-4">
        <Slider
          value={[currentIndex]}
          onValueChange={handleSliderChange}
          max={periods.length - 1}
          step={1}
          disabled={isPlaying}
          className="w-full"
        />
      </div>
    </div>
  )
}
