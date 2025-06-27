"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

interface NewsEvent {
  id: string
  title: string
  date: string
  excerpt: string
  image_url: string
  category: string
}

export function NewsEventsSection() {
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNewsEvents()
  }, [])

  const fetchNewsEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("news_events")
        .select("*")
        .eq("is_published", true)
        .order("date", { ascending: false })
        .limit(3)

      if (error) {
        console.error("Error fetching news events:", error)
        setNewsEvents([])
      } else {
        setNewsEvents(data || [])
      }
    } catch (error) {
      console.error("Unexpected error fetching news events:", error)
      setNewsEvents([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading news and events...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-blue-800 mb-4">Latest News & Events</h2>
          <p className="text-xl text-gray-600">Stay updated with the latest happenings at GATE College</p>
        </motion.div>

        {newsEvents && newsEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {newsEvents.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={item.image_url || "/placeholder.svg?height=200&width=400"}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                      <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">{item.category}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-blue-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    <Link
                      href={`/news-events/${item.id}`}
                      className="text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button
                asChild
                variant="outline"
                className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
              >
                <Link href="/news-events">View All News & Events</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No news or events available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
