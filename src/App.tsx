import { Suspense, lazy, useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles, Phone, Mail, MapPin } from 'lucide-react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { site, nav } from './config/site'
import Home from './pages/Home'
import About from './pages/About'
import Process from './pages/Process'
import Contact from './pages/Contact'
import ArtworkPage from './pages/Artwork'
import ErrorBoundary from './components/ErrorBoundary'

const Exhibition = lazy(() => import('./pages/Exhibition'))
const Collection = lazy(() => import('./pages/Collection'))

gsap.registerPlugin(ScrollTrigger)

export const Logo = ({ size = 44 }: { size?: number }) => (
  <img
    className="logo"
    src={site.logoUrl}
    alt={`${site.name} logo`}
    width={size}
    height={size}
    style={{ height: size, width: 'auto', maxWidth: size * 3 }}
  />
)

export default function App() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  // Smooth scroll with Lenis + GSAP ticker
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const l = new Lenis({ lerp: 0.1 })
    l.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => l.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    ;(window as any).__lenis = l
    return () => {
      gsap.ticker.remove(tick)
      l.destroy()
      ;(window as any).__lenis = null
    }
  }, [])

  // Route change handlers: scroll top, dynamic page title
  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
    ;(window as any).__lenis?.scrollTo(0, { immediate: true })
    const matched = nav.find((n) => n[0] === pathname)
    document.title = `${matched ? matched[1] : pathname.startsWith('/artwork') ? 'Artwork' : 'Devotional Art'} | ${site.name}`
  }, [pathname])

  const isExhibition = pathname === '/exhibition'

  return (
    <div className="app-root">
      {/* STANDARD NAVIGATION HEADER (Hidden during 3D exhibition where Exhibition has its own dedicated HUD) */}
      {!isExhibition && (
        <header className="nav">
          <Link to="/" className="brand" aria-label={`${site.name} home`}>
            <Logo size={40} />
            <div className="brand-text">
              <span className="brand-name">{site.name}</span>
              <span className="brand-tagline">Devotional Art & Relief</span>
            </div>
          </Link>

          <nav className={open ? 'links on' : 'links'} aria-label="Main Navigation">
            {nav.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'}>
                {label}
              </NavLink>
            ))}
            <Link to="/exhibition" className="nav-cta-btn">
              <Sparkles size={14} style={{ marginRight: '6px' }} />
              Virtual Exhibition
            </Link>
          </nav>

          <button
            className="burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
      )}

      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="loading">
              <div className="loading-spinner" />
              <p>Preparing the Sacred Art Gallery…</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/exhibition" element={<Exhibition />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/artwork/:id" element={<ArtworkPage />} />
            {/* Redirect legacy merged routes */}
            <Route path="/artist" element={<About />} />
            <Route path="/craftsmanship" element={<About />} />
            <Route path="/materials" element={<Process />} />
            <Route path="/commission" element={<Contact />} />
            <Route path="/enquiry" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      {!isExhibition && (
        <footer className="foot">
          <div className="footer-top-grid">
            {/* Col 1: Brand & Artist Bio */}
            <div className="footer-col brand-col">
              <div className="footer-brand">
                <Logo size={48} />
                <h3>{site.name}</h3>
              </div>
              <p className="footer-desc">
                Dedicated to capturing the divine romance of Radha Krishna, the sacred power of Maa Durga, and the folk spirit of Bengal through handcrafted paintings, golden paddy grain (Dhaner Kaaj) relief, and eco-terracotta clay.
              </p>
              <div className="footer-badge-item">
                <span className="badge-dot" />
                <span>Original Devotional Art Studio</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="footer-col">
              <h4>Navigation</h4>
              <ul className="footer-links">
                <li><Link to="/">Home Page</Link></li>
                <li><Link to="/about">About the Painter</Link></li>
                <li><Link to="/collection">Complete Collection</Link></li>
                <li><Link to="/exhibition">3D Virtual Exhibition</Link></li>
                <li><Link to="/process">Creation Process</Link></li>
                <li><Link to="/contact">Contact & Inquiries</Link></li>
              </ul>
            </div>

            {/* Col 3: Specialties */}
            <div className="footer-col">
              <h4>Art Mediums</h4>
              <ul className="footer-links">
                <li><Link to="/collection">Radha Krishna Canvases</Link></li>
                <li><Link to="/collection">Dhaner Kaaj (Paddy Relief)</Link></li>
                <li><Link to="/collection">Cowrie Shell & Clay Tondos</Link></li>
                <li><Link to="/collection">Maa Durga & Kali Shrines</Link></li>
                <li><Link to="/collection">Terracotta Ganesha Idols</Link></li>
                <li><Link to="/contact">Custom Temple Commissions</Link></li>
              </ul>
            </div>

            {/* Col 4: Studio Inquiries */}
            <div className="footer-col contact-col">
              <h4>Studio Inquiries</h4>
              <div className="footer-contact-item">
                <MapPin size={15} style={{ color: 'var(--gold)' }} />
                <span>{site.location}</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={15} style={{ color: 'var(--gold)' }} />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
              <div className="footer-contact-item">
                <Phone size={15} style={{ color: 'var(--gold)' }} />
                <span>{site.phone}</span>
              </div>
              <div className="footer-guarantee-note">
                <small>Every original painting arrives with a signed physical Certificate of Authenticity and insured museum crating.</small>
              </div>
            </div>
          </div>

<div className="footer-bottom-bar">
  <p>
    © {new Date().getFullYear()}. All Rights Reserved.
    <a
      href="https://export4tradeindia.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
       Export 4 Trade India Pvt. Ltd.
    </a>
  </p>

  <div className="footer-sub-links">
    <img
      src="https://ms-export.co.in/wp-content/uploads/2024/01/MEMBER-OF-2.png"
      alt="Member Of"
      className="footer-membership-img"
    />
  </div>
</div>

        </footer>
      )}
    </div>
  )
}
