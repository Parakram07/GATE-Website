"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What are the admission requirements?",
      answer:
        "Admission requirements vary by program but generally include a completed application, official transcripts, letters of recommendation, and standardized test scores. Specific requirements are listed on each program page.",
    },
    {
      question: "When is the application deadline?",
      answer:
        "Application deadlines vary by program and semester. Fall semester applications are typically due by March 1st, while Spring semester applications are due by October 1st. Check specific program pages for exact dates.",
    },
    {
      question: "Do you offer financial aid?",
      answer:
        "Yes, we offer various forms of financial aid including scholarships, grants, work-study programs, and student loans. Complete the FAFSA to be considered for federal aid, and check our scholarship page for additional opportunities.",
    },
    {
      question: "Can I visit the campus?",
      answer:
        "We offer campus tours throughout the year. You can schedule a visit through our admissions office or attend one of our open house events. Virtual tours are also available on our website.",
    },
    {
      question: "What support services are available for students?",
      answer:
        "We provide comprehensive support services including academic advising, career counseling, tutoring services, mental health resources, disability services, and student organizations to help you succeed.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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
          <h2 className="font-serif text-3xl font-bold text-blue-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Find answers to common questions about admissions</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-blue-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
