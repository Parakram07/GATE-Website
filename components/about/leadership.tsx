"use client"

import { motion } from "framer-motion"

export function Leadership() {
  const leaders = [
    {
      name: "Khem R. Lakai",
      title: "Founder / Chief Executive Officer (CEO)",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      bio: "Leading GATE College with over 20 years of experience in higher education administration.",
    },
    {
      name: "Jeevan J. Rana",
      title: "Director of Admin & Archive",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Renowned researcher in sustainable technology with numerous publications and patents.",
    },
    {
      name: "Indu Shah",
      title: "Senior Administrator",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      bio: "Expert in interdisciplinary education and community engagement initiatives.",
    },
    {
      name: "Mohan Dangol",
      title: "F&B Manager",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
      bio: "Former industry executive with expertise in entrepreneurship and innovation.",
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
          <h2 className="font-serif text-3xl font-bold text-blue-800 mb-4">Leadership Team</h2>
          <p className="text-xl text-gray-600">Meet the visionary leaders guiding GATE College's mission</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={leader.image || "/placeholder.svg"}
                alt={leader.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-serif text-lg font-bold text-blue-800 mb-1">{leader.name}</h3>
              <p className="text-yellow-600 font-medium mb-3">{leader.title}</p>
              <p className="text-gray-600 text-sm">{leader.bio}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="/placeholder-annual-report.pdf"
            className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Annual Report →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
