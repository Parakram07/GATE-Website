import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AdmissionsHero } from "@/components/admissions/admissions-hero"
import { ApplicationProcess } from "@/components/admissions/application-process"
import { TuitionSection } from "@/components/admissions/tuition-section"
import { ContactForm } from "@/components/admissions/contact-form"
import { FAQSection } from "@/components/admissions/faq-section"

export const metadata = {
  title: "Admissions - GATE College",
  description: "Apply to GATE College and start your journey towards academic excellence.",
}

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AdmissionsHero />
        <ApplicationProcess />
        <TuitionSection />
        <ContactForm />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
