import { useEffect } from 'react'
import { initAnalytics } from '../lib/analytics'

/** Carrega Pixel/GA4 após idle/load (somente se IDs existirem no env). */
export default function Analytics() {
  useEffect(() => {
    const start = () => initAnalytics()

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(start, { timeout: 2500 })
      return () => window.cancelIdleCallback?.(id)
    }

    const timer = window.setTimeout(start, 1800)
    return () => window.clearTimeout(timer)
  }, [])

  return null
}
