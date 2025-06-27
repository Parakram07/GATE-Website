"use client"

import { motion } from "framer-motion"

export function History() {
  const milestones = [
    {
      year: "1970",
      title: "Foundation",
      description: "GATE College was founded with a vision to provide quality education and foster innovation.",
    },
    {
      year: "1990",
      title: "First Major Expansion",
      description: "Added new academic buildings and expanded program offerings to serve more students.",
    },
    {
      year: "2010",
      title: "Modern Campus Development",
      description: "Completed state-of-the-art facilities including research centers and student housing.",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched comprehensive online learning platforms and hybrid education models.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl font-bold text-blue-800 mb-4">Our History</h2>
          <p className="text-xl text-gray-600">Over five decades of educational excellence and innovation</p>
        </motion.div>

        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              className="flex items-start space-x-6"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0 w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{milestone.year}</span>
              </div>
              <div className="flex-grow">
                <h3 className="font-serif text-xl font-bold text-blue-800 mb-2">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
