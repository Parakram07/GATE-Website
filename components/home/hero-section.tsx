"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop)",
        }}
      >
        <div className="absolute inset-0 bg-blue-800 bg-opacity-60"></div>
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <motion.h1
          className="font-serif text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Where Hospitality Meets Excellence: Empowering Future Leaders
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-blue-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The best and leading Hospitality Management college(BHM) in Nepal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button asChild size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg px-8 py-3">
            <Link href="/admissions">Apply Now</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
