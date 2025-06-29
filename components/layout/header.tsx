"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, GraduationCap, Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },                    
    { name: "About", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Admissions", href: "/admissions" },
    { name: "News & Events", href: "/news-events" },
  ];

  const logos = [
    { src: "/GateLogo.png", alt: "GATE Logo", url: "" },
    { src: "/EHL.png", alt: "EHL Logo", url: "https://www.ehl.edu" },
    { src: "/TAFE.png", alt: "TAFE Logo", url: "https://www.tafensw.edu.au" },
  ];

  return (
    <>
      {/* Top Header with admission info */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-800 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-2 lg:space-y-0">
            {/* Text - Centered */}
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm lg:flex-1 lg:justify-center">
              <div className="flex items-center space-x-2 text-sm">
                <GraduationCap className="h-4 w-4" />
                <span className="font-medium">Admission Open for Feb/Mar 2025 Intake</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@gate.edu.np</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>01-4650176 | 9802323482 | 9802323495</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Sun - Fri | 7 AM - 5 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Menu button with text */}
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2"
              >
                {isMenuOpen ? (
                  <>
                    <X className="h-6 w-6" />
                    <span className="text-sm font-medium">Close</span>
                  </>
                ) : (
                  <>
                    <Menu className="h-8 w-8" />
                    <span className="text-sm font-medium">Menu</span>
                  </>
                )}
              </Button>
            </div>

            {/* Logo images on the right */}
            <div className="flex items-center space-x-4">
              {logos.map((logo) => (
                <Link
                  key={logo.alt}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-20 h-16 relative hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Menu */}
          {isMenuOpen && (
            <div>
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}