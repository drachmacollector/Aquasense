"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Chrome, Waves } from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newRipple = { id: Date.now(), x, y }

    setRipples((prev) => [...prev, newRipple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate signup process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 dark:from-slate-900 dark:via-blue-950 dark:to-cyan-950">
        <div className="absolute inset-0 bg-[url('/abstract-ocean-waves.png')] bg-cover bg-center opacity-30" />
        {/* Animated water droplets */}
        <div className="absolute top-10 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-droplet" />
        <div
          className="absolute top-20 right-1/3 w-1 h-1 bg-cyan-400/60 rounded-full animate-droplet"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-32 left-1/2 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-droplet"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/6 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 left-1/6 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/2 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Signup Card */}
      <Card className="w-full max-w-md glass-strong bg-card/70 border-border/30 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Waves className="h-12 w-12 text-primary animate-wave" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 bg-clip-text text-transparent">
            Join FloatChat
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create your account to start exploring ocean data
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </Label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-10 glass bg-input/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-input/70 transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
                  required
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 glass bg-input/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-input/70 transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
                  required
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="pl-10 pr-10 glass bg-input/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-input/70 transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                  )}
                </Button>
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 glass bg-input/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:bg-input/70 transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                  )}
                </Button>
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" className="mt-1" />
              <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:text-accent transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-full relative overflow-hidden group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isLoading}
              onClick={handleRipple}
            >
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
                  style={{
                    left: ripple.x - 10,
                    top: ripple.y - 10,
                    width: 20,
                    height: 20,
                  }}
                />
              ))}
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <Separator className="bg-border/50" />
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-sm text-muted-foreground">
              or continue with
            </span>
          </div>

          {/* Google Sign Up */}
          <Button
            variant="outline"
            className="w-full glass bg-card/30 border-border/50 hover:bg-card/50 hover:border-border/70 transition-all duration-300 group relative overflow-hidden"
            onClick={handleRipple}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute bg-primary/20 rounded-full animate-ripple pointer-events-none"
                style={{
                  left: ripple.x - 10,
                  top: ripple.y - 10,
                  width: 20,
                  height: 20,
                }}
              />
            ))}
            <Chrome className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />
            Continue with Google
          </Button>

          {/* Sign In Link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary hover:text-accent transition-colors font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
