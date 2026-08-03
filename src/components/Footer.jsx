import { useState } from 'react'
import Logo from './Logo'
import LegalModal from './LegalModal'
import { legalLinks } from '../data/legalDocuments'

export default function Footer() {
  const [openDoc, setOpenDoc] = useState(null)

  return (
    <footer className="site-footer">
      <div className="container footer-legal">
        <p className="footer-disclaimer">
          <strong>ESTE SITE NÃO É do FACEBOOK:</strong>{' '}
          Este site não faz parte do site do Facebook ou do Facebook Inc. Além disso, este site NÃO é
          endossado pelo Facebook de nenhuma maneira. FACEBOOK é comercial independente da FACEBOOK.
          Aviso Legal: “Nenhuma informação contida neste produto deve ser interpretada como uma
          afirmação da obtenção de resultados. Qualquer referência ao desempenho passado ou potencial
          de uma estratégia abordada no conteúdo não é, e não deve ser interpretada como uma
          recomendação ou como garantia de qualquer resultado específico.”
        </p>

        <nav className="footer-legal-links" aria-label="Documentos legais">
          {legalLinks.map((link) => (
            <button
              key={link.key}
              type="button"
              className="footer-legal-link"
              onClick={() => setOpenDoc(link.key)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="container footer-inner">
        <Logo />
        <span className="footer-note">© AfiliadosLAB — ecossistema self-hosted para afiliados</span>
      </div>

      <LegalModal docKey={openDoc} onClose={() => setOpenDoc(null)} />
    </footer>
  )
}
