"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { buttonVariants } from "@/components/ui/button";
import { NAV_LINKS, CTA_HREF } from "@/constants/nav";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container">
        <nav
          aria-label="Primary"
          className={cn(
            "relative flex items-center justify-between gap-6 rounded-full px-4 py-2.5 transition-all duration-500",
            scrolled ? "glass shadow-glass-sm" : "border border-transparent",
          )}
        >
          <a href="#top" aria-label="Nexus — home" className="flex items-center">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href={CTA_HREF}
              className={buttonVariants({ size: "sm" })}
              aria-label="Apply to join Nexus"
            >
              Join Nexus
            </a>
          </div>

          <button
            type="button"
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container md:hidden"
          >
            <div className="glass-strong mt-2 rounded-3xl p-4 shadow-glass-lg">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-3 px-1">
                <a
                  href={CTA_HREF}
                  onClick={() => setOpen(false)}
                  className={buttonVariants({ className: "w-full" })}
                >
                  Join Nexus
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
