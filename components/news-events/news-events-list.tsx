"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Calendar, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

interface NewsEvent {
  id: string
  title: string
  date: string
  excerpt: string
  image_url: string
  category: string
  content: string
}

export function NewsEventsList() {
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<NewsEvent[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const categories = ["All", "News", "Events", "Student Life"]

  useEffect(() => {
    fetchNewsEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [newsEvents, selectedCategory, searchTerm])

  const fetchNewsEvents = async () => {
    const { data } = await supabase
      .from("news_events")
      .select("*")
      .eq("is_published", true)
      .order("date", { ascending: false })

    if (data) {
      setNewsEvents(data)
    }
  }

  const filterEvents = () => {
    let filtered = newsEvents

    if (selectedCategory !== "All") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredEvents(filtered)
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h3 className="font-serif text-lg font-bold text-blue-800 mb-4">Filter</h3>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category ? "bg-blue-800 text-white" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {currentEvents.map((event, index) => (
                <motion.article
                  key={event.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={event.image_url || "/placeholder.svg?height=200&width=400"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">{event.category}</span>
                    </div>
                    <h2 className="font-serif text-xl font-bold text-blue-800 mb-3">{event.title}</h2>
                    <p className="text-gray-600 mb-4">{event.excerpt}</p>
                    <button className="text-yellow-600 hover:text-yellow-700 font-medium">Read More →</button>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-blue-800 text-white"
                        : "border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
                    }
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
                >
                  Next
                </Button>
              </div>
            )}

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No articles match your current filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
