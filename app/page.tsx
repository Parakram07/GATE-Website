import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { NewsEventsSection } from "@/components/home/news-events-section"

export const metadata = {
  title: "GATE College - Premier Education",
  description: "Shaping futures through excellence in education, innovation, and community engagement.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <NewsEventsSection />
      </main>
      <Footer />
    </div>
  )
}
