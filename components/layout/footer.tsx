import Link from "next/link"
import { Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-800 font-bold text-sm">G</span>
              </div>
              <span className="font-serif font-bold text-xl">GATE College</span>
            </div>
            <p className="text-blue-200 mb-4">
              Shaping futures through excellence in education, innovation, and community engagement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-blue-200 hover:text-white transition-colors">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-blue-200 hover:text-white transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/news-events" className="text-blue-200 hover:text-white transition-colors">
                  News & Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-blue-200">admissions@gatecollege.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-blue-200">01-4650176</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-8 text-center">
          <p className="text-blue-200">© 2025 GATE College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
