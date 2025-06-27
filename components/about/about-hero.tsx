"use client"

import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <section className="relative h-96 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=600&fit=crop)",
        }}
      >
        <div className="absolute inset-0 bg-blue-800 bg-opacity-60"></div>
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <motion.h1
          className="font-serif text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About GATE College
        </motion.h1>
      </div>
    </section>
  )
}
