import Reveal from './Reveal'
import { IconMonitor, IconLink, IconChat, IconStar, IconTarget, IconProvision } from './Icons'

const pillars = [
  { icon: <IconMonitor />, title: 'Wavro', desc: 'Sua operação completa de Instagram — conteúdo, comentário e Direct.' },
  { icon: <IconLink />, title: 'MultiLink', desc: 'Sua central de links, ofertas e captura de lead.' },
  { icon: <IconChat />, title: 'ZynkLink', desc: 'Sua máquina de divulgação em grupos de WhatsApp.' },
  { icon: <IconStar />, title: 'Smart Showcase', desc: 'Curadoria por IA que escolhe a melhor oferta por você.' },
  { icon: <IconTarget />, title: 'FluxClick', desc: 'Controle e verdade sobre cada clique, em qualquer etapa.' },
]

export default function Virada() {
  return (
    <section className="section section-bg-mint" id="virada">
      <div className="container">
        <Reveal as="span" className="eyebrow">A virada</Reveal>
        <Reveal className="virada-copy">
          <h2 style={{ fontSize: 'clamp(21px,3.2vw,32px)', marginTop: 14, lineHeight: 1.2 }}>
            Um sistema completo, não seis produtos soltos.
          </h2>
          <p>
            O AfiliadosLAB não entrega só método. Entrega o <strong>kit de ferramentas que executa o método todos os dias</strong>, sem depender só do seu esforço manual — e que se instala sozinho, sem exigir que você vire técnico de servidor.
          </p>
          <p>
            São seis ferramentas. Uma coloca tudo no ar. As outras cinco resolvem, cada uma, um ponto específico de vazamento — e juntas formam uma operação completa: do primeiro clique de instalação até a venda recorrente.
          </p>
        </Reveal>

        <div className="pillars">
          <Reveal className="pillars-top">
            {pillars.map((p) => (
              <div className="pillar-card" key={p.title}>
                <div className="pillar-icon">{p.icon}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </Reveal>

          <div className="pillar-connectors" aria-hidden="true">
            <svg viewBox="0 0 400 26" preserveAspectRatio="none">
              <path d="M40,0 L40,13 L360,13 L360,0 M200,0 L200,13" stroke="rgba(200,255,77,0.35)" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          <Reveal className="pillar-base">
            <div className="pillar-icon"><IconProvision /></div>
            <div>
              <h4>Provision</h4>
              <p>Instala e conecta todo o ecossistema em minutos, sem conhecimento técnico.</p>
            </div>
            <span className="pillar-base-tag">Fundação — não é uma etapa do funil</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
