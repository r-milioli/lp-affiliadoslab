import { useEffect, useState } from 'react'
import siteConfig from '../config/site'
import { CheckoutButton } from '../context/CheckoutContext'

const TIMER_KEY_PREFIX = 'afiliadoslab-offer-deadline'

function getDeadline(durationSeconds) {
  const key = `${TIMER_KEY_PREFIX}-${durationSeconds}`
  const saved = sessionStorage.getItem(key)
  if (saved) {
    const n = Number(saved)
    if (!Number.isNaN(n) && n > Date.now()) return n
  }
  const deadline = Date.now() + durationSeconds * 1000
  sessionStorage.setItem(key, String(deadline))
  return deadline
}

function formatRemaining(ms) {
  if (ms <= 0) return { h: '00', m: '00', s: '00' }
  const total = Math.floor(ms / 1000)
  const h = String(Math.floor(total / 3600)).padStart(2, '0')
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
  const s = String(total % 60).padStart(2, '0')
  return { h, m, s }
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState(() => formatRemaining(siteConfig.urgencySeconds * 1000))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const deadline = getDeadline(siteConfig.urgencySeconds)
    const tick = () => setTime(formatRemaining(deadline - Date.now()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header
      className="site-header"
      style={{ boxShadow: scrolled ? '0 8px 24px -18px rgba(31,27,46,0.35)' : 'none' }}
    >
      <div className="header-inner header-inner--urgency">
        <div className="header-urgency" aria-live="polite">
          <span className="header-urgency-msg">{siteConfig.urgencyText}</span>
          <span className="header-timer" aria-label={`${time.h} horas, ${time.m} minutos e ${time.s} segundos`}>
            <span>{time.h}</span>
            <span className="header-timer-sep">:</span>
            <span>{time.m}</span>
            <span className="header-timer-sep">:</span>
            <span>{time.s}</span>
          </span>
        </div>
        <div className="header-cta">
          <CheckoutButton className="btn btn-outline-neon">
            Quero o kit completo
          </CheckoutButton>
        </div>
      </div>
    </header>
  )
}
