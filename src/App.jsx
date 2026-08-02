import { CheckoutProvider } from './context/CheckoutContext'
import Header from './components/Header'
import FlowRail from './components/FlowRail'
import Hero from './components/Hero'
import Diagnostico from './components/Diagnostico'
import Virada from './components/Virada'
import Ferramentas from './components/Ferramentas'
import Fluxo from './components/Fluxo'
import Prova from './components/Prova'
import Objecoes from './components/Objecoes'
import Oferta from './components/Oferta'
import Membros from './components/Membros'
import Faq from './components/Faq'
import CtaFinal from './components/CtaFinal'
import Footer from './components/Footer'

export default function App() {
  return (
    <CheckoutProvider>
      <Header />
      <main id="top">
        <FlowRail />
        <Hero />
        <Diagnostico />
        <Virada />
        <Ferramentas />
        <Fluxo />
        <Prova />
        <Objecoes />
        <Oferta />
        <Membros />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </CheckoutProvider>
  )
}
