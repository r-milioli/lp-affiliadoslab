/**
 * Configuração dinâmica via variáveis de ambiente (Vite: prefixo VITE_).
 * Em Docker, os valores de runtime vêm de window.__ENV__ (gerado pelo entrypoint).
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

const modalMode = normalizeModalMode(env('VITE_MODAL_MODE', ''))

const siteConfig = {
  urgencyText: env(
    'VITE_URGENCY_TEXT',
    'Últimas vagas desta condição — encerra em',
  ),
  /** Duração do timer em segundos (ex.: 21600 = 6 horas) */
  urgencySeconds: Math.max(0, Math.floor(envNumber('VITE_URGENCY_SECONDS', 21600))),
  siteUrl: env('VITE_SITE_URL', ''),
  checkoutUrl: env('VITE_CHECKOUT_URL', '#checkout'),
  productPrice: envNumber('VITE_PRODUCT_PRICE', 497),
  /** Texto livre exibido abaixo do preço (ex.: "ou 12x de R$ 45,00 sem juros") */
  installmentsText: env('VITE_INSTALLMENTS_TEXT', 'ou 12x de R$ 45,00 sem juros'),

  /**
   * Modal no checkout:
   * none | lead | waitlist | beta
   */
  modalMode,
  /** Obrigatório para waitlist e beta */
  whatsappGroupUrl: env('VITE_WHATSAPP_GROUP_URL', ''),
  /** Webhook para POST dos leads/voluntários (JSON) */
  leadWebhookUrl: env('VITE_LEAD_WEBHOOK_URL', ''),

  /** Meta Pixel ID (ex.: 123456789012345). Vazio = Pixel desligado */
  metaPixelId: env('VITE_META_PIXEL_ID', ''),
  /** Google Analytics 4 Measurement ID (ex.: G-XXXXXXXXXX). Vazio = GA4 desligado */
  gaMeasurementId: env('VITE_GA_MEASUREMENT_ID', ''),
}

export default siteConfig
