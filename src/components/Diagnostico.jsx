import Reveal from './Reveal'
import { IconLink, IconClock, IconChart, IconChat, IconTimer } from './Icons'

const leaks = [
  {
    icon: <IconLink />,
    title: 'Links espalhados',
    what: 'Bio, Stories, grupo e Direct apontam para lugares diferentes.',
    consequence: 'Tráfego se perde antes de virar lead',
  },
  {
    icon: <IconClock />,
    title: 'Clique sem controle',
    what: 'Você não sabe qual link realmente converteu.',
    consequence: 'Decisão no achismo, dinheiro de anúncio queimado',
  },
  {
    icon: <IconChart />,
    title: 'Oferta escolhida no cansaço',
    what: 'Você garimpa promoção manualmente, todo dia.',
    consequence: 'Publica oferta mediana por falta de tempo',
  },
  {
    icon: <IconChat />,
    title: 'WhatsApp no copia-e-cola',
    what: 'Cada grupo recebe promoção na mão, sem horário fixo.',
    consequence: 'Baixo volume, timing perdido',
  },
  {
    icon: <IconTimer />,
    title: 'Instagram só quando dá tempo',
    what: 'Comentário e Direct ficam sem resposta por horas.',
    consequence: 'Lead quente esfria e some',
  },
]

export default function Diagnostico() {
  return (
    <section className="section" id="diagnostico">
      <div className="container">
        <Reveal as="span" className="eyebrow">O diagnóstico</Reveal>
        <Reveal className="diag-copy" style={{ marginTop: 14 }}>
          <p>
            Você acorda e já abre o Instagram pra responder comentário. Cola a mesma promoção em 15 grupos de WhatsApp, um por um, torcendo pra alguém ver a tempo. Edita bio, Stories e mensagem toda vez que muda de campanha. Vai dormir tarde porque <strong>&quot;ainda precisa responder aquele Direct&quot;</strong>. No fim do mês, você não sabe o que realmente vendeu — só sabe que se esgotou tentando dar conta de tudo sozinho.
          </p>
          <p>
            E enquanto você faz isso, tem afiliado que virou as costas pro celular. Não porque trabalha menos — porque automatizou o que te consome o dia inteiro. Ele não está mais rápido que você. Ele parou de operar na mão o que já pode rodar sozinho.
          </p>
          <div className="diag-callout">
            Isso não é falta de esforço. É falta de sistema. E cada mês sem sistema é um mês que separa você de quem já saiu na frente.
          </div>
        </Reveal>

        <div className="leak-grid">
          {leaks.map((leak) => (
            <Reveal key={leak.title} className="leak-card">
              <div className="leak-icon">{leak.icon}</div>
              <h3>{leak.title}</h3>
              <p className="what">{leak.what}</p>
              <span className="consequence">{leak.consequence}</span>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="closing-question">
          Quantos desses 5 pontos estão sangrando a sua operação agora — enquanto outro afiliado já resolveu todos eles?
        </Reveal>
      </div>
    </section>
  )
}
