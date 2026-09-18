import { Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-[32rem] rounded-full bg-fuchsia-600/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 size-[28rem] rounded-full bg-indigo-600/20 blur-[120px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-fuchsia-300 uppercase">
            <Sparkles className="size-3.5" />
            Non-Tech Events
          </span>

          <h1 className="mt-5 font-display text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            GAME
            <br />
            EVENTS
          </h1>

          <p className="mt-4 font-display text-xl font-bold sm:text-2xl">
            <span className="bg-gradient-to-r from-orange-400 via-fuchsia-500 to-purple-400 bg-clip-text text-transparent">
              Play. Compete. Conquer.
            </span>
          </p>

          <p className="mt-4 max-w-md text-base leading-relaxed text-white/60">
            Step into the arena, show your skills and make your mark. Battle it out
            across our flagship game events and claim your glory.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#events"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(249,115,22,0.45)] transition-transform hover:scale-105"
            >
              Explore Events
            </a>
            <a
              href="#rules"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              Read the Rules
            </a>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center">
          <div
            aria-hidden="true"
            className="animate-fenix-glow absolute inset-0 mx-auto size-72 rounded-full bg-purple-500/30 blur-[90px] sm:size-96"
          />
          <img
            src="/images/controller.png"
            alt="Neon-lit game controller"
            width={560}
            height={560}
            className="animate-fenix-float relative w-full max-w-md drop-shadow-[0_20px_60px_rgba(168,85,247,0.4)]"
          />
        </div>
      </div>
    </section>
  )
}
