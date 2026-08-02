import Reveal from './Reveal'

const tracks = [
  {
    num: 'Trilha 01',
    title: 'Implementação guiada',
    desc: 'Passo a passo de instalação com o Provision e configuração de cada uma das cinco ferramentas de funil.',
  },
  {
    num: 'Trilha 02',
    title: 'Crescimento orgânico de grupo',
    desc: 'Como encher grupo de WhatsApp de forma orgânica, sem depender só de anúncio.',
  },
  {
    num: 'Trilha 03',
    title: 'Meta Ads para grupos',
    desc: 'Como usar anúncios no Meta Ads especificamente para atrair pessoas para o grupo.',
  },
]

export default function Membros() {
  return (
    <section className="section" id="membros">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Área de membros</span>
          <h2>Você não recebe só a caixa de ferramentas</h2>
          <p>
            Ao adquirir o AfiliadosLAB, você recebe uma área de membros completa, com videoaulas orientando cada passo — da instalação até a operação diária de cada ferramenta.
          </p>
        </Reveal>

        <div className="tracks-grid">
          {tracks.map((track) => (
            <Reveal key={track.num} className="track-card">
              <span className="track-num">{track.num}</span>
              <h4>{track.title}</h4>
              <p>{track.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="members-closing">
          Você não recebe só a caixa de ferramentas. Recebe o manual de operação de quem já sabe fazer isso funcionar.
        </Reveal>
      </div>
    </section>
  )
}
