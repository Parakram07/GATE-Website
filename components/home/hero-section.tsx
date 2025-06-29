"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-start">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop)",
        }}
      >
        <div className="absolute inset-0 bg-blue-800 bg-opacity-60"></div>
      </div>

      <div className="relative z-10 text-left text-white max-w-4xl mx-8 pl-10">
        <motion.h1
          className="font-serif text-4xl md:text-6xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span>Where Hospitality</span>
          <br />
          <span>Meets Excellence</span>
        </motion.h1>

        <motion.h2
          className="font-serif text-2xl md:text-4xl font-bold mb-4 text-yellow-400"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Empowering Future Leaders
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl mb-4 text-blue-100" // Reduced mb-8 to mb-4 to move button up
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The best and leading Hospitality Management college in Nepal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-lg px-8 py-3">
            <Link href="/admissions"><b>Apply Now</b></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}