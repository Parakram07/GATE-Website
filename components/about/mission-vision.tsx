"use client"

import { motion } from "framer-motion"

export function MissionVision() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl font-bold text-blue-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At GATE College, our mission is to provide transformative educational experiences that empower students to
              become innovative leaders, critical thinkers, and engaged global citizens. We are committed to academic
              excellence, fostering creativity, and building a diverse community that values integrity, collaboration,
              and lifelong learning.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl font-bold text-blue-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be a globally recognized institution that shapes the future through innovative education,
              groundbreaking research, and meaningful community engagement. We envision a world where our graduates lead
              positive change, drive innovation, and contribute to solving the world's most pressing challenges.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
