"use client"

import { motion } from "framer-motion"
import { FileText, Users, GraduationCap, CheckCircle } from "lucide-react"

export function ApplicationProcess() {
  const steps = [
    {
      icon: FileText,
      title: "Submit Application",
      description: "Complete your online application with all required documents and transcripts.",
    },
    {
      icon: Users,
      title: "Interview",
      description: "Participate in an interview with our admissions committee.",
    },
    {
      icon: GraduationCap,
      title: "Review Process",
      description: "Our team reviews your application and academic qualifications.",
    },
    {
      icon: CheckCircle,
      title: "Decision",
      description: "Receive your admission decision and enrollment information.",
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
          <h2 className="font-serif text-3xl font-bold text-blue-800 mb-4">Application Process</h2>
          <p className="text-xl text-gray-600">Follow these simple steps to join our community</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-8 w-8 text-white" />
              </div>
              <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-blue-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
