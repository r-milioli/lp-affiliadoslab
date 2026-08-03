import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import siteConfig from '../config/site'
import ActionModal from '../components/ActionModal'
import { trackCheckoutClick } from '../lib/analytics'

const CheckoutContext = createContext(null)

export function goToUrl(url, { sameTab = false } = {}) {
  if (!url) return
  if (sameTab || !/^https?:\/\//i.test(url)) {
    window.location.assign(url)
    return
  }
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function CheckoutProvider({ children }) {
  const [open, setOpen] = useState(false)
  const mode = siteConfig.modalMode

  const requestCheckout = useCallback(() => {
    trackCheckoutClick({ modal_mode: mode })
    if (mode === 'none') {
      goToUrl(siteConfig.checkoutUrl)
      return
    }
    setOpen(true)
  }, [mode])

  const closeModal = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({
      requestCheckout,
      modalMode: mode,
      hasModal: mode !== 'none',
    }),
    [requestCheckout, mode],
  )

  return (
    <CheckoutContext.Provider value={value}>
      {children}
      {mode !== 'none' && (
        <ActionModal
          open={open}
          mode={mode}
          onClose={closeModal}
          onGoCheckout={() => {
            setOpen(false)
            goToUrl(siteConfig.checkoutUrl)
          }}
          onGoWhatsApp={() => {
            setOpen(false)
            goToUrl(siteConfig.whatsappGroupUrl)
          }}
          onGoRedirect={() => {
            setOpen(false)
            goToUrl(siteConfig.urlRedirect, { sameTab: true })
          }}
        />
      )}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext)
  if (!ctx) {
    throw new Error('useCheckout deve ser usado dentro de CheckoutProvider')
  }
  return ctx
}

export function CheckoutButton({ className, children, type = 'button', onClick, ...props }) {
  const { requestCheckout } = useCheckout()
  return (
    <button
      type={type}
      className={className}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) requestCheckout()
      }}
      {...props}
    >
      {children}
    </button>
  )
}
