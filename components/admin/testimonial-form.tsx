"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabase"

interface Testimonial {
  id: string
  quote: string
  author_name: string
  author_photo_url: string
  is_visible: boolean
}

interface TestimonialFormProps {
  testimonial?: Testimonial | null
  onClose: () => void
}

export function TestimonialForm({ testimonial, onClose }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    quote: "",
    author_name: "",
    author_photo_url: "",
    is_visible: true,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (testimonial) {
      setFormData({
        quote: testimonial.quote,
        author_name: testimonial.author_name,
        author_photo_url: testimonial.author_photo_url || "",
        is_visible: testimonial.is_visible,
      })
    }
  }, [testimonial])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.quote.trim()) newErrors.quote = "Quote is required"
    if (!formData.author_name.trim()) newErrors.author_name = "Author name is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      if (testimonial) {
        // Update existing testimonial
        const { error } = await supabase.from("testimonials").update(formData).eq("id", testimonial.id)

        if (error) throw error
      } else {
        // Create new testimonial
        const { error } = await supabase.from("testimonials").insert([formData])

        if (error) throw error
      }

      onClose()
    } catch (error) {
      console.error("Error saving testimonial:", error)
      alert("Error saving testimonial")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-serif font-bold text-blue-800">
            {testimonial ? "Edit Testimonial" : "Add Testimonial"}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 mb-2">
              Author Name *
            </label>
            <Input
              type="text"
              id="author_name"
              name="author_name"
              value={formData.author_name}
              onChange={handleChange}
              className={errors.author_name ? "border-red-500" : ""}
              required
            />
            {errors.author_name && <p className="mt-1 text-sm text-red-600">{errors.author_name}</p>}
          </div>

          <div>
            <label htmlFor="author_photo_url" className="block text-sm font-medium text-gray-700 mb-2">
              Author Photo URL
            </label>
            <Input
              type="url"
              id="author_photo_url"
              name="author_photo_url"
              value={formData.author_photo_url}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-2">
              Quote *
            </label>
            <Textarea
              id="quote"
              name="quote"
              rows={4}
              value={formData.quote}
              onChange={handleChange}
              className={errors.quote ? "border-red-500" : ""}
              placeholder="Enter the testimonial quote..."
              required
            />
            {errors.quote && <p className="mt-1 text-sm text-red-600">{errors.quote}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_visible"
              checked={formData.is_visible}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_visible: checked as boolean }))}
            />
            <label htmlFor="is_visible" className="text-sm font-medium text-gray-700">
              Show on homepage
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-blue-800 hover:bg-blue-900 text-white">
              {loading ? (
                "Saving..."
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {testimonial ? "Update" : "Create"}
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
