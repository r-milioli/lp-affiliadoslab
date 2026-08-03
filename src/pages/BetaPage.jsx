import { useCallback, useEffect, useId, useState } from 'react'
import Logo from '../components/Logo'
import siteConfig from '../config/site'
import { goToUrl } from '../context/CheckoutContext'
import { checkBetaAvailability } from '../lib/betaSlots'

const LOADING_FALLBACK = 'Verificando disponibilidade…'

function BetaCheckModal({ open, phase, progress, label, message, onClose, onRetry, onJoinGroup }) {
  const titleId = useId()

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape' && phase !== 'loading') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, phase, onClose])

  if (!open) return null

  return (
    <div className="beta-check-overlay" role="presentation">
      <div
        className="beta-check-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="beta-check-glow" aria-hidden="true" />

        {phase === 'loading' && (
          <div className="beta-check-panel">
            <div className="beta-check-spinner" aria-hidden="true" />
            <h2 id={titleId}>Verificando vagas</h2>
            <p className="beta-check-label">{label || LOADING_FALLBACK}</p>
            <div
              className="beta-check-progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <span style={{ width: `${Math.max(6, progress)}%` }} />
            </div>
            <p className="beta-check-hint">Isso leva só alguns segundos.</p>
          </div>
        )}

        {phase === 'available' && (
          <div className="beta-check-panel">
            <span className="beta-check-badge">Vaga confirmada</span>
            <h2 id={titleId}>Parabéns!</h2>
            <p className="beta-check-message">
              {message ||
                'Existe vaga no grupo de beta testes. Clique no botão abaixo e entre no grupo de WhatsApp.'}
            </p>
            <div className="beta-check-actions">
              <button type="button" className="btn btn-primary" onClick={onJoinGroup}>
                Entrar no grupo
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Fechar
              </button>
            </div>
          </div>
        )}

        {phase === 'full' && (
          <div className="beta-check-panel">
            <span className="beta-check-badge">Grupo beta</span>
            <h2 id={titleId}>Sem vagas no momento</h2>
            <p className="beta-check-message">
              {message ||
                'No momento não existe vaga para usuários beta teste. Fique à vontade para tentar novamente mais tarde — pode ser que algum participante tenha desistido desse processo.'}
            </p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Entendi, voltar
            </button>
          </div>
        )}

        {phase === 'error' && (
          <div className="beta-check-panel">
            <span className="beta-check-badge beta-check-badge--warn">Atenção</span>
            <h2 id={titleId}>Não foi possível verificar</h2>
            <p className="beta-check-message">{message}</p>
            <div className="beta-check-actions">
              <button type="button" className="btn btn-primary" onClick={onRetry}>
                Tentar de novo
              </button>
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BetaPage() {
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState('loading')
  const [progress, setProgress] = useState(0)
  const [label, setLabel] = useState(LOADING_FALLBACK)
  const [message, setMessage] = useState('')

  const runCheck = useCallback(async () => {
    setOpen(true)
    setPhase('loading')
    setProgress(0)
    setLabel(LOADING_FALLBACK)
    setMessage('')

    try {
      if (!siteConfig.betaWebhookUrl) {
        throw new Error('Configure VITE_BETA_WEBHOOK_URL no .env para verificar as vagas.')
      }

      const result = await checkBetaAvailability(({ progress: p, label: l }) => {
        setProgress(p)
        setLabel(l)
      })

      if (result.status === 'available') {
        if (!siteConfig.whatsappGroupUrl) {
          throw new Error('Há vaga, mas VITE_WHATSAPP_GROUP_URL não está configurada.')
        }
        setPhase('available')
        setMessage(
          'Existe vaga no grupo de beta testes. Clique no botão abaixo e entre no grupo de WhatsApp.',
        )
        return
      }

      setPhase('full')
      setMessage(
        'No momento não existe vaga para usuários beta teste. Fique à vontade para tentar novamente mais tarde — pode ser que algum participante tenha desistido desse processo.',
      )
    } catch (err) {
      setPhase('error')
      setMessage(err.message || 'Falha inesperada ao verificar vagas.')
    }
  }, [])

  const joinGroup = useCallback(() => {
    goToUrl(siteConfig.whatsappGroupUrl)
  }, [])

  const closeModal = useCallback(() => {
    if (phase === 'loading') return
    setOpen(false)
  }, [phase])

  return (
    <div className="beta-page">
      <header className="beta-page-top">
        <div className="container beta-page-top-inner">
          <Logo href="/" />
          <a className="beta-page-home" href="/">
            Voltar à página inicial
          </a>
        </div>
      </header>

      <main className="beta-page-main">
        <div className="container beta-page-card">
          <span className="eyebrow">Beta teste · AfiliadosLAB</span>
          <h1>Verifique se ainda há vaga no grupo de beta testes</h1>
          <p>
            As vagas do grupo são limitadas. Clique no botão abaixo para consultar, em tempo real,
            se ainda é possível entrar. Se houver disponibilidade, você poderá acessar o grupo
            de WhatsApp.
          </p>

          <button type="button" className="btn btn-primary beta-page-cta" onClick={runCheck}>
            Verificar se ainda há vaga
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>

          <p className="beta-page-note">
            A consulta leva poucos segundos e usa a capacidade configurada do grupo
            {siteConfig.betaCapacity > 0 ? ` (${siteConfig.betaCapacity} participantes)` : ''}.
          </p>
        </div>
      </main>

      <BetaCheckModal
        open={open}
        phase={phase}
        progress={progress}
        label={label}
        message={message}
        onClose={closeModal}
        onRetry={runCheck}
        onJoinGroup={joinGroup}
      />
    </div>
  )
}
