"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabase"

interface Program {
  id: string
  name: string
  degree_type: string
  department: string
  description: string
}

export function ProgramsSection() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([])
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [selectedDegreeTypes, setSelectedDegreeTypes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const departments = ["Engineering", "Arts", "Business"]
  const degreeTypes = ["Bachelor's", "Master's", "PhD"]

  useEffect(() => {
    fetchPrograms()
  }, [])

  useEffect(() => {
    filterPrograms()
  }, [programs, selectedDepartments, selectedDegreeTypes])

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase.from("programs").select("*").order("name")

      if (error) {
        console.error("Error fetching programs:", error)
        setPrograms([])
      } else {
        setPrograms(data || [])
      }
    } catch (error) {
      console.error("Unexpected error fetching programs:", error)
      setPrograms([])
    } finally {
      setLoading(false)
    }
  }

  const filterPrograms = () => {
    if (!programs || !Array.isArray(programs)) {
      setFilteredPrograms([])
      return
    }

    let filtered = programs

    if (selectedDepartments.length > 0) {
      filtered = filtered.filter((program) => selectedDepartments.includes(program.department))
    }

    if (selectedDegreeTypes.length > 0) {
      filtered = filtered.filter((program) => selectedDegreeTypes.includes(program.degree_type))
    }

    setFilteredPrograms(filtered)
  }

  const handleDepartmentChange = (department: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments([...selectedDepartments, department])
    } else {
      setSelectedDepartments(selectedDepartments.filter((d) => d !== department))
    }
  }

  const handleDegreeTypeChange = (degreeType: string, checked: boolean) => {
    if (checked) {
      setSelectedDegreeTypes([...selectedDegreeTypes, degreeType])
    } else {
      setSelectedDegreeTypes(selectedDegreeTypes.filter((d) => d !== degreeType))
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading programs...</p>
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
          <h2 className="font-serif text-3xl font-bold text-blue-800 mb-4">Our Programs</h2>
          <p className="text-xl text-gray-600">Choose from our diverse range of academic programs</p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h3 className="font-serif text-lg font-bold text-blue-800 mb-4">Filter Programs</h3>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Department</h4>
                <div className="space-y-2">
                  {departments.map((department) => (
                    <div key={department} className="flex items-center space-x-2">
                      <Checkbox
                        id={department}
                        checked={selectedDepartments.includes(department)}
                        onCheckedChange={(checked) => handleDepartmentChange(department, checked as boolean)}
                      />
                      <label htmlFor={department} className="text-sm text-gray-700">
                        {department}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Degree Type</h4>
                <div className="space-y-2">
                  {degreeTypes.map((degreeType) => (
                    <div key={degreeType} className="flex items-center space-x-2">
                      <Checkbox
                        id={degreeType}
                        checked={selectedDegreeTypes.includes(degreeType)}
                        onCheckedChange={(checked) => handleDegreeTypeChange(degreeType, checked as boolean)}
                      />
                      <label htmlFor={degreeType} className="text-sm text-gray-700">
                        {degreeType}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Programs Grid */}
          <div className="lg:col-span-3">
            {filteredPrograms && filteredPrograms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPrograms.map((program, index) => (
                  <motion.div
                    key={program.id}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-serif text-lg font-bold text-blue-800">{program.name}</h3>
                      <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">{program.degree_type}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{program.department}</p>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
                    >
                      Learn More
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No programs match your current filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
