import { useState } from 'react'
import Reveal from './Reveal'
import ToolModal from './ToolModal'
import { IconArrow, IconCheck } from './Icons'
import { toolsDetails } from '../data/toolsDetails'
import imgProvision from '../assets/provision.webp'
import imgWavro from '../assets/wavro.webp'
import imgMultilink from '../assets/multilink.webp'
import imgZynklink from '../assets/zynklink.webp'
import imgSmartShowcase from '../assets/smartShowcase.webp'
import imgFluxclick from '../assets/fluxclik.webp'

const tools = [
  {
    detailId: 'provision',
    tag: 'Etapa 0 — Fundação',
    title: 'Provision — seu ecossistema no ar, sem tocar em um terminal',
    pain: 'Mesmo entendendo o valor de ter ferramentas próprias, sob seu controle, a maioria dos afiliados trava antes de começar: instalar servidor, configurar Docker, apontar DNS. Isso normalmente significa pagar caro por um técnico ou desistir no meio do caminho.',
    items: [
      'Instalação via formulário simples — sem Docker, Linux ou rede',
      'Apontamento de DNS automático, com integração nativa ao Cloudflare',
      'Todo o ecossistema no ar, pronto para uso, em menos de 10 minutos',
    ],
    closing: (
      <>
        <strong>Enquanto uns ainda adiam por medo de &quot;mexer com servidor&quot;,</strong> você preenche um formulário e já está no mesmo patamar técnico de quem automatizou primeiro.
      </>
    ),
    visualClass: 'tv-provision',
    image: imgProvision,
    alt: 'Print da plataforma Provision',
  },
  {
    detailId: 'wavro',
    tag: 'Etapa 1 — Origem do lead',
    title: 'Wavro — a operação de Instagram que você não faz sozinho no celular',
    pain: 'Seu Instagram é canal de conteúdo, atendimento e venda ao mesmo tempo, todos os dias. Sozinho, você não consegue postar no horário certo, responder todo comentário e toda DM na hora — e ainda assim vender.',
    items: [
      'Agendamento de posts, Reels e Stories',
      'Automação comentário → Direct, resposta na hora',
      'Chatbot de DM com fluxo visual e handoff para humano',
    ],
    closing: (
      <>
        <strong>Você não precisa mais ficar de olho no celular o dia inteiro.</strong> O Wavro responde por você, no mesmo segundo, enquanto você faz qualquer outra coisa.
      </>
    ),
    visualClass: 'tv-wavro',
    image: imgWavro,
    alt: 'Print da plataforma Wavro',
  },
  {
    detailId: 'multilink',
    tag: 'Etapa 2 — Captura',
    title: 'MultiLink — seus links em um só lugar',
    pain: 'Seus links, ofertas e contatos estão espalhados entre bio, Stories, Direct e grupo. Cada campanha nova exige editar tudo de novo — e quando o visitante clica, ele simplesmente some.',
    items: [
      'Recebe o clique que vem do link da bio, gerenciado pelo Wavro',
      'Página profissional própria reunindo todos os links e ofertas',
      'Captura o lead e redireciona direto para o grupo certo',
    ],
    closing: (
      <>
        <strong>Clique sem lead é vaidade.</strong> No MultiLink, o lead que chega pelo link da bio é capturado — e enviado direto para o grupo, sem você mover um dedo.
      </>
    ),
    visualClass: 'tv-multilink',
    image: imgMultilink,
    alt: 'Print da plataforma MultiLink',
  },
  {
    detailId: 'zynklink',
    tag: 'Etapa 3 — Distribuição',
    title: 'ZynkLink — pare de colar promoção. Comece a operar divulgação.',
    pain: 'Você tem 15, 20, 30 grupos de WhatsApp — e divulga oferta copiando e colando em cada um, na mão. Não sabe quantos membros entraram ou saíram, nem o que realmente performa.',
    items: [
      'Administra o grupo para onde o MultiLink redirecionou o lead',
      'Envios agendados e recorrentes, em vários grupos',
      'Métricas de audiência e dashboard de performance',
    ],
    closing: (
      <>
        <strong>De &quot;tenho grupos&quot; para &quot;tenho uma máquina de divulgação&quot;.</strong> Ela roda sozinha, no horário certo, enquanto quem ainda faz na mão vê o resultado cair.
      </>
    ),
    visualClass: 'tv-zynklink',
    image: imgZynklink,
    alt: 'Print da plataforma ZynkLink',
  },
  {
    detailId: 'smart-showcase',
    tag: 'Etapa 4 — Curadoria (em paralelo)',
    title: 'Smart Showcase — a vitrine inteligente que escolhe a oferta por você',
    pain: 'Garimpar promoção boa no Mercado Livre, Amazon e Shopee, todo santo dia, comparando preço manualmente, é trabalho que consome o dia inteiro — e ainda assim você às vezes publica a oferta errada.',
    items: [
      'Curadoria e extração automática dos links de produto',
      'IA que agrupa ofertas parecidas e escolhe a melhor',
      'Geração automática do link de afiliado, sem tag errada',
    ],
    closing: (
      <>
        <strong>Você para de caçar promoção todo santo dia.</strong> Passa a operar uma curadoria profissional, no automático, alimentando o grupo continuamente.
      </>
    ),
    visualClass: 'tv-showcase',
    image: imgSmartShowcase,
    alt: 'Print da plataforma Smart Showcase',
  },
  {
    detailId: 'fluxclick',
    tag: 'Camada transversal — em toda etapa',
    title: 'FluxClick — controle o clique. Domine a campanha.',
    pain: 'Do link da bio ao link do grupo, da oferta curada ao anúncio — cada ponto é, na prática, um clique que precisa ser medido. Sem uma camada única de controle, ninguém sabe o que realmente converteu.',
    items: [
      'Gerencia todos os links do ecossistema, em qualquer etapa',
      'UTM padronizado e métricas em tempo real',
      'Proteção de link: senha, expiração, limite de cliques',
    ],
    closing: (
      <>
        <strong>Sem controle do clique, você não controla a campanha — só torce.</strong> Enquanto uns decidem no achismo, você decide com dado.
      </>
    ),
    visualClass: 'tv-fluxclick',
    image: imgFluxclick,
    alt: 'Print da plataforma FluxClick',
  },
]

