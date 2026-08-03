import siteConfig from '../config/site'

function sleep(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

/** Delay randômico entre 3.5s e 5.5s para a experiência de verificação. */
export function randomCheckDelayMs() {
  return 3500 + Math.floor(Math.random() * 2000)
}

function pickCount(data) {
  if (typeof data === 'number' && Number.isFinite(data)) return data
  if (typeof data === 'string' && data.trim() !== '') {
    const n = Number(data.trim().replace(',', '.'))
    if (Number.isFinite(n)) return n
  }
  if (!data || typeof data !== 'object') return null

  // Formato do webhook: [ { data: { ParticipantCount: "3" } } ]
  if (Array.isArray(data)) {
    for (const item of data) {
      const found = pickCount(item)
      if (found !== null) return found
    }
    return null
  }

  const keys = [
    'ParticipantCount',
    'participantCount',
    'participant_count',
    'count',
    'total',
    'participants',
    'quantity',
    'qtd',
    'quantidade',
    'members',
    'memberCount',
    'size',
    'current',
    'value',
  ]

  const lowerMap = Object.create(null)
  for (const [key, value] of Object.entries(data)) {
    lowerMap[String(key).toLowerCase()] = value
  }

  for (const key of keys) {
    const value = data[key] ?? lowerMap[key.toLowerCase()]
    if (value === undefined || value === null || value === '') continue
    const n = Number(String(value).replace(',', '.'))
    if (Number.isFinite(n)) return n
  }

  if (data.data !== undefined) {
    return pickCount(data.data)
  }

  return null
}

/**
 * Consulta o quantitativo via proxy same-origin (/api/beta-slots),
 * evitando CORS no navegador. O Vite (dev) e o nginx (Docker) encaminham
 * para VITE_BETA_WEBHOOK_URL.
 * Formato esperado:
 * [ { "data": { "ParticipantCount": "3" } } ]
 */
export async function fetchBetaParticipantCount() {
  if (!siteConfig.betaWebhookUrl) {
    throw new Error('Configure VITE_BETA_WEBHOOK_URL para verificar as vagas.')
  }

  const res = await fetch('/api/beta-slots', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ source: 'afiliadoslab-beta-slots' }),
  })

  if (!res.ok) {
    throw new Error(`Falha ao consultar vagas (${res.status})`)
  }

  const contentType = res.headers.get('content-type') || ''
  let raw
  if (contentType.includes('application/json')) {
    raw = await res.json()
  } else {
    const text = (await res.text()).trim()
    try {
      raw = JSON.parse(text)
    } catch {
      raw = text
    }
  }

  const count = pickCount(raw)
  if (count === null || count < 0) {
    throw new Error('Resposta do webhook sem quantitativo válido.')
  }

  return Math.floor(count)
}

/**
 * Roda a checagem com delay mínimo randômico + request do webhook.
 * @returns {{ status: 'available' | 'full', count: number, capacity: number }}
 */
export async function checkBetaAvailability(onProgress) {
  const capacity = siteConfig.betaCapacity
  const waitMs = randomCheckDelayMs()
  const steps = [
    'Conectando ao sistema de vagas…',
    'Consultando participantes do grupo beta…',
    'Comparando com a capacidade disponível…',
    'Finalizando verificação…',
  ]

  let stepIndex = 0
  onProgress?.({ progress: 8, label: steps[0] })

  const tick = window.setInterval(() => {
    stepIndex = Math.min(stepIndex + 1, steps.length - 1)
    const progress = Math.min(92, 8 + ((stepIndex + 1) / steps.length) * 80)
    onProgress?.({ progress, label: steps[stepIndex] })
  }, Math.max(700, Math.floor(waitMs / steps.length)))

  try {
    const [count] = await Promise.all([
      fetchBetaParticipantCount(),
      sleep(waitMs),
    ])

    onProgress?.({ progress: 100, label: 'Verificação concluída' })
    await sleep(280)

    return {
      status: count >= capacity ? 'full' : 'available',
      count,
      capacity,
    }
  } finally {
    window.clearInterval(tick)
  }
}
