import { useEffect, useId, useState } from 'react'
import siteConfig from '../config/site'
import { trackLead } from '../lib/analytics'

const MODAL_COPY = {
  lead: {
    badge: 'Checkout protegido',
    title: 'Antes de ativar o kit',
    text: (
      <>
        Preencha seus dados para liberar o acesso ao checkout. Campos obrigatórios —
        usamos isso para enviar sua confirmação e orientar a instalação.
      </>
    ),
    cta: 'Enviar e ir ao checkout',
    showForm: true,
    kind: 'lead',
  },
  waitlist: {
    badge: 'Em breve',
    title: 'Novas inscrições serão abertas em breve',
    text: (
      <>
        No momento as novas entradas estão temporariamente suspensas. Deixe seus dados
        para entrar na <strong>lista de espera</strong> e ser avisado assim que as vagas
        reabrirem — com prioridade e condições exclusivas.
      </>
    ),
    highlight:
      'Quem estiver na lista recebe o aviso primeiro e acesso antecipado às condições de lançamento.',
    cta: 'Entrar na lista de espera',
    showForm: true,
    kind: 'waitlist',
  },
  beta: {
    badge: 'Beta teste',
    title: 'Seja voluntário nos testes da plataforma',
    text: (
      <>
        Estamos validando o ecossistema AfiliadosLAB com um grupo selecionado.
        Cadastre-se como <strong>voluntário de teste</strong> e avance para a
        verificação de vagas do grupo beta.
      </>
    ),
    cta: 'Quero ser voluntário',
    showForm: true,
    kind: 'beta',
  },
}

const emptyForm = { name: '', email: '', whatsapp: '' }

function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

function formatWhatsApp(value) {
  const d = onlyDigits(value).slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  return d
}

function validateForm(form) {
  const errors = {}
  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = 'Informe seu nome completo'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Informe um e-mail válido'
  }
  if (onlyDigits(form.whatsapp).length < 10) {
    errors.whatsapp = 'Informe um WhatsApp válido com DDD'
  }
  return errors
}

async function submitLead(payload) {
  const url = siteConfig.leadWebhookUrl
  if (!url) {
    console.warn('[AfiliadosLAB] VITE_LEAD_WEBHOOK_URL não configurada — seguindo sem persistir.')
    return { ok: true, skipped: true }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Falha ao enviar dados (${res.status})`)
  }
  return { ok: true }
}

export default function ActionModal({ open, mode, onClose, onGoCheckout, onGoWhatsApp, onGoRedirect }) {
  const titleId = useId()
  const copy = MODAL_COPY[mode]
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape' && !submitting) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, submitting])

  useEffect(() => {
    if (!open) {
      setForm(emptyForm)
      setErrors({})
      setSubmitError('')
      setSubmitting(false)
    }
  }, [open])

  if (!open || !copy) return null

  const needsWhatsApp = mode === 'waitlist'
  const needsRedirect = mode === 'beta'
  const missingWhatsApp = needsWhatsApp && !siteConfig.whatsappGroupUrl
  const missingRedirect = needsRedirect && !siteConfig.urlRedirect
  const missingConfig = missingWhatsApp || missingRedirect

  const onChange = (field) => (e) => {
    let value = e.target.value
    if (field === 'whatsapp') value = formatWhatsApp(value)
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setSubmitError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return

    if (copy.showForm) {
      const nextErrors = validateForm(form)
      setErrors(nextErrors)
      if (Object.keys(nextErrors).length) return
    }

    if (missingWhatsApp) {
      setSubmitError('Configure VITE_WHATSAPP_GROUP_URL no .env para este modal.')
      return
    }

    if (missingRedirect) {
      setSubmitError('Configure VITE_URL_REDIRECT no .env para o fluxo beta.')
      return
    }

    setSubmitting(true)
    setSubmitError('')

    try {
      if (copy.showForm) {
        await submitLead({
          type: copy.kind,
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          whatsapp: onlyDigits(form.whatsapp),
          source: 'afiliadoslab-landpage',
          createdAt: new Date().toISOString(),
        })
        trackLead({ lead_type: copy.kind })
      }

      if (mode === 'lead') onGoCheckout()
      else if (mode === 'beta') onGoRedirect()
      else onGoWhatsApp()
    } catch (err) {
      setSubmitError(err.message || 'Não foi possível enviar. Tente novamente.')
      setSubmitting(false)
    }
  }

  return (
    <div
      className="action-modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose()
      }}
    >
      <div
        className="action-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="action-modal-glow" aria-hidden="true" />

        <header className="action-modal-header">
          <span className="action-modal-badge">{copy.badge}</span>
          <button
            type="button"
            className="action-modal-close"
            onClick={onClose}
            disabled={submitting}
            aria-label="Fechar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="action-modal-body">
          <h2 id={titleId}>{copy.title}</h2>
          <p className="action-modal-text">{copy.text}</p>

          {copy.highlight && (
            <div className="action-modal-highlight">
              <strong>Bonus da lista</strong>
              <p>{copy.highlight}</p>
            </div>
          )}

          {missingWhatsApp && (
            <p className="action-modal-alert">
              Falta configurar o link do grupo WhatsApp (`VITE_WHATSAPP_GROUP_URL`).
            </p>
          )}

          {missingRedirect && (
            <p className="action-modal-alert">
              Falta configurar o redirect do beta (`VITE_URL_REDIRECT`).
            </p>
          )}

          <form className="action-modal-form" onSubmit={handleSubmit} noValidate>
            {copy.showForm && (
              <div className="action-modal-fields">
                <label className="action-field">
                  <span>Nome</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Seu nome completo"
                    value={form.name}
                    onChange={onChange('name')}
                    aria-invalid={Boolean(errors.name)}
                    disabled={submitting}
                  />
                  {errors.name && <em>{errors.name}</em>}
                </label>

                <label className="action-field">
                  <span>E-mail</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="voce@email.com"
                    value={form.email}
                    onChange={onChange('email')}
                    aria-invalid={Boolean(errors.email)}
                    disabled={submitting}
                  />
                  {errors.email && <em>{errors.email}</em>}
                </label>

                <label className="action-field">
                  <span>WhatsApp</span>
                  <input
                    type="tel"
                    name="whatsapp"
                    autoComplete="tel"
                    placeholder="(11) 99999-9999"
                    value={form.whatsapp}
                    onChange={onChange('whatsapp')}
                    aria-invalid={Boolean(errors.whatsapp)}
                    disabled={submitting}
                  />
                  {errors.whatsapp && <em>{errors.whatsapp}</em>}
                </label>
              </div>
            )}

            {submitError && <p className="action-modal-alert">{submitError}</p>}

            <div className="action-modal-actions">
              <button
                type="submit"
                className="btn btn-primary action-modal-cta"
                disabled={submitting || missingConfig}
              >
                {submitting ? 'Enviando…' : copy.cta}
                {!submitting && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                className="action-modal-dismiss"
                onClick={onClose}
                disabled={submitting}
              >
                Agora não
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
