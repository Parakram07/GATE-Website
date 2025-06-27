"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ProgramsTable } from "@/components/admin/programs-table"
import { ProgramForm } from "@/components/admin/program-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Program {
  id: string
  name: string
  degree_type: string
  department: string
  description: string
}

export default function AdminProgramsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [programs, setPrograms] = useState<Program[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)

  useEffect(() => {
    checkAuth()
    fetchPrograms()
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

  const fetchPrograms = async () => {
    const { data, error } = await supabase.from("programs").select("*").order("name")

    if (error) {
      console.error("Error fetching programs:", error)
    } else {
      setPrograms(data || [])
    }
  }

  const handleEdit = (program: Program) => {
    setEditingProgram(program)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return

    const { error } = await supabase.from("programs").delete().eq("id", id)

    if (error) {
      alert("Error deleting program")
    } else {
      fetchPrograms()
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProgram(null)
    fetchPrograms()
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
            <h1 className="text-3xl font-serif font-bold text-blue-800">Programs</h1>
            <p className="text-gray-600">Manage academic programs</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-blue-800 hover:bg-blue-900 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Program
          </Button>
        </div>

        {showForm && <ProgramForm program={editingProgram} onClose={handleFormClose} />}

        <ProgramsTable programs={programs} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </AdminLayout>
  )
}
