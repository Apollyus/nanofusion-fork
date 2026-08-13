import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

async function getConfig() {
  const { data } = await supabase.from("site_config").select("key, value");
  return (data || []).reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {} as Record<string, string>);
}

const TopBar = async () => {
  const config = await getConfig();
  const phone = config.contact_phone || "+420 774 509 409";
  const email = config.contact_email || "info@nanofusion.cz";
  const alertText = config.header_alert || "Jezdíme po celé ČR - Po–Pá 7:00–18:00";

  return (
    <div className="bg-[#2D2D2D] text-[#B0B0B0] text-sm py-2 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-2">
      <div>{alertText}</div>
      <div className="flex gap-4 md:gap-6 items-center">
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          {phone}
        </a>
        <a href={`mailto:${email}`} className="hover:text-white transition-colors flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-mail"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          {email}
        </a>
      </div>
    </div>
  );
};

const Navbar = () => {
  const navLinks = [
    { label: "Služby", href: "/#sluzby" },
    { label: "Reference", href: "/#reference" },
    { label: "Blog", href: "/#blog" },
    { label: "Galerie", href: "/#galerie" },
    { label: "O nás", href: "/#o-nas" },
    { label: "Kontakt", href: "/#kontakt" },
  ];

  return (
    <nav className="bg-[#EBEBEB] text-[#4A4A4A] py-4 px-4 md:px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="NANOfusion" width={180} height={60} className="h-10 w-auto object-contain" />
      </Link>

      <div className="hidden lg:flex items-center gap-6 xl:gap-8">
        {navLinks.map((link) => (
          <Link key={link.label} href={link.href} className="hover:text-amber-500 font-medium transition-colors">
            {link.label}
          </Link>
        ))}
      </div>

      <Button href="/kalkulace" className="hidden md:inline-flex">
        Spočítat cenu
      </Button>

      {/* Mobile Menu Button - Placeholder */}
      <button className="lg:hidden p-2 text-gray-600 hover:text-amber-500 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>
    </nav>
  );
};

export const Header = () => {
  return (
    <header className="w-full font-sans">
      <TopBar />
      <Navbar />
    </header>
  );
};
