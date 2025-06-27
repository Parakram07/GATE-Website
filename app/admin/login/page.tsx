"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          // Check if user has super-admin role in raw_app_meta_data
          const userMetadata = session.user.app_metadata || session.user.raw_app_meta_data
          console.log("User metadata:", userMetadata) // Debug log

          if (userMetadata?.role === "super-admin") {
            console.log("Redirecting to admin dashboard...")
            router.push("/admin")
            return
          } else {
            console.log("User role:", userMetadata?.role) // Debug log
            await supabase.auth.signOut()
          }
        }
      } catch (error) {
        console.error("Error checking user:", error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session?.user?.email)

      if (event === "SIGNED_IN" && session?.user) {
        const userMetadata = session.user.app_metadata || session.user.raw_app_meta_data
        console.log("Auth state change - User metadata:", userMetadata) // Debug log

        if (userMetadata?.role === "super-admin") {
          console.log("User authenticated as super-admin, redirecting...")
          router.push("/admin")
        } else {
          console.log("Access denied, signing out...")
          await supabase.auth.signOut()
          alert(`Access denied. Super admin privileges required. Current role: ${userMetadata?.role || "none"}`)
        }
      }

      if (event === "SIGNED_OUT") {
        console.log("User signed out")
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif text-blue-800">GATE College Admin</CardTitle>
          <p className="text-gray-600">Sign in to access the admin panel</p>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#1E3A8A",
                    brandAccent: "#D4A017",
                  },
                },
              },
            }}
            providers={[]}
            redirectTo={`${typeof window !== "undefined" ? window.location.origin : ""}/admin`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