export default function Ferramentas() {
  const [activeId, setActiveId] = useState(null)
  const activeTool = activeId ? toolsDetails[activeId] : null
  const activeImage = tools.find((t) => t.detailId === activeId)?.image

  return (
    <section className="section" id="ferramentas">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Tour guiado</span>
          <h2>Seis ferramentas. Uma jornada só.</h2>
          <p>Na ordem real de uso: da instalação até o controle de cada clique — cada bloco resolve um ponto específico de vazamento.</p>
        </Reveal>

        {tools.map((tool) => (
          <Reveal key={tool.title} className="tool-block">
            <div>
              <span className="tool-step-tag">{tool.tag}</span>
              <h3>{tool.title}</h3>
              <p className="pain">{tool.pain}</p>
              <ul className="tool-list">
                {tool.items.map((item) => (
                  <li key={item}>
                    <IconCheck />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="tool-closing">{tool.closing}</p>
              <button
                type="button"
                className="btn btn-outline-neon tool-detail-btn"
                onClick={() => setActiveId(tool.detailId)}
              >
                Ver detalhes de {toolsDetails[tool.detailId].name}
                <IconArrow />
              </button>
            </div>
            <div className={`tool-visual ${tool.visualClass}`}>
              <img src={tool.image} alt={tool.alt} className="tool-visual-img" loading="lazy" />
            </div>
          </Reveal>
        ))}
      </div>

      <ToolModal
        tool={activeTool}
        image={activeImage}
        onClose={() => setActiveId(null)}
      />
    </section>
  )
}
