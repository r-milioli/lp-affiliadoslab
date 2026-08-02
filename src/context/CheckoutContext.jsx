import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import siteConfig from '../config/site'
import ActionModal from '../components/ActionModal'

const CheckoutContext = createContext(null)

function goToUrl(url) {
  if (!url) return
  if (/^https?:\/\//i.test(url)) {
    window.open(url, '_blank', 'noopener,noreferrer')
    return
  }
  window.location.href = url
}

export function CheckoutProvider({ children }) {
  const [open, setOpen] = useState(false)
  const mode = siteConfig.modalMode

  const requestCheckout = useCallback(() => {
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
