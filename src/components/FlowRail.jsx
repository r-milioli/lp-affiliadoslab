import { useEffect, useRef, useState } from 'react'

export default function FlowRail() {
  const railRef = useRef(null)
  const [length, setLength] = useState(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    const update = () => {
      const rail = railRef.current
      if (!rail) return
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY || window.pageYOffset
      const progress = docHeight > 0 ? Math.min(scrolled / docHeight, 1) : 0
      const railHeight = rail.offsetHeight || document.documentElement.scrollHeight
      setLength(railHeight * progress)
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="flow-rail" aria-hidden="true" ref={railRef}>
      <svg preserveAspectRatio="none">
        <defs>
          <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8FF4D" />
            <stop offset="55%" stopColor="#8FEE8A" />
            <stop offset="100%" stopColor="#34E2B0" />
          </linearGradient>
        </defs>
        <path
          className="flow-progress"
          d={`M1.5,0 L1.5,${length || 0}`}
        />
      </svg>
    </div>
  )
}
