import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BarChart3, Bot, Map, Search, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-teal-800/30 to-green-900/20">
          <div className="absolute inset-0 bg-[url('/placeholder-n7h3g.png')] bg-cover bg-center opacity-30" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float" />
          <div
            className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/10 rounded-full blur-lg animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-3/4 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent animate-pulse">
              Explore the Ocean's
            </span>
            <br />
            <span className="text-foreground">Hidden Data</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Dive deep into ARGO float data with interactive visualizations, AI-powered insights, and real-time ocean
            exploration tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group relative overflow-hidden">
              <Link href="/explore">
                Start Exploring
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="glass bg-card/50 hover:bg-card/70">
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>

        {/* Wave Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent">
          <svg
            className="absolute bottom-0 w-full h-16 text-background"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="currentColor" className="animate-wave" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Powerful Ocean Data Tools</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Access comprehensive oceanographic data through our suite of interactive tools and AI-powered analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 glass bg-card/60 hover:bg-card/80 transition-all duration-300 group border-border/50">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Data Exploration</h3>
              </div>
              <p className="text-muted-foreground">
                Browse and filter ARGO float data with advanced search capabilities and timeline navigation.
              </p>
            </Card>

            <Card className="p-6 glass bg-card/60 hover:bg-card/80 transition-all duration-300 group border-border/50">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Map className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Interactive Maps</h3>
              </div>
              <p className="text-muted-foreground">
                Visualize ARGO float positions on interactive maps with real-time data overlays and tooltips.
              </p>
            </Card>

            <Card className="p-6 glass bg-card/60 hover:bg-card/80 transition-all duration-300 group border-border/50">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Data Visualization</h3>
              </div>
              <p className="text-muted-foreground">
                Create dynamic charts and graphs to analyze depth-time profiles and parameter comparisons.
              </p>
            </Card>

            <Card className="p-6 glass bg-card/60 hover:bg-card/80 transition-all duration-300 group border-border/50">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <Bot className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold ml-4">AI Assistant</h3>
              </div>
              <p className="text-muted-foreground">
                Get intelligent insights and answers about ocean data through our AI-powered chatbot interface.
              </p>
            </Card>

            <Card className="p-6 glass bg-card/60 hover:bg-card/80 transition-all duration-300 group border-border/50">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Collaboration</h3>
              </div>
              <p className="text-muted-foreground">
                Share discoveries and collaborate with researchers worldwide through our platform.
              </p>
            </Card>

            <Card className="p-6 glass bg-card/60 hover:bg-card/80 transition-all duration-300 group border-border/50">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                  <BarChart3 className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Real-time Updates</h3>
              </div>
              <p className="text-muted-foreground">
                Access the latest oceanographic data with real-time updates from ARGO float networks.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
