import logo from '../assets/logo-magnific.png'

export default function Logo({ href = '#top', variant = 'header' }) {
  if (variant === 'hero') {
    return (
      <div className="hero-brand">
        <img src={logo} alt="" width={56} height={56} />
        <div className="hero-brand-name">AfiliadosLAB</div>
      </div>
    )
  }

  return (
    <a href={href} className="logo">
      <img className="logo-mark" src={logo} alt="" width={34} height={34} />
      AfiliadosLAB
    </a>
  )
}
