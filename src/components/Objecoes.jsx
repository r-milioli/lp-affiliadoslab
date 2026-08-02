import Reveal from './Reveal'
import Accordion from './Accordion'

const items = [
  {
    q: 'Já uso ferramentas grátis/genéricas (Linktree, Bitly, Manychat...)',
    a: 'Ferramenta genérica resolve uma tarefa isolada. O kit AfiliadosLAB resolve o funil inteiro — conectado, com dado real e sem depender de plano limitado de terceiros.',
  },
  {
    q: 'Não sou técnico, tenho medo de não conseguir configurar',
    a: 'O Provision instala e conecta todo o ecossistema via formulário simples — sem Docker, sem Linux, sem servidor na mão. Em menos de 10 minutos está no ar, com fluxo guiado em cada ferramenta.',
  },
  {
    q: 'Tenho medo de ban no WhatsApp/Instagram',
    a: 'As automações usam intervalos humanizados, disclosure obrigatório e respeitam os limites oficiais das plataformas — não é disparo robótico descontrolado.',
  },
  {
    q: 'Já tenho um pouco disso separado, em ferramentas diferentes',
    a: 'E é exatamente aí que o dinheiro vaza: dado quebrado entre sistemas. O kit entrega tudo no mesmo ecossistema, se conversando — do post no Instagram até o link dentro do grupo.',
  },
  {
    q: 'É caro ter 6 ferramentas',
    a: 'Você não está comprando 6 produtos soltos — está comprando a operação completa de um afiliado profissional, já instalada e conectada, dentro de um único kit.',
  },
  {
    q: 'E se eu não souber nem por onde começar depois de instalar?',
    a: 'A aquisição dá acesso a uma área de membros com videoaulas passo a passo de cada ferramenta, além de conteúdo de como encher grupo organicamente e como usar Meta Ads para isso. Você não fica sozinho depois da instalação.',
  },
]

export default function Objecoes() {
  return (
    <section className="section" id="objecoes">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Antes de você decidir</span>
          <h2>As perguntas que você provavelmente está se fazendo agora</h2>
        </Reveal>
        <Reveal>
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  )
}
