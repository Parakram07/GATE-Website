"use client"

import { motion } from "framer-motion"
import { BookOpen, Microscope, Users, Globe } from "lucide-react"

export function ResourcesSection() {
  const resources = [
    {
      icon: BookOpen,
      title: "Library & Archives",
      description: "Access to over 500,000 books, journals, and digital resources.",
      link: "#",
    },
    {
      icon: Microscope,
      title: "Research Centers",
      description: "State-of-the-art facilities for cutting-edge research and innovation.",
      link: "#",
    },
    {
      icon: Users,
      title: "Study Groups",
      description: "Collaborative learning spaces and peer tutoring programs.",
      link: "#",
    },
    {
      icon: Globe,
      title: "Online Learning",
      description: "Comprehensive digital learning platform and virtual classrooms.",
      link: "#",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl font-bold text-blue-800 mb-4">Academic Resources</h2>
          <p className="text-xl text-gray-600">Everything you need to succeed in your academic journey</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.title}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <resource.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-lg font-bold text-blue-800 mb-3">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <a href={resource.link} className="text-yellow-600 hover:text-yellow-700 font-medium">
                Learn More →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
