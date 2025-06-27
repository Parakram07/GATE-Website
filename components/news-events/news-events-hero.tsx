"use client"

import { motion } from "framer-motion"

export function NewsEventsHero() {
  return (
    <section className="relative h-96 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1920&h=600&fit=crop)",
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
          News & Events
        </motion.h1>
        <motion.p
          className="text-xl text-blue-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Stay connected with the latest happenings at GATE College
        </motion.p>
      </div>
    </section>
  )
}
