import { Link } from 'react-router-dom'
import { Palette, Wheat, Gem, Award, ShieldCheck, Clock, Globe } from 'lucide-react'
import Reveal from '../components/Reveal'
import { site } from '../config/site'
import { artworks } from '../data/artworks'

export default function About() {
  const highlights = artworks.slice(0, 4)

  return (
    <main className="page">
      <Reveal>
        <div className="page-header text-center">
          <p className="eyebrow">The Painter & Studio</p>
          <h1>About the Artist & {site.name}</h1>
          <p className="lead">
            I am a devotional painter and relief artist rooted in the timeless spiritual traditions of Bengal. Through every stroke of paint, sculpted clay contour, and hand-placed golden paddy grain, I bring sacred stories to life.
          </p>
        </div>
      </Reveal>

      {/* Artist Story & Philosophy Section */}
      <section className="about-hero-grid">
        <Reveal>
          <div className="about-image-card">
            <img
              src="/images/artworks/16.jpg"
              alt="Radha Krishna Painting by Artist"
              className="about-featured-img"
            />
            <div className="about-img-caption">
              <strong>Eternal Prem — Radha & Krishna</strong>
              <span>Hand-painted on stretched canvas with gold leaf accents</span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="about-text-content">
            <span className="badge-gold">Artist Statement</span>
            <h2>"Painting is not just my profession; it is my sacred prayer."</h2>
            <p className="prose">
              Welcome to my creative studio. I have spent years honing the delicate craft of Indian devotional painting. My primary inspiration stems from the eternal divine romance of Radha and Krishna—their serene union, the quiet flute melodies of Vrindavan, and the deep emotional bhakti that has inspired poets and painters for millennia.
            </p>
            <p className="prose">
              Growing up surrounded by the festive traditions of Bengal—the rhythmic dhak drums of Durga Puja, the Kumartuli idol sculptors by the Ganges, and the ancient narrative brilliance of Kalighat Patachitra—I felt a calling to not only preserve these sacred motifs but to bring them into modern homes with tactile depth.
            </p>
            <p className="prose">
              Alongside traditional brushwork, I pioneer <strong>Dhaner Kaaj</strong> (golden paddy relief art) and eco-friendly terracotta clay work. Using real sun-dried grains of harvested rice, cowrie shells from coastal shores, and organic river clay, each artwork becomes a living, breathing three-dimensional sculpture.
            </p>
            <div className="about-stats">
              <div className="stat-box">
                <span className="stat-number">100%</span>
                <span className="stat-label">Handcrafted Originals</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years of Devotion</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">Global</span>
                <span className="stat-label">Worldwide Collectors</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Core Artistic Pillars (SVG Icons Instead of Emojis, Uniform Height) */}
      <section className="section-spaced">
        <Reveal>
          <div className="section-header text-center">
            <p className="eyebrow">My Signature Styles</p>
            <h2>What Defines My Paintings</h2>
            <p className="lead">
              Every piece created in my studio is authentic, unique, and crafted with meticulous attention to sacred proportions and archival durability.
            </p>
          </div>
        </Reveal>

        <div className="cards-grid">
          <Reveal>
            <div className="feature-card">
              <div className="feature-icon-box">
                <Palette size={26} className="feature-icon-svg" />
              </div>
              <h3>Sacred Canvases & Patachitra</h3>
              <p>
                Expressive devotional portraits of Radha Krishna, Maa Durga, and Mahadev rendered with heavy-body acrylics, fine Devanagari calligraphy, and intricate Bengali alpana filigree.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="feature-card">
              <div className="feature-icon-box">
                <Wheat size={26} className="feature-icon-svg" />
              </div>
              <h3>Dhaner Kaaj (Paddy Relief)</h3>
              <p>
                A rare heritage technique where hundreds of individual golden paddy grains are selected by tone and arranged grain by grain around hand-sculpted clay faces, symbolizing autumn harvest abundance.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="feature-card">
              <div className="feature-icon-box">
                <Gem size={26} className="feature-icon-svg" />
              </div>
              <h3>Cowrie Shells & Terracotta</h3>
              <p>
                Natural sea shells, rudraksha beads, and pure Ganges river clay combined into sacred wall tondos and eco-friendly Ganesha idols that bring positive spiritual energy into any sanctuary.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="feature-card">
              <div className="feature-icon-box">
                <Award size={26} className="feature-icon-svg" />
              </div>
              <h3>Museum-Grade Archival Finish</h3>
              <p>
                Every finished canvas and relief undergoes a 72-hour natural curing cycle followed by dual-coat UV and moisture-resistant archival varnish to ensure vibrant colors for decades.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Works Showcase */}
      <section className="section-spaced bg-surface-box">
        <Reveal>
          <div className="section-header text-center">
            <p className="eyebrow">Studio Portfolio</p>
            <h2>Selected Works by the Painter</h2>
            <p className="lead">
              A glimpse of original paintings currently residing in private collections and available for acquisition.
            </p>
          </div>
        </Reveal>

        <div className="artworks-preview-grid">
          {highlights.map((art) => (
            <Reveal key={art.id}>
              <Link to={`/artwork/${art.id}`} className="art-card-item">
                <div className="art-card-img-wrap">
                  <img src={art.image} alt={art.title || 'Artwork'} loading="lazy" />
                  <span className="art-card-tag">{art.categoryLabel || 'Original'}</span>
                </div>
                <div className="art-card-info">
                  <h4>{art.title}</h4>
                  <p className="art-card-medium">{art.medium}</p>
                  <span className="art-card-link">View Details →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '36px' }}>
          <Link to="/collection" className="btn btn-primary">
            Explore Full Collection (30+ Artworks)
          </Link>
        </div>
      </section>

      {/* Invitation Section */}
      <section className="about-cta-banner text-center">
        <Reveal>
          <div className="cta-content">
            <p className="eyebrow">Experience The Art in 3D</p>
            <h2>Walk Through My Virtual Gallery</h2>
            <p className="lead">
              Experience these paintings as if standing in an illuminated royal gallery. Explore both Room I (Sacred Canvases) and Room II (Relief Works) in full 3D.
            </p>
            <div className="btn-group" style={{ justifyContent: 'center', marginTop: '20px' }}>
              <Link to="/exhibition" className="btn btn-primary">
                Enter 3D Exhibition
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Commission a Painting
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
