"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

interface Testimonial {
  id: string
  quote: string
  author_name: string
  author_photo_url: string
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase.from("testimonials").select("*").eq("is_visible", true)

      if (error) {
        console.error("Error fetching testimonials:", error)
        setTestimonials([])
      } else {
        setTestimonials(data || [])
      }
    } catch (error) {
      console.error("Unexpected error fetching testimonials:", error)
      setTestimonials([])
    } finally {
      setLoading(false)
    }
  }

  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }
  }

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            <p className="mt-4">Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-blue-200">No testimonials available at the moment.</p>
          </motion.div>
        </div>
      </section>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 bg-blue-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
        </motion.div>

        <div className="relative">
          <motion.div
            key={currentIndex}
            className="text-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <blockquote className="text-xl md:text-2xl italic mb-8">"{currentTestimonial.quote}"</blockquote>
            <div className="flex items-center justify-center space-x-4">
              <img
                src={currentTestimonial.author_photo_url || "/placeholder.svg?height=60&width=60"}
                alt={currentTestimonial.author_name}
                className="w-15 h-15 rounded-full"
              />
              <div>
                <div className="font-semibold text-lg">{currentTestimonial.author_name}</div>
                <div className="text-blue-200">GATE College Graduate</div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-800"
              disabled={testimonials.length <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-white" : "bg-blue-600"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-800"
              disabled={testimonials.length <= 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
