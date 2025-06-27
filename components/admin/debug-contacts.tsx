"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"

export function DebugContacts() {
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const checkContacts = async () => {
    setLoading(true)
    try {
      // Try to fetch without RLS first
      const { data, error, count } = await supabase
        .from("contact_submissions")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .limit(5)

      console.log("Debug - Raw query result:", { data, error, count })

      if (error) {
        console.error("Debug - Query error:", error)
      } else {
        setContacts(data || [])
        console.log("Debug - Found contacts:", data?.length || 0)
      }
    } catch (error) {
      console.error("Debug - Unexpected error:", error)
    } finally {
      setLoading(false)
    }
  }

  const testInsert = async () => {
    try {
      const testData = {
        name: "Test User",
        email: "test@example.com",
        phone: "123-456-7890",
        message: "This is a test message from admin debug",
      }

      const { data, error } = await supabase.from("contact_submissions").insert([testData]).select()

      if (error) {
        console.error("Test insert error:", error)
        alert(`Insert error: ${error.message}`)
      } else {
        console.log("Test insert success:", data)
        alert("Test contact created successfully!")
        checkContacts()
      }
    } catch (error) {
      console.error("Test insert unexpected error:", error)
    }
  }

  useEffect(() => {
    checkContacts()
  }, [])

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-yellow-800 mb-3">Debug: Contact Submissions</h3>

      <div className="flex space-x-4 mb-4">
        <Button onClick={checkContacts} disabled={loading} variant="outline" size="sm">
          {loading ? "Checking..." : "Refresh Contacts"}
        </Button>
        <Button onClick={testInsert} variant="outline" size="sm">
          Create Test Contact
        </Button>
      </div>

      <div className="text-sm">
        <p className="mb-2">
          <strong>Total contacts found:</strong> {contacts.length}
        </p>
        {contacts.length > 0 && (
          <div>
            <p className="mb-2">
              <strong>Latest contacts:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              {contacts.map((contact, index) => (
                <li key={contact.id || index} className="text-gray-700">
                  {contact.name} ({contact.email}) - {new Date(contact.created_at).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
