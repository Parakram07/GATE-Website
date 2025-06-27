"use client"

import { motion } from "framer-motion"

export function TuitionSection() {
  const tuitionData = [
    {
      category: "In-State Tuition",
      undergraduate: "$12,000",
      graduate: "$15,000",
    },
    {
      category: "Out-of-State Tuition",
      undergraduate: "$25,000",
      graduate: "$30,000",
    },
    {
      category: "Room & Board",
      undergraduate: "$8,000",
      graduate: "$10,000",
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
          <h2 className="font-serif text-3xl font-bold text-blue-800 mb-4">Tuition & Financial Aid</h2>
          <p className="text-xl text-gray-600">Affordable education with comprehensive financial support</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-sm overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Undergraduate</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Graduate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tuitionData.map((row, index) => (
                  <tr key={row.category} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.undergraduate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.graduate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4">
            We offer various scholarship and financial aid opportunities to help make education accessible.
          </p>
          <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium">
            Learn About Scholarships →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
