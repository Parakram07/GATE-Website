"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function AdmissionsHero() {
  return (
    <section className="relative h-96 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=600&fit=crop)",
        }}
      >
        <div className="absolute inset-0 bg-blue-800 bg-opacity-60"></div>
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <motion.h1
          className="font-serif text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Join GATE College
        </motion.h1>
        <motion.p
          className="text-xl text-blue-100 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Start your journey towards academic excellence and career success
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button asChild size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white">
            <a href="https://apply.gatecollege.edu" target="_blank" rel="noopener noreferrer">
              Apply Now
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
