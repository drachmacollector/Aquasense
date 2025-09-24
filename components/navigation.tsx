"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Waves } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Chatbot", href: "/chatbot" },
  { name: "About Us", href: "/about" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-auto animate-float-dock">
      <div className="relative bg-black/40 backdrop-blur-md rounded-2xl px-6 py-3 transition-all duration-300 hover:shadow-2xl border border-white/20">
        {/* Enhanced glassmorphic background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/15 to-teal-500/10 rounded-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/8 to-transparent rounded-2xl"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        
        <div className="relative flex items-center space-x-1">
          {/* Logo - Compact for dock */}
          <Link href="/" className="flex items-center group mr-4">
            <div className="relative">
              <Waves className="h-6 w-6 text-white group-hover:animate-wave transition-all duration-300 drop-shadow-lg" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
            </div>
            <span className="ml-2 text-lg font-bold text-white drop-shadow-lg hidden sm:inline">
              FloatChat
            </span>
          </Link>

          {/* Desktop Navigation - Dock Style */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group hover:scale-105 drop-shadow-lg",
                  pathname === item.href 
                    ? "bg-white/25 text-white shadow-lg backdrop-blur-sm border border-white/40" 
                    : "text-white/90 hover:text-white hover:bg-white/15",
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {pathname === item.href && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl" />
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                  </>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation - Floating Hamburger */}
          <div className="md:hidden ml-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative bg-white/15 hover:bg-white/25 rounded-xl border border-white/30 p-2 transition-all duration-300 hover:scale-105 drop-shadow-lg"
                >
                  <Menu className="h-5 w-5 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl border-white/20 dark:border-gray-700/30"
              >
                <div className="flex flex-col space-y-3 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 backdrop-blur-sm",
                        pathname === item.href
                          ? "bg-white/20 dark:bg-white/10 text-blue-600 dark:text-blue-400 border border-white/30 shadow-lg"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/10 dark:hover:bg-white/5",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
