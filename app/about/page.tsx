import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutHero } from "@/components/about/about-hero"
import { MissionVision } from "@/components/about/mission-vision"
import { History } from "@/components/about/history"
import { Leadership } from "@/components/about/leadership"

export const metadata = {
  title: "About Us - GATE College",
  description: "Learn about GATE College's mission, vision, history, and leadership team.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AboutHero />
        <MissionVision />
        <History />
        <Leadership />
      </main>
      <Footer />
    </div>
  )
}
