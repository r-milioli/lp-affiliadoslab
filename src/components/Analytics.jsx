import { useEffect } from 'react'
import { initAnalytics } from '../lib/analytics'

/** Carrega Pixel/GA4 uma vez ao montar o app (somente se IDs existirem no env). */
export default function Analytics() {
  useEffect(() => {
    initAnalytics()
  }, [])

  return null
}
