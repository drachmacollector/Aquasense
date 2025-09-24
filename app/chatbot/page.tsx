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
  const [messageCount, setMessageCount] = useState(1)
  const [isMounted, setIsMounted] = useState(false)
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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle scroll effects with performance optimization
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)

          // Generate droplets on scroll with better performance
          if (window.scrollY > 50 && Math.random() > 0.98) {
            const newDroplet = {
              id: Date.now(),
              x: Math.random() * window.innerWidth,
              delay: Math.random() * 2,
            }
            setDroplets((prev) => {
              // Keep only last 5 droplets to prevent memory leaks
              const updated = [...prev.slice(-4), newDroplet]
              return updated
            })
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cleanup old droplets
  useEffect(() => {
    const cleanup = setInterval(() => {
      setDroplets(prev => prev.filter(droplet => Date.now() - droplet.id < 5000))
    }, 5000)
    
    return () => clearInterval(cleanup)
  }, [])

  // Focus input on mount and handle hydration
  useEffect(() => {
    setIsMounted(true)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Safe timestamp formatter to avoid hydration issues
  const formatTimestamp = (timestamp: Date) => {
    // Use a consistent 24-hour format that works the same on server and client
    const hours = timestamp.getHours().toString().padStart(2, '0')
    const minutes = timestamp.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isTyping) return

    setMessageCount(prev => prev + 1)
    
    const userMessage: Message = {
      id: `user-${messageCount}`,
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Focus back to input after slight delay
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    try {
      // Simulate bot response with better timing
      const responseDelay = Math.min(content.length * 20 + 500, 2000) // Response time based on input length
      
      setTimeout(
        () => {
          const botMessage: Message = {
            id: `bot-${messageCount}`,
            content: generateBotResponse(content),
            sender: "bot",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, botMessage])
          setIsTyping(false)
        },
        responseDelay,
      )
    } catch (error) {
      console.error('Error generating response:', error)
      const errorMessage: Message = {
        id: `error-${messageCount}`,
        content: "I apologize, but I encountered an error processing your message. Please try asking your question again.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsTyping(false)
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        content:
          "Hello! I'm your ocean data assistant. I can help you explore ARGO float data, explain oceanographic concepts, and answer questions about marine science. What would you like to know?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
    setMessageCount(1)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    // Handle special commands
    if (input.includes("clear conversation") || input.includes("clear chat")) {
      clearChat()
      return "I've cleared our conversation. How can I help you with ocean science today?"
    }

    if (input.includes("help me understand argo data") || input.includes("get help")) {
      return "I can help you understand ARGO data! ARGO floats collect temperature, salinity, and pressure measurements from the ocean. You can ask me about specific parameters, regions, or how the data is collected. Try asking about 'temperature profiles', 'salinity variations', or 'ocean currents'."
    }

    if (input.includes("data visualization examples") || input.includes("view examples")) {
      return "Here are some types of ocean data visualizations I can help you understand:\n\n• Temperature depth profiles\n• Salinity vs depth charts\n• Ocean current maps\n• Time series of temperature changes\n• Regional comparison plots\n\nWhat specific type of visualization interests you most?"
    }

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

    if (input.includes("deepest") || input.includes("depth")) {
      return "ARGO floats typically profile to depths of 2000 meters, though some can go deeper. The deepest measurements come from Deep ARGO floats that can reach 4000-6000 meters. These deep measurements help us understand abyssal circulation and deep water formation."
    }

    if (input.includes("pacific ocean")) {
      return "The Pacific Ocean is the largest ocean basin, showing diverse temperature patterns. The equatorial Pacific exhibits strong El Niño/La Niña cycles. Would you like to know about specific regions like the North Pacific, tropical Pacific, or Southern Ocean sectors?"
    }

    if (input.includes("atlantic")) {
      return "The Atlantic Ocean plays a key role in global climate through the Atlantic Meridional Overturning Circulation (AMOC). It shows strong north-south temperature gradients and is crucial for heat transport to Europe. Recent data shows interesting changes in deep water formation."
    }

    if (input.includes("acidification")) {
      return "Ocean acidification occurs as seawater absorbs CO2 from the atmosphere, lowering pH. This affects marine ecosystems, especially shell-forming organisms. ARGO biogeochemical floats now measure pH, oxygen, and other chemical parameters alongside temperature and salinity."
    }

    if (input.includes("accuracy") || input.includes("accurate")) {
      return "ARGO measurements are highly accurate: temperature ±0.002°C, salinity ±0.01 PSU, and pressure ±2.4 dbar. Data undergoes rigorous quality control including real-time and delayed-mode processing. This accuracy makes ARGO the gold standard for ocean observations."
    }

    return "That's an interesting question about ocean science! I can help you explore ARGO data, explain oceanographic processes, or discuss marine research topics. Could you be more specific about what aspect you'd like to learn about?"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  const handleSuggestedQuery = (query: string) => {
    // Handle special actions
    if (query === "Clear conversation") {
      clearChat()
      return
    }
    handleSendMessage(query)
  }

  // Enhanced keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const skyOffset = scrollY * 0.1
  const surfaceOffset = scrollY * 0.3
  const deepOffset = scrollY * 0.5

  return (
    <div className="min-h-screen overflow-x-hidden" role="application" aria-label="Ocean Data Chatbot">
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

      <div className="relative z-20 max-w-7xl mx-auto p-4 min-h-screen flex flex-col lg:h-screen">
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
                  FloatChat
                </span>
                <span className="text-white/90 ml-2">Assistant</span>
              </h1>
              <p className="text-sm text-blue-200/80">AI-powered oceanographic insights</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex-1 grid lg:grid-cols-4 gap-6 min-h-0 lg:max-h-[calc(100vh-8rem)]">
          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col min-h-0">
            <Card 
              className="flex-1 glass bg-blue-900/30 border-blue-400/20 backdrop-blur-sm flex flex-col min-h-0 min-h-[500px] lg:min-h-0"
              role="log"
              aria-label="Chat conversation"
              aria-live="polite"
            >
              {/* Messages */}
              <ScrollArea 
                ref={scrollAreaRef} 
                className="flex-1 p-4"
                aria-label="Chat messages"
              >
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
                        role="article"
                        aria-label={`${message.sender === "user" ? "Your" : "Assistant"} message`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                        {isMounted && (
                          <p className="text-xs text-blue-200/60 mt-2">
                            {formatTimestamp(message.timestamp)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-300">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/80 text-white flex items-center justify-center">
                        <Bot className="h-4 w-4 animate-pulse" />
                      </div>
                      <div className="max-w-[80%] rounded-2xl px-4 py-3 glass bg-blue-800/30 border border-blue-400/20 backdrop-blur-sm">
                        <div className="flex items-center space-x-2">
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
                          <span className="text-xs text-blue-200/80">Analyzing ocean data...</span>
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
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about ocean data, ARGO floats, or marine science..."
                    className="flex-1 glass bg-blue-800/20 border-blue-400/30 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 text-white placeholder:text-blue-200/60"
                    disabled={isTyping}
                    aria-label="Type your message here"
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          {/* Suggested Queries Sidebar */}
          <div className="lg:col-span-1 space-y-4 overflow-y-auto max-h-[600px] lg:max-h-full">
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
                    className="w-full justify-start text-left h-auto p-3 glass bg-blue-800/20 hover:bg-blue-700/30 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 text-white disabled:opacity-50"
                    onClick={() => handleSuggestedQuery(query)}
                    disabled={isTyping}
                    aria-label={`Ask: ${query}`}
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
                  aria-label="Clear chat conversation"
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
