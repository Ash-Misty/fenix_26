import React, { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { FenixLogo } from './FenixLogo'
import { cn } from './utils'
import { useEventNavigation } from '../../events/components/EventNavigation'

const NAV_LINKS = [
  { label: 'Home', action: 'home' },
  { label: 'Events', action: 'events' },
  { label: 'About', action: 'about' },
  { label: 'Contact', action: 'contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { goHome, goRegister, goToSection } = useEventNavigation()

  const handleNavClick = (action) => {
    if (action === 'home' || action === 'events') {
      goHome()
    } else if (action === 'about') {
      goToSection('about')
    } else if (action === 'contact') {
      goToSection('contact')
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0616]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <FenixLogo />

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => handleNavClick(link.action)}
                className={cn(
                  'relative text-sm font-medium tracking-wide text-white/70 transition-colors hover:text-white',
                  link.label === 'Events' && 'text-fuchsia-400',
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goRegister}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-transform hover:scale-105 sm:inline-flex"
          >
            Register Now
            <ArrowRight className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-[#0a0616]/95 px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => {
                    handleNavClick(link.action)
                    setOpen(false)
                  }}
                  className="block w-full rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="mt-2">
              <button
                type="button"
                onClick={() => {
                  goRegister()
                  setOpen(false)
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Register Now
                <ArrowRight className="size-4" />
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
