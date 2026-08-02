import heroImage from '../assets/hero-ecossistema.jpg'
import Reveal from './Reveal'
import { IconArrow } from './Icons'

export default function Hero() {
  return (
    <section
      className="hero"
      style={{ '--hero-image': `url(${heroImage})` }}
    >
      <div className="container">
        <Reveal className="hero-content">
          <h1>
            Enquanto você se esgota operando sozinho, tem afiliado que{' '}
            <em>automatizou tudo</em> e já saiu na sua frente.
          </h1>
          <p className="hero-sub">
            Seis ferramentas que concentram links, curam ofertas e automatizam WhatsApp e Instagram por você.
          </p>
          <div className="hero-cta-row">
            <a href="#oferta" className="btn btn-primary">
              Quero conhecer o kit completo
              <IconArrow />
            </a>
            <a href="#fluxo" className="hero-link-secondary">
              Ver como as ferramentas funcionam juntas ↓
            </a>
          </div>
          <div className="hero-trust">
            <span>SELF-HOSTED</span>
            <span className="dot" />
            <span>INSTALAÇÃO EM MINUTOS</span>
            <span className="dot" />
            <span>SEM CÓDIGO</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
