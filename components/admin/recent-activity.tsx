"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Calendar, User } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Activity {
  id: string
  action: string
  timestamp: string
  user_email?: string
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    fetchRecentActivity()
  }, [])

  const fetchRecentActivity = async () => {
    // Get recent contact submissions as activity
    const { data: contacts } = await supabase
      .from("contact_submissions")
      .select("id, name, created_at")
      .order("created_at", { ascending: false })
      .limit(5)

    if (contacts) {
      const contactActivities = contacts.map((contact) => ({
        id: contact.id,
        action: `New contact submission from ${contact.name}`,
        timestamp: contact.created_at,
      }))
      setActivities(contactActivities)
    }
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">No recent activity</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(activity.timestamp).toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
