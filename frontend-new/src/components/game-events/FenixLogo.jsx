import { cn } from './utils'

export function FenixLogo({ className }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="relative flex size-7 items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-7 drop-shadow-[0_0_8px_rgba(168,85,247,0.9)]"
          aria-hidden="true"
        >
          <path
            d="M12 2c1.6 3 1 5-1 7 3-.5 4.5-2.3 5-4 1.8 2.6 2 5.6.8 8.4A8 8 0 1 1 6 6.4C6.3 9 7.4 10.6 9 11.5 7.2 8.6 8.4 4.7 12 2Z"
            fill="url(#fenix-grad)"
          />
          <defs>
            <linearGradient id="fenix-grad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f97316" />
              <stop offset="0.5" stopColor="#e11d8f" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span className="font-display text-lg font-extrabold tracking-widest text-white">
        FENIX
        <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
          &apos;26
        </span>
      </span>
    </div>
  )
}
