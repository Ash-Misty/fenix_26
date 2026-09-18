import { ArrowLeft } from 'lucide-react'
import { EVENTS } from './events'
import { EventCard } from './EventCard'
import { useEventNavigation } from '../../events/components/EventNavigation'

export function EventsSection() {
  const { goHome } = useEventNavigation()

  return (
    <section id="events" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={goHome}
            className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-6 py-3 text-sm font-semibold text-fuchsia-200 backdrop-blur-sm transition-colors hover:border-fuchsia-400 hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to All Events
          </button>
        </div>
      </div>
    </section>
  )
}
