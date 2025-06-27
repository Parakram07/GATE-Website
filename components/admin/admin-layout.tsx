"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, Home, FileText, GraduationCap, MessageSquare, Mail, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "News & Events", href: "/admin/news-events", icon: FileText },
    { name: "Programs", href: "/admin/programs", icon: GraduationCap },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Contact Submissions", href: "/admin/contacts", icon: Mail },
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <motion.div
            className="fixed inset-y-0 left-0 w-64 bg-blue-800 text-white"
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-blue-700">
              <span className="font-serif text-xl font-bold">GATE Admin</span>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="mt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-blue-700 text-white"
                      : "text-blue-100 hover:bg-blue-700 hover:text-white"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-4 left-4 right-4">
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start text-blue-100 hover:bg-blue-700 hover:text-white"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-blue-800 text-white">
          <div className="flex items-center px-4 py-6 border-b border-blue-700">
            <span className="font-serif text-xl font-bold">GATE Admin</span>
          </div>
          <nav className="mt-4 flex-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                  pathname === item.href ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-700 hover:text-white"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-blue-700">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start text-blue-100 hover:bg-blue-700 hover:text-white"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="flex items-center justify-between bg-white shadow-sm px-4 py-3 lg:px-6">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
        </div>

        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
