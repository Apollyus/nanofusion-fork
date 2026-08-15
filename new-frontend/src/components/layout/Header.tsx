import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

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
    <div className="bg-[#2D2D2D] text-[#B0B0B0] text-sm py-2 hidden md:block">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-2 max-w-7xl">
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
    </div>
  );
};

import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <header className="w-full font-sans fixed top-0 left-0 right-0 z-50 flex flex-col">
      <TopBar />
      <Navbar />
    </header>
  );
};
