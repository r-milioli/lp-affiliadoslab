/**
 * Configuração dinâmica via variáveis de ambiente (Vite: prefixo VITE_).
 * Em Docker, os valores de runtime vêm de window.__ENV__ (gerado pelo entrypoint).
 *
 * Getters: lê o env no momento do uso (evita race com /env.js).
 */
function env(key, fallback = '') {
  const runtime =
    typeof window !== 'undefined' &&
    window.__ENV__ &&
    Object.prototype.hasOwnProperty.call(window.__ENV__, key)
      ? window.__ENV__[key]
      : undefined

  if (runtime !== undefined && runtime !== null && String(runtime).trim() !== '') {
    return String(runtime).trim()
  }

  const value = import.meta.env[key]
  if (value === undefined || value === null || String(value).trim() === '') {
    return fallback
  }
  return String(value).trim()
}

function envNumber(key, fallback) {
  const raw = env(key, '')
  if (!raw) return fallback
  const n = Number(raw.replace(',', '.'))
  return Number.isFinite(n) ? n : fallback
}

/** Formata valor monetário em pt-BR com 2 casas: 497 → "497,00" */
export function formatPriceBRL(value) {
  const n = typeof value === 'number' ? value : Number(String(value).replace(',', '.'))
  const safe = Number.isFinite(n) ? n : 0
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safe)
}

/**
 * Normaliza VITE_MODAL_MODE:
 * - lead | captura | captura_lead
 * - waitlist | lista_espera | lista-de-espera
 * - beta | beta_test | voluntarios
 * - vazio / outro → none
 */
export function normalizeModalMode(raw) {
  const value = String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_')

  if (!value) return 'none'
  if (['lead', 'captura', 'captura_lead', 'formulario', 'form'].includes(value)) return 'lead'
  if (['waitlist', 'lista_espera', 'lista_de_espera', 'espera'].includes(value)) return 'waitlist'
  if (['beta', 'beta_test', 'beta_teste', 'voluntarios', 'voluntario'].includes(value)) return 'beta'
  return 'none'
}

const siteConfig = {
  get urgencyText() {
    return env('VITE_URGENCY_TEXT', 'Últimas vagas desta condição — encerra em')
  },
  get urgencySeconds() {
    return Math.max(0, Math.floor(envNumber('VITE_URGENCY_SECONDS', 21600)))
  },
  get siteUrl() {
    return env('VITE_SITE_URL', '')
  },
  get checkoutUrl() {
    return env('VITE_CHECKOUT_URL', '#checkout')
  },
  get productPrice() {
    return envNumber('VITE_PRODUCT_PRICE', 497)
  },
  get installmentsText() {
    return env('VITE_INSTALLMENTS_TEXT', 'ou 12x de R$ 45,00 sem juros')
  },
  get modalMode() {
    return normalizeModalMode(env('VITE_MODAL_MODE', ''))
  },
  /** Label dos CTAs principais quando VITE_MODAL_MODE=beta; senão usa o fallback. */
  ctaLabel(fallback) {
    return this.modalMode === 'beta' ? 'Seja o usuário beta test' : fallback
  },
  get whatsappGroupUrl() {
    return env('VITE_WHATSAPP_GROUP_URL', '')
  },
  get urlRedirect() {
    return env('VITE_URL_REDIRECT', '')
  },
  get betaCapacity() {
    return Math.max(0, Math.floor(envNumber('VITE_BETA_CAPACITY', 20)))
  },
  get betaWebhookUrl() {
    return env('VITE_BETA_WEBHOOK_URL', '')
  },
  get leadWebhookUrl() {
    return env('VITE_LEAD_WEBHOOK_URL', '')
  },
  get metaPixelId() {
    return env('VITE_META_PIXEL_ID', '')
  },
  get gaMeasurementId() {
    return env('VITE_GA_MEASUREMENT_ID', '')
  },
}

export default siteConfig
