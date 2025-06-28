"use client"

import { motion } from "framer-motion"
import { GraduationCap, Users, Briefcase } from "lucide-react"

export function WhyChooseUsSection() {
  const features = [
    {
      icon: GraduationCap,
      title: "Academic Excellence",
      description:
        "World-class faculty and cutting-edge curriculum designed to prepare you for success in your chosen field.",
    },
    {
      icon: Users,
      title: "Vibrant Community",
      description: "Join a diverse community of learners, innovators, and future leaders from around the world.",
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description: "Strong industry connections and comprehensive career services to launch your professional journey.",
    },
  ]

 return (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-blue-800 mb-4">Why Choose GATE?</h2>
        <p className="text-xl text-gray-600">
          At GATE College, we pride ourselves on offering our students a transformative and unparalleled educational experience. Nestled on a picturesque campus, our institution stands as a beacon of academic excellence, fostering an environment that promotes holistic growth, creativity, and innovation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <feature.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-serif text-xl font-bold text-blue-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)
}
