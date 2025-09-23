"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Waves, Users, Target, Award, Globe, Database, BarChart3 } from "lucide-react"

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [droplets, setDroplets] = useState<Array<{ id: number; left: number; delay: number }>>([])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "90%"])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Generate droplets on scroll
      if (Math.random() > 0.95) {
        const newDroplet = {
          id: Date.now(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
        }
        setDroplets((prev) => [...prev.slice(-10), newDroplet])
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // const teamMembers = [
  //   {
  //     name: "Dr. Marina Ocean",
  //     role: "Lead Oceanographer",
  //     expertise: "Physical Oceanography",
  //     image: "/placeholder-acbwn.png",
  //   },
  //   {
  //     name: "Prof. David Current",
  //     role: "Data Science Director",
  //     expertise: "Marine Data Analytics",
  //     image: "/professional-data-scientist-man.jpg",
  //   },
  //   {
  //     name: "Dr. Sarah Depth",
  //     role: "Research Coordinator",
  //     expertise: "Climate Modeling",
  //     image: "/placeholder-rq87l.png",
  //   },
  //   {
  //     name: "Alex Wave",
  //     role: "Technology Lead",
  //     expertise: "Ocean Sensors & IoT",
  //     image: "/placeholder-cbobm.png",
  //   },
  // ]

  const achievements = [
    { icon: Database, number: "50M+", label: "Data Points Collected" },
    { icon: Globe, number: "120+", label: "Countries Covered" },
    { icon: BarChart3, number: "15+", label: "Years of Research" },
    { icon: Award, number: "25+", label: "Scientific Publications" },
  ]

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        {/* Sky Layer */}
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-300 to-ocean-200"
        />

        {/* Ocean Surface Layer */}
        <motion.div
          style={{ y: y2 }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-300/50 to-ocean-400/70"
        />

        {/* Deep Ocean Layer */}
        <motion.div
          style={{ y: y3 }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ocean-800/80"
        />
      </div>

      <div className="fixed inset-0 pointer-events-none z-10">
        {droplets.map((droplet) => (
          <motion.div
            key={droplet.id}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: window.innerHeight + 10, opacity: [0, 1, 0] }}
            transition={{ duration: 3, delay: droplet.delay }}
            className="absolute w-1 h-4 bg-gradient-to-b from-ocean-300 to-ocean-500 rounded-full"
            style={{ left: `${droplet.left}%` }}
            onAnimationComplete={() => {
              setDroplets((prev) => prev.filter((d) => d.id !== droplet.id))
            }}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full z-20 pointer-events-none">
        <svg className="w-full h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
            fill="rgba(59, 130, 246, 0.3)"
            className="animate-wave"
          />
          <motion.path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V120H0Z"
            fill="rgba(59, 130, 246, 0.2)"
            className="animate-wave-reverse"
          />
        </svg>
      </div>

      {/* Content with relative positioning */}
      <div className="relative z-30">
        {/* Hero Section with Parallax */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-5xl bg-gradient-to-r from-blue-700 via-cyan-700 to-teal-600 bg-clip-text text-transparent animate-pulse">
                About our Mission
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-ocean-800 via-ocean-600 to-ocean-500 bg-clip-text text-transparent">
                Exploring Our Oceans
              </h1>
              <p className="text-xl md:text-2xl text-ocean-700 max-w-3xl mx-auto leading-relaxed">
                Dedicated to understanding and protecting our planet's most vital resource through cutting-edge research
                and innovative data visualization.
              </p>
            </motion.div>
          </div>

          {/* Floating Wave Animation */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <Waves className="w-12 h-12 text-ocean-600" />
          </motion.div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ocean-800">Our Mission</h2>
              <p className="text-xl text-ocean-700 max-w-3xl mx-auto">
                We harness the power of ARGO float data to provide unprecedented insights into ocean behavior, climate
                patterns, and marine ecosystem health.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Research Excellence",
                  description:
                    "Conducting world-class oceanographic research using state-of-the-art ARGO float technology and advanced data analytics.",
                },
                {
                  icon: Globe,
                  title: "Global Impact",
                  description:
                    "Contributing to international climate research and supporting evidence-based policy decisions for ocean conservation.",
                },
                {
                  icon: Users,
                  title: "Open Science",
                  description:
                    "Making ocean data accessible to researchers, educators, and the public through intuitive visualization tools.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full glass bg-white/20 backdrop-blur-sm border-ocean-300/50 hover:bg-white/30 transition-all duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-ocean-500 to-ocean-700 rounded-full flex items-center justify-center">
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4 text-ocean-800">{item.title}</h3>
                      <p className="text-ocean-700 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 px-4 relative bg-gradient-to-r from-ocean-50/30 to-ocean-100/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ocean-800">Our Impact</h2>
              <p className="text-xl text-ocean-700 max-w-3xl mx-auto">
                Numbers that reflect our commitment to advancing ocean science and making data accessible worldwide.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-ocean-500 to-ocean-700 rounded-full flex items-center justify-center">
                    <achievement.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-ocean-700 mb-2">{achievement.number}</div>
                  <div className="text-ocean-600 font-medium">{achievement.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ocean-800">Meet Our Team</h2>
              <p className="text-xl text-ocean-700 max-w-3xl mx-auto">
                A diverse group of oceanographers, data scientists, and technology experts united by our passion for
                ocean research.
              </p>
            </motion.div>

             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden glass bg-white/20 backdrop-blur-sm border-ocean-300/50 hover:bg-white/30 transition-all duration-300 group">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-semibold mb-2 text-ocean-800">{member.name}</h3>
                      <p className="text-ocean-600 font-medium mb-2">{member.role}</p>
                      <p className="text-sm text-ocean-600">{member.expertise}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Wave Animation Footer */}
        <footer className="relative overflow-hidden bg-gradient-to-b from-ocean-700 to-ocean-900 text-white">
          {/* Animated Wave SVG */}
          <div className="absolute top-0 left-0 w-full overflow-hidden">
            <svg
              className="relative block w-full h-20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                fill="rgba(255,255,255,0.1)"
                animate={{
                  d: [
                    "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
                    "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                    "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                  ],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </div>

          <div className="relative z-10 py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold mb-4 text-slate-900">Ready to Dive Deeper?</h3>
                <p className="text-xl text-ocean-100 mb-8 max-w-2xl mx-auto text-slate-900">
                  Join us in exploring the mysteries of our oceans and contributing to vital climate research.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white text-black text-ocean-600 rounded-full font-semibold hover:bg-ocean-50 transition-colors"
                  >
                    Explore Data
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 border-2 border-white text-black rounded-full font-semibold hover:bg-white hover:text-ocean-600 transition-colors"
                  >
                    Contact Us
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
            <svg
              className="relative block w-full h-16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                fill="rgba(255,255,255,0.05)"
                animate={{
                  d: [
                    "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                    "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                    "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </div>

          <div className="relative z-10 py-8 px-4 border-t border-gray-500/30">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <Waves className="w-6 h-6" />
                <span className="font-semibold text-slate-900">Ocean Data Explorer</span>
              </div>
              <p className="text-ocean-200 text-sm text-slate-900">2025 Ocean Data Explorer. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
