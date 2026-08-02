import Reveal from './Reveal'
import { IconArrow } from './Icons'
import { CheckoutButton } from '../context/CheckoutContext'

export default function CtaFinal() {
  return (
    <section className="section section-bg-deep cta-final">
      <div className="container">
        <div className="cta-final-inner">
          <Reveal as="span" className="eyebrow">Última chamada</Reveal>
          <Reveal as="h2">Enquanto você lê isso, algum afiliado está vendendo no automático.</Reveal>
          <Reveal as="p" className="sub">
            Postando na hora certa. Respondendo o lead na hora certa. Entregando a oferta certa — sem estar online. Ative o kit AfiliadosLAB e faça o mesmo.
          </Reveal>
          <Reveal className="hero-cta-row">
            <CheckoutButton className="btn btn-primary">
              Quero ativar o kit completo
              <IconArrow />
            </CheckoutButton>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
