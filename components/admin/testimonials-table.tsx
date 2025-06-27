"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit, Trash2, Eye, EyeOff, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Testimonial {
  id: string
  quote: string
  author_name: string
  author_photo_url: string
  is_visible: boolean
}

interface TestimonialsTableProps {
  testimonials: Testimonial[]
  onEdit: (testimonial: Testimonial) => void
  onDelete: (id: string) => void
  onToggleVisibility: (id: string, currentStatus: boolean) => void
}

export function TestimonialsTable({ testimonials, onEdit, onDelete, onToggleVisibility }: TestimonialsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      testimonial.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.quote.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTestimonials = filteredTestimonials.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTestimonials.map((testimonial, index) => (
              <motion.tr
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={testimonial.author_photo_url || "/placeholder.svg?height=40&width=40"}
                      alt={testimonial.author_name}
                      className="h-10 w-10 rounded-full mr-3 object-cover"
                    />
                    <div className="text-sm font-medium text-gray-900">{testimonial.author_name}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-md truncate">"{testimonial.quote}"</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={testimonial.is_visible ? "default" : "secondary"}>
                    {testimonial.is_visible ? "Visible" : "Hidden"}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleVisibility(testimonial.id, testimonial.is_visible)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {testimonial.is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(testimonial)}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(testimonial.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTestimonials.length)} of{" "}
              {filteredTestimonials.length} results
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentTestimonials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No testimonials found.</p>
        </div>
      )}
    </div>
  )
}
