import Reveal from './Reveal'
import { IconCheck, IconShield } from './Icons'

const stats = [
  { num: '—', label: 'afiliados ativos no ecossistema' },
  { num: '—', label: 'ofertas curadas por mês' },
  { num: '—', label: 'grupos administrados no automático' },
]

const testimonials = [
  { quote: '"Substituir por depoimento real — resultado antes/depois de um afiliado que usa o kit."', name: 'Nome do afiliado', role: 'Nicho / tempo de uso' },
  { quote: '"Substituir por depoimento real — resultado antes/depois de um afiliado que usa o kit."', name: 'Nome do afiliado', role: 'Nicho / tempo de uso' },
  { quote: '"Substituir por depoimento real — resultado antes/depois de um afiliado que usa o kit."', name: 'Nome do afiliado', role: 'Nicho / tempo de uso' },
]

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
                <span className="avatar" />
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
