import siteConfig from '../config/site'

let initialized = false

function hasMeta() {
  return Boolean(siteConfig.metaPixelId)
}

function hasGa() {
  return Boolean(siteConfig.gaMeasurementId)
}

function loadScript(src, id) {
  if (id && document.getElementById(id)) return
  const script = document.createElement('script')
  if (id) script.id = id
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

/** Inicializa Meta Pixel e/ou GA4 conforme variáveis de ambiente. */
export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  if (hasMeta()) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    /* eslint-enable */

    window.fbq('init', siteConfig.metaPixelId)
    window.fbq('track', 'PageView')
  }

  if (hasGa()) {
    loadScript(
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(siteConfig.gaMeasurementId)}`,
      'ga4-gtag',
    )
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', siteConfig.gaMeasurementId, {
      send_page_view: true,
    })
  }
}

function trackMeta(eventName, params) {
  if (!hasMeta() || typeof window.fbq !== 'function') return
  if (params) window.fbq('track', eventName, params)
  else window.fbq('track', eventName)
}

function trackGa(eventName, params = {}) {
  if (!hasGa() || typeof window.gtag !== 'function') return
  window.gtag('event', eventName, params)
}

/** Clique em CTA de checkout / kit */
export function trackCheckoutClick(extra = {}) {
  trackMeta('InitiateCheckout', {
    content_name: 'AfiliadosLAB',
    currency: 'BRL',
    value: siteConfig.productPrice,
    ...extra,
  })
  trackGa('begin_checkout', {
    currency: 'BRL',
    value: siteConfig.productPrice,
    ...extra,
  })
}

/** Lead capturado (formulário enviado com sucesso) */
export function trackLead(extra = {}) {
  trackMeta('Lead', {
    content_name: 'AfiliadosLAB',
    currency: 'BRL',
    value: siteConfig.productPrice,
    ...extra,
  })
  trackGa('generate_lead', {
    currency: 'BRL',
    value: siteConfig.productPrice,
    ...extra,
  })
}
