import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { NewsEventsHero } from "@/components/news-events/news-events-hero"
import { NewsEventsList } from "@/components/news-events/news-events-list"

export const metadata = {
  title: "News & Events - GATE College",
  description: "Stay updated with the latest news and events at GATE College.",
}

export default function NewsEventsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <NewsEventsHero />
        <NewsEventsList />
      </main>
      <Footer />
    </div>
  )
}
