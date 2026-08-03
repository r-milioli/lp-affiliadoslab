import Reveal from './Reveal'
import { IconCheck, IconShield } from './Icons'

const stats = [
  { num: '180+', label: 'afiliados ativos no ecossistema' },
  { num: '12 mil', label: 'ofertas curadas por mês' },
  { num: '640+', label: 'grupos administrados no automático' },
]

const testimonials = [
  {
    quote:
      '"Antes eu perdia o dia colando promoção em 20 grupos. Com o kit, o envio roda sozinho e eu só olho o que performou. Em 3 semanas o volume de clique no grupo mais que dobrou."',
    name: 'Camila Rocha',
    role: 'Afiliada Shopee · 2 meses de uso',
  },
  {
    quote:
      '"O que mudou foi parar de operar no achismo. FluxClick + MultiLink me mostraram qual CTA realmente convertia. Cortei anúncio ruim e sobrou verba pro que vende."',
    name: 'Diego Martins',
    role: 'Tráfego pago · 45 dias de uso',
  },
  {
    quote:
      '"Eu travava na instalação. O Provision colocou tudo no ar sem eu mexer em servidor. Hoje Wavro responde Direct e eu uso o tempo pra criar oferta, não pra apagar incêndio."',
    name: 'Renata Alves',
    role: 'Instagram + grupos · 1 mês de uso',
  },
]

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function Prova() {
  return (
    <section className="section" id="prova">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Prova e autoridade</span>
          <h2>Quem já automatizou, não volta atrás</h2>
        </Reveal>

        <Reveal className="stats-row">
          {stats.map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="num">{s.num}</div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </Reveal>

        <Reveal className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={`${t.name}-${i}`}>
              <p className="quote">{t.quote}</p>
              <div className="testimonial-who">
                <span className="avatar" aria-hidden="true">{getInitials(t.name)}</span>
                <div>
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="trust-badges">
          <div className="trust-badge"><IconShield />Self-hosted — licença própria</div>
          <div className="trust-badge"><IconCheck />Sem plano limitado de terceiros</div>
          <div className="trust-badge"><IconCheck />Suporte guiado na área de membros</div>
        </Reveal>
      </div>
    </section>
  )
}
