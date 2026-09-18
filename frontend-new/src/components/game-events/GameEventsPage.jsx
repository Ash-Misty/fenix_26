import { useState } from 'react'
import { ArrowLeft, ArrowRight, Crosshair, Flame, Gamepad2, Menu, ShieldCheck, Trophy, Users, X } from 'lucide-react'
import { useEventNavigation } from '../../events/components/EventNavigation'
import './styles/game-events-page.css'

const GAME_EVENTS = [
  { slug: 'free-fire', title: 'FREE FIRE', tagline: 'Survive. Strategize. Dominate.', image: '/images/free-fire.png', prize: '₹15,000', slots: '48 squads', icon: Flame, variant: 'fire' },
  { slug: 'mini-militia', title: 'MINI MILITIA', tagline: 'Lock. Aim. Battle.', image: '/images/mini-militia.png', prize: '₹10,000', slots: '32 duos', icon: Crosshair, variant: 'militia' },
]

export function GameEventsPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { goHome, goRegister, goToSection } = useEventNavigation()
  const visitEvent = (slug) => { window.location.hash = `#/events/${slug}` }
  const handleNavigation = (destination) => {
    setMenuOpen(false)
    if (destination === 'events') window.scrollTo({ top: 0, behavior: 'smooth' })
    if (destination === 'home') goHome()
    if (destination === 'about') goToSection('about')
    if (destination === 'contact') goToSection('contact')
  }

  return (
    <div className="game-events-page">
      <div className="gep-orb gep-orb-one" aria-hidden="true" />
      <div className="gep-orb gep-orb-two" aria-hidden="true" />
      <div className="gep-grid" aria-hidden="true" />

      <header className="gep-header">
        <nav className="gep-nav" aria-label="Game event navigation">
          <button className="gep-brand" type="button" onClick={goHome} aria-label="Back to all events"><img className="gep-brand-mark" src="/images/fenix-logo.jpeg" alt="" /><span>FENIX<span>'26</span></span></button>
          <div className="gep-nav-links">
            <button type="button" onClick={() => handleNavigation('home')}>Home</button>
            <button className="is-active" type="button" onClick={() => handleNavigation('events')}>Game Events</button>
            <button type="button" onClick={() => handleNavigation('about')}>About</button>
            <button type="button" onClick={() => handleNavigation('contact')}>Contact</button>
          </div>
          <button className="gep-register" type="button" onClick={goRegister}>Register now <ArrowRight size={16} /></button>
          <button className="gep-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={22} />}</button>
        </nav>
        {menuOpen && <div className="gep-mobile-menu">
          <button type="button" onClick={() => handleNavigation('home')}>Home</button><button type="button" onClick={() => handleNavigation('events')}>Game Events</button><button type="button" onClick={() => handleNavigation('about')}>About</button><button type="button" onClick={() => handleNavigation('contact')}>Contact</button>
          <button className="gep-mobile-register" type="button" onClick={goRegister}>Register now <ArrowRight size={16} /></button>
        </div>}
      </header>

      <main>
        <section className="gep-hero" aria-labelledby="gep-title">
          <div className="gep-hero-copy">
            <p className="gep-eyebrow"><Gamepad2 size={15} /> FENIX'26 · NON-TECH ARENA</p>
            <h1 id="gep-title">GAME<br /><span>EVENTS</span></h1>
            <p className="gep-lead">Play. Compete. <strong>Conquer.</strong></p>
            <p className="gep-intro">Step into the arena, prove your skill, and claim your glory across FENIX'26's fiercest mobile game tournaments.</p>
            <div className="gep-hero-actions"><button className="gep-primary-action" type="button" onClick={() => document.getElementById('game-events')?.scrollIntoView({ behavior: 'smooth' })}>Explore events <ArrowRight size={17} /></button><button className="gep-quiet-action" type="button" onClick={goHome}><ArrowLeft size={16} /> All events</button></div>
          </div>
          <div className="gep-hero-art" aria-hidden="true"><div className="gep-reticle" /><div className="gep-art-ring gep-art-ring-one" /><div className="gep-art-ring gep-art-ring-two" /><img src="/images/controller.png" alt="" /><span className="gep-status"><i /> LIVE TO COMPETE</span></div>
        </section>

        <section className="gep-events" id="game-events" aria-labelledby="gep-events-title">
          <div className="gep-section-heading"><div><p className="gep-kicker">CHOOSE YOUR BATTLEGROUND</p><h2 id="gep-events-title">ENTER THE <span>ARENA</span></h2></div><p>Pick your game, rally your squad, and take your shot at the podium.</p></div>
          <div className="gep-event-grid">
            {GAME_EVENTS.map(({ icon: Icon, ...event }) => <article className={`gep-event-card gep-event-${event.variant}`} key={event.slug}>
              <img className="gep-card-art" src={event.image} alt="" /><div className="gep-card-shade" aria-hidden="true" />
              <div className="gep-card-content"><span className="gep-game-icon"><Icon size={18} /></span><div className="gep-card-meta"><span><Trophy size={14} /> {event.prize}</span><span><Users size={14} /> {event.slots}</span></div><h3>{event.title}</h3><p>{event.tagline}</p><button type="button" onClick={() => visitEvent(event.slug)}>View event <ArrowRight size={16} /></button></div>
            </article>)}
          </div>
        </section>

        <section className="gep-note" aria-label="Competition information"><ShieldCheck size={28} /><div><strong>Bring your A-game.</strong><span>Fair play, verified registrations, and referee decisions keep every match competitive.</span></div><button type="button" onClick={goRegister}>Join the battle <ArrowRight size={16} /></button></section>
      </main>

      <footer className="gep-footer"><p>FENIX<span>'26</span> · GAME ARENA</p><button type="button" onClick={() => handleNavigation('contact')}>Need help? Contact the team</button><small>© 2026 FENIX'26. All rights reserved.</small></footer>
    </div>
  )
}
