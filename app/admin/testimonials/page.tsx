"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { AdminLayout } from "@/components/admin/admin-layout"
import { TestimonialsTable } from "@/components/admin/testimonials-table"
import { TestimonialForm } from "@/components/admin/testimonial-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Testimonial {
  id: string
  quote: string
  author_name: string
  author_photo_url: string
  is_visible: boolean
}

export default function AdminTestimonialsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)

  useEffect(() => {
    checkAuth()
    fetchTestimonials()
  }, [])

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push("/admin/login")
      return
    }

    const userMetadata = session.user.app_metadata || session.user.raw_app_meta_data
    if (userMetadata?.role !== "super-admin") {
      router.push("/admin/login")
      return
    }

    setLoading(false)
  }

  const fetchTestimonials = async () => {
    const { data, error } = await supabase.from("testimonials").select("*").order("author_name")

    if (error) {
      console.error("Error fetching testimonials:", error)
    } else {
      setTestimonials(data || [])
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    const { error } = await supabase.from("testimonials").delete().eq("id", id)

    if (error) {
      alert("Error deleting testimonial")
    } else {
      fetchTestimonials()
    }
  }

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from("testimonials").update({ is_visible: !currentStatus }).eq("id", id)

    if (error) {
      alert("Error updating visibility")
    } else {
      fetchTestimonials()
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingTestimonial(null)
    fetchTestimonials()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800"></div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold text-blue-800">Testimonials</h1>
            <p className="text-gray-600">Manage student and alumni testimonials</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-blue-800 hover:bg-blue-900 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>

        {showForm && <TestimonialForm testimonial={editingTestimonial} onClose={handleFormClose} />}

        <TestimonialsTable
          testimonials={testimonials}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleVisibility={handleToggleVisibility}
        />
      </div>
    </AdminLayout>
  )
}
