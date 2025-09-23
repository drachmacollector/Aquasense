"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/theme-toggle"
import { Send, Bot, User, Sparkles, Droplets } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const suggestedQueries = [
  "What are ARGO floats?",
  "Show me temperature data for the Pacific Ocean",
  "How do ocean currents affect climate?",
  "What's the deepest ARGO measurement?",
  "Explain salinity variations",
  "Show recent data from the Atlantic",
  "What causes ocean acidification?",
  "How accurate are ARGO measurements?",
  "Compare temperature trends by region",
  "What is the thermohaline circulation?",
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your ocean data assistant. I can help you explore ARGO float data, explain oceanographic concepts, and answer questions about marine science. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [droplets, setDroplets] = useState<Array<{ id: number; x: number; delay: number }>>([])

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

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

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(
      () => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: generateBotResponse(content),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    )
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("argo") || input.includes("float")) {
      return "ARGO floats are autonomous oceanographic instruments that drift with ocean currents and measure temperature, salinity, and pressure profiles. There are over 4,000 active floats worldwide, providing crucial data for climate research and weather prediction."
    }

    if (input.includes("temperature")) {
      return "Ocean temperature varies significantly with depth and location. Surface temperatures range from -2°C in polar regions to 30°C in tropical areas. The thermocline, typically between 200-1000m depth, shows rapid temperature changes. Would you like to see specific temperature data for a particular region?"
    }

    if (input.includes("salinity")) {
      return "Ocean salinity measures dissolved salt content, typically 34-37 practical salinity units (PSU). It's affected by evaporation, precipitation, ice formation, and freshwater input. Salinity influences water density and ocean circulation patterns."
    }

    if (input.includes("current") || input.includes("circulation")) {
      return "Ocean currents are driven by wind, temperature, salinity differences, and Earth's rotation. Major currents like the Gulf Stream transport heat globally, affecting regional climates. The thermohaline circulation acts as a global conveyor belt, mixing deep and surface waters."
    }

    if (input.includes("climate") || input.includes("weather")) {
      return "Oceans play a crucial role in climate regulation by storing and transporting heat, absorbing CO2, and influencing weather patterns. Ocean-atmosphere interactions drive phenomena like El Niño, monsoons, and hurricane formation."
    }

    return "That's an interesting question about ocean science! I can help you explore ARGO data, explain oceanographic processes, or discuss marine research topics. Could you be more specific about what aspect you'd like to learn about?"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  const handleSuggestedQuery = (query: string) => {
    handleSendMessage(query)
  }

  const skyOffset = scrollY * 0.1
  const surfaceOffset = scrollY * 0.3
  const deepOffset = scrollY * 0.5

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Parallax Background Layers */}
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

      {/* Animated Droplets */}
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

      <div className="relative z-20 max-w-7xl mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Droplets className="h-8 w-8 text-blue-400 animate-pulse" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg animate-ping" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
                  AquaSense
                </span>
                <span className="text-white/90 ml-2">Assistant</span>
              </h1>
              <p className="text-sm text-blue-200/80">AI-powered oceanographic insights</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex-1 grid lg:grid-cols-4 gap-6 min-h-0">
          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col min-h-0">
            <Card className="flex-1 glass bg-blue-900/30 border-blue-400/20 backdrop-blur-sm flex flex-col min-h-0">
              {/* Messages */}
              <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-300",
                        message.sender === "user" ? "flex-row-reverse space-x-reverse" : "",
                      )}
                    >
                      {/* Avatar */}
                      <div
                        className={cn(
                          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                          message.sender === "user" ? "bg-blue-500/80 text-white" : "bg-cyan-500/80 text-white",
                        )}
                      >
                        {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-3 glass backdrop-blur-sm",
                          message.sender === "user"
                            ? "bg-blue-600/20 border border-blue-400/30 text-white"
                            : "bg-blue-800/30 border border-blue-400/20 text-white",
                        )}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs text-blue-200/60 mt-2">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-300">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/80 text-white flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="max-w-[80%] rounded-2xl px-4 py-3 glass bg-blue-800/30 border border-blue-400/20 backdrop-blur-sm">
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                          <span className="text-xs text-blue-200/80 ml-2">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t border-blue-400/20 p-4">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about ocean data, ARGO floats, or marine science..."
                    className="flex-1 glass bg-blue-800/20 border-blue-400/30 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 text-white placeholder:text-blue-200/60"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          {/* Suggested Queries Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="glass bg-blue-900/30 border-blue-400/20 backdrop-blur-sm p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                <h3 className="font-semibold text-white">Suggested Questions</h3>
              </div>
              <div className="space-y-2">
                {suggestedQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left h-auto p-3 glass bg-blue-800/20 hover:bg-blue-700/30 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 text-white "
                    onClick={() => handleSuggestedQuery(query)}
                    disabled={isTyping}
                  >
                    <span className="text-sm text-blue-200/80 leading-relaxed text-wrap">{query}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="glass bg-blue-900/30 border-blue-400/20 backdrop-blur-sm p-4">
              <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start glass bg-blue-800/20 hover:bg-blue-700/30 border-blue-400/20 text-white"
                  onClick={() => handleSuggestedQuery("Clear conversation")}
                >
                  Clear Chat
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start glass bg-blue-800/20 hover:bg-blue-700/30 border-blue-400/20 text-white"
                  onClick={() => handleSuggestedQuery("Show me data visualization examples")}
                >
                  View Examples
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start glass bg-blue-800/20 hover:bg-blue-700/30 border-blue-400/20 text-white"
                  onClick={() => handleSuggestedQuery("Help me understand ARGO data")}
                >
                  Get Help
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
