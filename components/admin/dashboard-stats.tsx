"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { FileText, GraduationCap, MessageSquare, Mail } from "lucide-react"
import { supabase } from "@/lib/supabase"

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return <span>{count}</span>
}

export function DashboardStats() {
  const [stats, setStats] = useState({
    newsEvents: 0,
    programs: 0,
    testimonials: 0,
    contacts: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const [newsEvents, programs, testimonials, contacts] = await Promise.all([
      supabase.from("news_events").select("id", { count: "exact" }),
      supabase.from("programs").select("id", { count: "exact" }),
      supabase.from("testimonials").select("id", { count: "exact" }),
      supabase.from("contact_submissions").select("id", { count: "exact" }),
    ])

    setStats({
      newsEvents: newsEvents.count || 0,
      programs: programs.count || 0,
      testimonials: testimonials.count || 0,
      contacts: contacts.count || 0,
    })
  }

  const statCards = [
    {
      title: "News & Events",
      value: stats.newsEvents,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Programs",
      value: stats.programs,
      icon: GraduationCap,
      color: "bg-green-500",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquare,
      color: "bg-purple-500",
    },
    {
      title: "Contact Submissions",
      value: stats.contacts,
      icon: Mail,
      color: "bg-yellow-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          className="bg-white rounded-lg shadow-sm p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center">
            <div className={`${stat.color} rounded-lg p-3`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">
                <AnimatedCounter end={stat.value} />
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
