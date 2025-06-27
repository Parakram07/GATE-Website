"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm } from "@/app/actions/contact"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isPending, startTransition] = useTransition()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length > 1000) {
      newErrors.message = "Message must be less than 1000 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    startTransition(async () => {
      try {
        const formDataObj = new FormData()
        formDataObj.append("name", formData.name)
        formDataObj.append("email", formData.email)
        formDataObj.append("phone", formData.phone)
        formDataObj.append("message", formData.message)

        const result = await submitContactForm(formDataObj)

        if (result.success) {
          setSubmitStatus("success")
          setStatusMessage(result.message || "Thank you for your message!")
          setFormData({ name: "", email: "", phone: "", message: "" })
        } else {
          setSubmitStatus("error")
          setStatusMessage(result.error || "An error occurred. Please try again.")
        }
      } catch (error) {
        console.error("Form submission error:", error)
        setSubmitStatus("error")
        setStatusMessage("An unexpected error occurred. Please try again later.")
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Clear status when user starts typing
    if (submitStatus !== "idle") {
      setSubmitStatus("idle")
      setStatusMessage("")
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl font-bold text-blue-800 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600">Have questions about admissions? We're here to help.</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
                required
                disabled={isPending}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
                required
                disabled={isPending}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isPending}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? "border-red-500" : ""}
              placeholder="Tell us about your interest in GATE College..."
              required
              disabled={isPending}
            />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            <p className="mt-1 text-sm text-gray-500">{formData.message.length}/1000 characters</p>
          </div>

          <Button type="submit" disabled={isPending} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
            {isPending ? "Sending..." : "Send Message"}
          </Button>

          {submitStatus === "success" && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800">{statusMessage}</p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">{statusMessage}</p>
              <p className="text-sm text-red-600 mt-2">
                If this problem persists, please contact us directly at admissions@gatecollege.edu
              </p>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  )
}
