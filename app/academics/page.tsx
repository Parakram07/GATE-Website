import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AcademicsHero } from "@/components/academics/academics-hero"
import { ProgramsSection } from "@/components/academics/programs-section"
import { ResourcesSection } from "@/components/academics/resources-section"

export const metadata = {
  title: "Academics - GATE College",
  description: "Explore our comprehensive academic programs and resources at GATE College.",
}

export default function AcademicsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AcademicsHero />
        <ProgramsSection />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  )
}
