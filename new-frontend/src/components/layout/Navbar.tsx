"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Služby", href: "/#sluzby" },
    { label: "Reference", href: "/#reference" },
    { label: "Blog", href: "/#blog" },
    { label: "Galerie", href: "/#galerie" },
    { label: "O nás", href: "/o-nas" },
    { label: "Kontakt", href: "/#kontakt" },
    { label: "Konfigurátor", href: "/kalkulace", highlight: false },
    { label: "E-shop", href: "https://eshop-nanofusion.cz", highlight: true, external: true },
  ];

  return (
    <nav className="bg-[#EBEBEB] text-[#4A4A4A] py-3 shadow-sm relative">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center max-w-7xl">
        <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
          <Image src="/logo.png" alt="NANOfusion" width={180} height={60} className="h-20 md:h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "font-medium transition-colors",
                  link.highlight ? "text-amber-500 hover:text-amber-600 font-bold" : "hover:text-amber-500"
                )}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "font-medium transition-colors",
                  link.highlight ? "text-amber-500 hover:text-amber-600 font-bold" : "hover:text-amber-500"
                )}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-600 hover:text-amber-500 transition-colors"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#EBEBEB] shadow-md border-t border-gray-200 z-50">
          <div className="flex flex-col py-4 px-4 gap-4">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors border-b border-gray-200 pb-2",
                    link.highlight ? "text-amber-500 font-bold" : "text-gray-600"
                  )}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors border-b border-gray-200 pb-2",
                    link.highlight ? "text-amber-500 font-bold" : "text-gray-600"
                  )}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
