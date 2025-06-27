"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { AdminLayout } from "@/components/admin/admin-layout"
import { NewsEventsTable } from "@/components/admin/news-events-table"
import { NewsEventForm } from "@/components/admin/news-event-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface NewsEvent {
  id: string
  title: string
  date: string
  excerpt: string
  image_url: string
  category: string
  content: string
  is_published: boolean
  created_at: string
}

export default function AdminNewsEventsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<NewsEvent | null>(null)

  useEffect(() => {
    checkAuth()
    fetchNewsEvents()
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

  const fetchNewsEvents = async () => {
    const { data, error } = await supabase.from("news_events").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching news events:", error)
    } else {
      setNewsEvents(data || [])
    }
  }

  const handleEdit = (event: NewsEvent) => {
    setEditingEvent(event)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    const { error } = await supabase.from("news_events").delete().eq("id", id)

    if (error) {
      alert("Error deleting item")
    } else {
      fetchNewsEvents()
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from("news_events").update({ is_published: !currentStatus }).eq("id", id)

    if (error) {
      alert("Error updating publish status")
    } else {
      fetchNewsEvents()
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingEvent(null)
    fetchNewsEvents()
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
            <h1 className="text-3xl font-serif font-bold text-blue-800">News & Events</h1>
            <p className="text-gray-600">Manage news articles and events</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-blue-800 hover:bg-blue-900 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>

        {showForm && <NewsEventForm event={editingEvent} onClose={handleFormClose} />}

        <NewsEventsTable
          newsEvents={newsEvents}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onTogglePublish={handleTogglePublish}
        />
      </div>
    </AdminLayout>
  )
}
