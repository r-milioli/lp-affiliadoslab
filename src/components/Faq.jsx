import Reveal from './Reveal'
import Accordion from './Accordion'

const items = [
  {
    q: 'O que está incluso no kit AfiliadosLAB?',
    a: 'As seis ferramentas do ecossistema — Provision, Wavro, MultiLink, ZynkLink, Smart Showcase e FluxClick — mais acesso à área de membros com videoaulas.',
  },
  {
    q: 'Preciso saber programar para usar as ferramentas?',
    a: 'Não. O Provision instala tudo por formulário, e cada ferramenta tem fluxo guiado: conectar conta → configurar → operar.',
  },
  {
    q: 'As ferramentas funcionam separadas ou só em conjunto?',
    a: 'Cada uma resolve uma dor real sozinha, mas o valor máximo está no conjunto — é aí que o funil fecha ponta a ponta.',
  },
  {
    q: 'Como funciona a instalação/licença (self-hosted)?',
    a: 'As ferramentas rodam sob sua própria licença, no seu ambiente — o Provision cuida de toda a instalação técnica por você.',
  },
  {
    q: 'Quanto tempo leva para colocar tudo no ar?',
    a: 'Menos de 10 minutos para o ecossistema inteiro estar no ar, com domínio já apontado.',
  },
  {
    q: 'A área de membros ensina só a usar as ferramentas ou também a vender/divulgar?',
    a: 'Os dois: implementação de cada ferramenta, além de trilhas de crescimento orgânico de grupo e Meta Ads.',
  },
]

export default function Faq() {
  return (
    <section className="section section-bg-mint" id="faq">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2>Perguntas frequentes</h2>
        </Reveal>
        <Reveal>
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  )
}
