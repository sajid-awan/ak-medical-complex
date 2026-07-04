"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import { CONTACT, IMAGES, NAV_LINKS } from "@/lib/site-data";
import { whatsAppLink } from "@/lib/whatsapp";

const MOBILE_MENU_ID = "nav-mobile-menu";
const NAV_HEIGHT = 64;
const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

function linkIsActive(href: string, activeSection: string) {
  return activeSection === href.slice(1);
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => section !== null,
    );

    if (!sections.length) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.intersectionRatio);
        }

        const inView = sections
          .filter((section) => (visible.get(section.id) ?? 0) > 0)
          .sort(
            (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top,
          );

        const nextActive = inView[0]?.id ?? "";
        setActiveSection((current) => (current === nextActive ? current : nextActive));
      },
      {
        rootMargin: `-${NAV_HEIGHT}px 0px -55% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-shadow bg-white border-b border-border",
        scrolled && "shadow-sm",
      )}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-6">
        <Image
          src={IMAGES.logo}
          alt="Al-Karim Medical Complex"
          width={658}
          height={235}
          priority
          unoptimized
          className="h-9 w-auto flex-shrink-0"
        />

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground/60">
          {NAV_LINKS.map((link) => {
            const active = linkIsActive(link.href, activeSection);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "transition-colors hover:text-primary",
                  active && "text-primary font-semibold",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <Button asChild size="sm" className="hidden md:inline-flex">
          <a href={whatsAppLink} className="flex items-center gap-2">
            <Phone size={13} />
            {CONTACT.phoneDisplay}
          </a>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={MOBILE_MENU_ID}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {menuOpen && (
        <div
          id={MOBILE_MENU_ID}
          className="md:hidden bg-white border-t border-border px-5 py-5 flex flex-col gap-4 text-sm font-medium"
        >
          {NAV_LINKS.map((link) => {
            const active = linkIsActive(link.href, activeSection);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "transition-colors hover:text-primary",
                  active && "text-primary font-semibold",
                )}
              >
                {link.label}
              </a>
            );
          })}
          <Button asChild size="sm" className="w-fit">
            <a href={whatsAppLink} className="flex items-center gap-2">
              <Phone size={13} /> {CONTACT.phoneDisplay}
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
