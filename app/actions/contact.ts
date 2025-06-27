"use server"

import { supabaseAdmin } from "@/lib/supabase-admin"

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return {
        success: false,
        error: "Please fill in all required fields",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Check if Supabase is properly configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase configuration missing")
      return {
        success: false,
        error: "Service temporarily unavailable. Please try again later or contact us directly.",
      }
    }

    // Insert using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from("contact_submissions")
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone?.trim() || null,
          message: message.trim(),
        },
      ])
      .select()

    if (error) {
      console.error("Error inserting contact submission:", error)
      return {
        success: false,
        error: "Failed to submit your message. Please try again or contact us directly.",
      }
    }

    console.log("Contact form submitted successfully:", data)
    return {
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("Unexpected error in submitContactForm:", error)
    return {
      success: false,
      error: "Service temporarily unavailable. Please contact us directly at admissions@gatecollege.edu",
    }
  }
}
