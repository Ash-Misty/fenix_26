import { ArrowRight, Trophy, Users } from 'lucide-react'
import { cn } from './utils'

const ACCENTS = {
  fire: {
    ring: 'hover:border-orange-500/60',
    glow: 'group-hover:shadow-[0_0_60px_-10px_rgba(249,115,22,0.6)]',
    tagline: 'text-orange-300',
    button:
      'bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]',
    chip: 'text-orange-300',
    overlay: 'from-[#1a0a04]/95 via-[#1a0a04]/55',
  },
  militia: {
    ring: 'hover:border-cyan-400/60',
    glow: 'group-hover:shadow-[0_0_60px_-10px_rgba(34,211,238,0.55)]',
    tagline: 'text-cyan-300',
    button:
      'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_20px_rgba(34,211,238,0.5)]',
    chip: 'text-cyan-300',
    overlay: 'from-[#031414]/95 via-[#031414]/55',
  },
}

export function EventCard({ event }) {
  const accent = ACCENTS[event.accent]

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300',
        accent.ring,
        accent.glow,
      )}
    >
      <div className="relative h-72 w-full sm:h-80">
        <img
          src={event.image || '/placeholder.svg'}
          alt={`${event.title} event artwork`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t to-transparent',
            accent.overlay,
          )}
        />

        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
          <div className="mb-3 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <Trophy className={cn('size-3.5', accent.chip)} />
              {event.prize}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <Users className={cn('size-3.5', accent.chip)} />
              {event.slots}
            </span>
          </div>

          <h3 className="font-display text-4xl font-black italic tracking-tight text-white drop-shadow-lg sm:text-5xl">
            {event.title}
          </h3>
          <p className={cn('mt-1 text-lg font-semibold', accent.tagline)}>
            {event.tagline}
          </p>

          <a
            href={`#/events/${event.id}`}
            className={cn(
              'mt-5 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105',
              accent.button,
            )}
          >
            View Prize
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </article>
  )
}
