import { Heart } from 'lucide-react'
import { FenixLogo } from './FenixLogo'
import { useEventNavigation } from '../../events/components/EventNavigation'

const QUICK_LINKS = ['Home', 'Events', 'About', 'Contact']

const CONTACTS = [
  { name: 'Ananya Sharma', phone: '+91 98765 43210', img: '/images/avatar-ananya.png' },
  { name: 'Rohan Mehta', phone: '+91 87654 32109', img: '/images/avatar-rohan.png' },
]

export function SiteFooter() {
  const { goHome, goToSection } = useEventNavigation()

  const handleQuickLink = (label) => {
    const action = label.toLowerCase()
    if (action === 'home' || action === 'events') {
      goHome()
    } else if (action === 'about') {
      goToSection('about')
    } else if (action === 'contact') {
      goToSection('contact')
    }
  }

  return (
    <footer id="contact" className="relative border-t border-white/10 bg-[#0a0616]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <FenixLogo />
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              More Than an Event,
              <br />
              It&apos;s an Experience.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-widest text-fuchsia-300 uppercase">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() => handleQuickLink(link)}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-widest text-fuchsia-300 uppercase">
              Contact
            </h4>
            <ul className="mt-4 space-y-4">
              {CONTACTS.map((c) => (
                <li key={c.name} className="flex items-center gap-3">
                  <img
                    src={c.img || '/placeholder.svg'}
                    alt={c.name}
                    width={40}
                    height={40}
                    className="size-10 rounded-full border border-white/15 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{c.name}</p>
                    <p className="text-xs text-white/50">{c.phone}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-white/10 pt-6 text-sm text-white/50">
          <p>&copy; 2026 FENIX&apos;26. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Built with <Heart className="size-4 fill-red-500 text-red-500" /> for the
            innovators.
          </p>
        </div>
      </div>
    </footer>
  )
}
