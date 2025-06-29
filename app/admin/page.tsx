"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { AdminLayout } from "@/components/admin/admin-layout"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        console.log("Admin dashboard - checking session:", session?.user?.email)

        if (!session?.user) {
          console.log("No session, redirecting to login")
          router.push("/admin/login")
          return
        }

        // Check super-admin role
        const userMetadata = session.user.app_metadata || session.user.app_metadata
        console.log("Admin dashboard - User metadata:", userMetadata)

        if (userMetadata?.role !== "super-admin") {
          console.log("Not super-admin, redirecting to login")
          await supabase.auth.signOut()
          router.push("/admin/login")
          return
        }

        console.log("User authenticated successfully")
        setUser(session.user)
      } catch (error) {
        console.error("Error checking auth:", error)
        router.push("/admin/login")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Admin dashboard - Auth state change:", event)

      if (event === "SIGNED_OUT" || !session) {
        router.push("/admin/login")
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-blue-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.email}</p>
        </div>

        <DashboardStats />
        <RecentActivity />
      </div>
    </AdminLayout>
  )
}
