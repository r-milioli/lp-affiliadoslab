import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function betaSlotsProxy(webhookUrl) {
  if (!webhookUrl) return undefined
  try {
    const targetUrl = new URL(webhookUrl)
    return {
      '/api/beta-slots': {
        target: targetUrl.origin,
        changeOrigin: true,
        secure: true,
        rewrite: () => `${targetUrl.pathname}${targetUrl.search}`,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            // n8n production webhooks geralmente exigem POST
            if (proxyReq.method === 'GET') proxyReq.method = 'POST'
          })
        },
      },
    }
  } catch {
    console.warn('[vite] VITE_BETA_WEBHOOK_URL inválida — proxy /api/beta-slots desativado.')
    return undefined
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxy = betaSlotsProxy(env.VITE_BETA_WEBHOOK_URL)

  return {
    plugins: [react()],
    server: { proxy },
    preview: { proxy },
  }
})
