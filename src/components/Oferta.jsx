import Reveal from './Reveal'
import { IconArrow, IconCheck } from './Icons'
import siteConfig, { formatPriceBRL } from '../config/site'
import { CheckoutButton } from '../context/CheckoutContext'
import garantiaSeal from '../assets/garantias.webp'
import garantiaBg from '../assets/garantia-bg.webp'

const includes = [
  { t: 'Provision', d: 'Instalação automática de todo o ecossistema' },
  { t: 'Wavro', d: 'Automação completa de Instagram' },
  { t: 'MultiLink', d: 'Hub de links e captura de lead' },
  { t: 'ZynkLink', d: 'Automação de grupos de WhatsApp' },
  { t: 'Smart Showcase', d: 'Curadoria de ofertas por IA' },
  { t: 'FluxClick', d: 'Controle e rastreio de todos os links' },
  { t: 'Área de membros', d: 'Videoaulas de implementação + crescimento' },
]

const trust = [
  'Acesso imediato após a confirmação',
  'Licença self-hosted do ecossistema',
  'Suporte guiado na área de membros',
]

export default function Oferta() {
  const [priceInt, priceCents = '00'] = formatPriceBRL(siteConfig.productPrice).split(',')

  return (
    <section className="section" id="oferta">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">A oferta</span>
          <h2>Você não precisa escolher entre trabalhar mais ou vender mais. Precisa de sistema.</h2>
          <p>
            O kit AfiliadosLAB entrega as seis ferramentas que tiram sua operação do improviso — instaladas, conectadas e trabalhando juntas, todos os dias. E você não aprende sozinho.
          </p>
        </Reveal>

        <Reveal className="pricing-wrap">
          <div className="pricing-copy">
            <h3>Tudo o que entra no kit</h3>
            <div className="pricing-includes">
              {includes.map((item) => (
                <div className="pricing-include" key={item.t}>
                  <IconCheck />
                  <div>
                    <strong>{item.t}</strong>
                    <span>{item.d}</span>
                  </div>
                </div>
              ))}
            </div>
            <ul className="pricing-trust">
              {trust.map((item) => (
                <li key={item}>
                  <IconCheck />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="pricing-card">
            <div className="pricing-card-glow" aria-hidden="true" />
            <span className="pricing-badge">Acesso completo ao ecossistema</span>
            <p className="pricing-label">Investimento único</p>
            <div className="pricing-price" aria-label={`R$ ${priceInt},${priceCents}`}>
              <span className="pricing-currency">R$</span>
              <span className="pricing-value">
                <span className="pricing-int">{priceInt}</span>
                <span className="pricing-decimal">,{priceCents}</span>
              </span>
            </div>
            {siteConfig.installmentsText && (
              <p className="pricing-installments">{siteConfig.installmentsText}</p>
            )}
            <p className="pricing-note">Pagamento único — sem mensalidade escondida de ferramenta genérica.</p>

            <CheckoutButton className="btn btn-primary pricing-cta">
              Quero ativar o kit agora
              <IconArrow />
            </CheckoutButton>

            <div className="pricing-guarantee">
              <img
                className="pricing-guarantee-bg"
                src={garantiaBg}
                alt=""
                aria-hidden="true"
              />
              <img
                className="pricing-guarantee-seal"
                src={garantiaSeal}
                alt="Selo de garantia de 7 dias"
              />
              <div className="pricing-guarantee-copy">
                <span className="pricing-guarantee-tag">Risco zero</span>
                <strong>Garantia incondicional de 7 dias</strong>
                <p>
                  Se não fizer sentido para a sua operação, você pede o reembolso em até 7 dias — sem letra miúda para dificultar.
                </p>
              </div>
            </div>

            <p className="pricing-secure">Checkout seguro · Acesso liberado após a confirmação</p>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}
