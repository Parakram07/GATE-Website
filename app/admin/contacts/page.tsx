"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ContactsTable } from "@/components/admin/contacts-table"
import { ContactModal } from "@/components/admin/contact-modal"
import { DebugContacts } from "@/components/admin/debug-contacts"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  message: string
  created_at: string
}

export default function AdminContactsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    checkAuth()
    fetchContacts()
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

  const fetchContacts = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session?.access_token) {
        console.error("No access token")
        return
      }

      const response = await fetch("/api/admin/contacts", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch contacts")
      }

      const { contacts } = await response.json()
      console.log("Fetched contacts:", contacts?.length || 0, "items")
      setContacts(contacts || [])
    } catch (error) {
      console.error("Error fetching contacts:", error)
      alert(`Error fetching contacts: ${error.message}`)
    }
  }

  const handleView = (contact: ContactSubmission) => {
    setSelectedContact(contact)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact submission?")) return

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session?.access_token) {
        alert("Authentication error")
        return
      }

      const response = await fetch(`/api/admin/contacts?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete contact")
      }

      fetchContacts()
    } catch (error) {
      console.error("Error deleting contact:", error)
      alert(`Error deleting contact: ${error.message}`)
    }
  }

  const handleExport = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Message", "Date"],
      ...contacts.map((contact) => [
        contact.name,
        contact.email,
        contact.phone || "",
        contact.message.replace(/"/g, '""'),
        new Date(contact.created_at).toLocaleString(),
      ]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `contact-submissions-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
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
            <h1 className="text-3xl font-serif font-bold text-blue-800">Contact Submissions</h1>
            <p className="text-gray-600">View and manage contact form submissions</p>
          </div>
        </div>

        <DebugContacts />
        <ContactsTable contacts={contacts} onView={handleView} onDelete={handleDelete} onExport={handleExport} />

        {selectedContact && <ContactModal contact={selectedContact} onClose={() => setSelectedContact(null)} />}
      </div>
    </AdminLayout>
  )
}
