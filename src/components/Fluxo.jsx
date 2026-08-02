import Reveal from './Reveal'
import { IconTarget } from './Icons'

const steps = [
  {
    title: 'Wavro publica no Instagram',
    desc: 'Postagem estratégica vai ao ar, agendada e consistente.',
  },
  {
    title: 'O lead interage ou clica no link da bio',
    desc: 'Comentário ou clique — o primeiro sinal de intenção.',
  },
  {
    title: 'MultiLink captura o lead',
    desc: 'Recebe o clique e redireciona para o grupo de WhatsApp certo.',
  },
  {
    title: 'ZynkLink administra o grupo',
    desc: 'Dispara as ofertas no horário certo, em escala.',
    parallel:
      'Smart Showcase cura e extrai os links de produto dos marketplaces, abastecendo o grupo com oferta nova continuamente.',
  },
  {
    title: 'A venda acontece dentro do grupo',
    desc: 'Sem parte manual no meio do caminho.',
  },
]

export default function Fluxo() {
  return (
    <section className="section section-bg-mint" id="fluxo">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Como elas se conectam</span>
          <h2>O caminho de uma venda, com o kit inteiro ligado</h2>
          <p>Não são seis produtos avulsos. É um sistema — do primeiro post no Instagram até a venda dentro do grupo.</p>
        </Reveal>

        <Reveal className="flow-diagram">
          <div className="flow-steps">
            {steps.map((step, i) => (
              <div className="flow-step" key={step.title}>
                <div className="flow-step-dot">{i + 1}</div>
                <div className="flow-step-body">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                  {step.parallel && (
                    <div className="flow-step-parallel">
                      <strong>Em paralelo</strong>
                      {step.parallel}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flow-base-note">
            <IconTarget />
            <div>
              <strong>Por baixo de toda essa jornada</strong> — bio, grupo, oferta curada, anúncio — o FluxClick gerencia e mede cada link, em cada etapa. E o Provision é a base que colocou tudo isso no ar, uma vez só, sem servidor na mão.
            </div>
          </div>
        </Reveal>

        <Reveal as="p" className="flow-closing">
          Cada ferramenta sozinha já resolve uma dor real. Juntas, elas fecham o funil inteiro — sem você precisar entender uma linha de código para colocar tudo isso no ar.
        </Reveal>
      </div>
    </section>
  )
}
