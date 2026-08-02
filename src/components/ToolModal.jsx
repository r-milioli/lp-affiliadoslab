import { useEffect, useId, useRef } from 'react'
import { IconCheck } from './Icons'
import { CheckoutButton } from '../context/CheckoutContext'

export default function ToolModal({ tool, image, onClose }) {
  const titleId = useId()
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!tool) return undefined

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [tool, onClose])

  if (!tool) return null

  return (
    <div
      className="tool-modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="tool-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
      >
        <div className="tool-modal-glow" aria-hidden="true" />

        <header className="tool-modal-header">
          <div className="tool-modal-heading">
            <span className="eyebrow">Detalhes da ferramenta</span>
            <h2 id={titleId}>{tool.name}</h2>
            <p className="tool-modal-tagline">{tool.tagline}</p>
          </div>
          <button
            type="button"
            className="tool-modal-close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Fechar modal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="tool-modal-scroll">
          {image && (
            <div className="tool-modal-hero">
              <img src={image} alt={`Print da plataforma ${tool.name}`} />
            </div>
          )}

          <section className="tool-modal-section">
            <h3>O problema</h3>
            <p>{tool.problem}</p>
          </section>

          <section className="tool-modal-section tool-modal-promise">
            <h3>A promessa</h3>
            <p>{tool.promise}</p>
          </section>

          <section className="tool-modal-section">
            <h3>O que a ferramenta faz</h3>
            <div className="tool-modal-features">
              {tool.features.map((group) => (
                <article key={group.title} className="tool-modal-feature">
                  <h4>{group.title}</h4>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>
                        <IconCheck />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="tool-modal-section">
            <h3>Benefícios</h3>
            <ul className="tool-modal-benefits">
              {tool.benefits.map((item) => (
                <li key={item}>
                  <IconCheck />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="tool-modal-section tool-modal-summary">
            <h3>Em resumo</h3>
            <p>{tool.summary}</p>
          </section>
        </div>

        <footer className="tool-modal-footer">
          <CheckoutButton className="btn btn-primary" onClick={onClose}>
            Quero o kit completo
          </CheckoutButton>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Fechar
          </button>
        </footer>
      </div>
    </div>
  )
}
