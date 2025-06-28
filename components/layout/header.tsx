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

  return (
    <>
      {/* Top Header with admission info */}
      <div className="bg-blue-800 text-white py-3">
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
          <div className="flex justify-between items-center h-12"> {/* Adjusted to h-16 to fit larger logos */}
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
                    <X className="h-6 w-6" /> {/* Adjusted icon size */}
                    <span className="text-sm font-medium">Close</span>
                  </>
                ) : (
                  <>
                    <Menu className="h-8 w-8" /> {/* Adjusted icon size */}
                    <span className="text-sm font-medium">Menu</span>
                  </>
                )}
              </Button>
            </div>

            {/* Logo images on the right */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-16 relative"> {/* Increased to w-20 h-16 */}
                <Image src="/GateLogo.png" alt="GATE Logo 1" fill className="object-contain" />
              </div>
              <div className="w-20 h-16 relative"> {/* Increased to w-20 h-16 */}
                <Image src="/EHL.png" alt="GATE Logo 2" fill className="object-contain" />
              </div>
              <div className="w-20 h-16 relative"> {/* Increased to w-20 h-16 */}
                <Image src="/TAFE.png" alt="GATE Logo 3" fill className="object-contain" />
              </div>
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