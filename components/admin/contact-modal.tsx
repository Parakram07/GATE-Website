"use client"

import { motion } from "framer-motion"
import { X, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  message: string
  created_at: string
}

interface ContactModalProps {
  contact: ContactSubmission
  onClose: () => void
}

export function ContactModal({ contact, onClose }: ContactModalProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-serif font-bold text-blue-800">Contact Submission Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Name</h3>
              <p className="text-gray-900">{contact.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Email</h3>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800">
                  {contact.email}
                </a>
              </div>
            </div>

            {contact.phone && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Phone</h3>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  <a href={`tel:${contact.phone}`} className="text-blue-600 hover:text-blue-800">
                    {contact.phone}
                  </a>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Submitted</h3>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-gray-900">{new Date(contact.created_at).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Message</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900 whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <Button onClick={onClose} className="bg-blue-800 hover:bg-blue-900 text-white">
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
