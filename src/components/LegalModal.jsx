import { useEffect, useId, useRef } from 'react'
import { legalDocuments } from '../data/legalDocuments'

export default function LegalModal({ docKey, onClose }) {
  const doc = docKey ? legalDocuments[docKey] : null
  const titleId = useId()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!doc) return undefined

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
  }, [doc, onClose])

  if (!doc) return null

  return (
    <div
      className="legal-modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="legal-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="legal-modal-header">
          <div>
            <span className="legal-modal-badge">Documento legal</span>
            <h2 id={titleId}>{doc.title}</h2>
            <p className="legal-modal-updated">Atualizado em {doc.updatedAt}</p>
          </div>
          <button
            type="button"
            className="legal-modal-close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Fechar modal"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="legal-modal-scroll">
          {doc.sections.map((section) => (
            <section key={section.heading} className="legal-modal-section">
              <h3>{section.heading}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
