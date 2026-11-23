import { Link } from 'react-router-dom'
import { Sparkles, Palette, Wheat, ScrollText, Plane } from 'lucide-react'
import { site } from '../config/site'
import { Logo } from '../App'
import Reveal from '../components/Reveal'
import { artworks } from '../data/artworks'

// Curated selection of premier paintings and relief works for the home page
const featuredArtworks = [
  'radha-krishna-embrace',
  'paddy-durga-mask',
  'jagannath-trinity-plate',
  'green-buddha-shell',
  'maa-kali-trishul',
  'clay-ganesha-idol',
]
  .map((id) => artworks.find((a) => a.id === id)!)
  .filter(Boolean)

export default function Home() {
  return (
    <main>
      {/* SECTION 1: HERO / OPENING (BULLETPROOF VISIBILITY - NO BLANK SCREEN) */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid-layout">
            <div className="hero-text-col">
              <div className="hero-top-badge">
                <Sparkles size={13} style={{ color: 'var(--gold)' }} />
                <span>Bengal Sacred Art & Devotion</span>
              </div>

              <div className="hero-logo-row">
                <Logo size={64} />
                <h1 className="hero-title">{site.name}</h1>
              </div>

              <p className="hero-tagline">
                Traditional Devotional Paintings & Bengal 3D Paddy Relief Art
              </p>

              <div className="hero-card-summary">
                <p className="hero-greeting">
                  <strong>Namaste & Welcome.</strong> Step into my studio sanctuary—where the divine romance of Radha & Krishna, the fierce protection of Maa Durga, and Bengal's sacred folk heritage are brought to life through hand-painted brushstrokes, sculpted Ganges river clay, and authentic golden paddy grain (Dhaner Kaaj) relief.
                </p>
              </div>

              <div className="hero-actions">
                <Link className="btn btn-primary" to="/collection">
                  Explore Art Collection
                </Link>
                <Link className="btn btn-secondary" to="/exhibition">
                  Walk 3D Exhibition
                </Link>
               
              </div>

              <div className="hero-trust-bar">
                <div className="trust-pill">
                  <Palette size={13} style={{ color: 'var(--gold)', marginRight: '6px' }} />
                  <span>100% Handcrafted Originals</span>
                </div>
                <div className="trust-pill">
                  <Wheat size={13} style={{ color: 'var(--gold)', marginRight: '6px' }} />
                  <span>Authentic Bengal Paddy Relief</span>
                </div>
                <div className="trust-pill">
                  <ScrollText size={13} style={{ color: 'var(--gold)', marginRight: '6px' }} />
                  <span>Signed Certificate of Authenticity</span>
                </div>
                <div className="trust-pill">
                  <Plane size={13} style={{ color: 'var(--gold)', marginRight: '6px' }} />
                  <span>Insured Global Doorstep Delivery</span>
                </div>
              </div>
            </div>

            <div className="hero-image-col">
              <div className="hero-artwork-frame">
                <img
                  src="/images/artworks/16.jpg"
                  alt="Eternal Prem Radha and Krishna Canvas"
                  className="hero-main-img"
                />
                <div className="hero-artwork-caption">
                  <span className="caption-tag">Masterpiece Canvas</span>
                  <strong>Eternal Prem — Radha & Krishna in Union</strong>
                  <small>Heavy-Body Acrylic & Gold Pigment on Canvas</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PAINTER & THE PRACTICE */}
      <section className="section-padded">
        <div className="container">
          <div className="artist-spotlight-grid">
            <Reveal>
              <div className="artist-visual-stack">
                <div className="art-frame-gold">
                  <img
                    src="/images/artworks/03.jpg"
                    alt="Dhaner Durga Mask"
                    className="art-frame-img"
                  />
                  <div className="art-frame-badge">
                    <span>Signature Harvest Relief</span>
                    <strong>Dhaner Maa Durga Mask</strong>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="artist-bio-text">
                <p className="eyebrow">I Am a Devotional Painter</p>
                <h2>Every Canvas is a Sacred Sadhana</h2>
                <p className="lead">
                  "Art for me is not merely colors on canvas—it is an act of quiet prayer connecting the devotee with the divine."
                </p>
                <p className="prose">
                  Rooted in the fertile artistic soil of Bengal, my paintings draw inspiration from Kalighat Patachitra, the temple carvings of Odisha, and the timeless poetry of Jayadeva's Gita Govinda. 
                </p>
                <p className="prose">
                  What makes my studio distinct is the fusion of painterly expression with tactile, organic three-dimensionality. Using genuine golden paddy grains harvested from Bengal fields, natural sea cowrie shells, and hand-molded clay, each piece possesses real texture that captures light differently at every angle.
                </p>
                <div className="highlight-quote">
                  <em>
                    "Whether depicting the flute-playing Shyamsundar beside Sri Radha or sculpting the divine third eye of Maa Durga, each work is sealed with archival museum varnish to endure for generations."
                  </em>
                </div>
                <div className="btn-group" style={{ marginTop: '20px' }}>
                  <Link className="btn btn-outline" to="/about">
                    Read the Painter's Full Story →
                  </Link>
                  <Link className="btn btn-ghost" to="/process">
                    See How I Work →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED PAINTINGS (UNIFORM COMPACT CARD HEIGHTS) */}
      <section className="section-padded bg-surface">
        <div className="container">
          <Reveal>
            <div className="section-header text-center">
              <p className="eyebrow">Curated Masterpieces</p>
              <h2>Selected Paintings & Sculptural Reliefs</h2>
              <p className="lead">
                Explore handpicked creations available directly from the artist’s studio.
              </p>
            </div>
          </Reveal>

          <div className="artworks-showcase-grid">
            {featuredArtworks.map((art) => (
              <Reveal key={art.id}>
                <div className="art-showcase-card">
                  <div className="art-showcase-img-wrap">
                    <img src={art.image} alt={art.title || 'Artwork'} loading="lazy" />
                    <span className="art-category-pill">{art.categoryLabel || 'Original'}</span>
                    <span className="art-avail-pill">{art.availability || 'Available'}</span>
                  </div>
                  <div className="art-showcase-details">
                    <h3 title={art.title}>{art.title}</h3>
                    <p className="art-medium-line" title={art.medium}>{art.medium}</p>
                    <div className="art-meta-row">
                      <span>Dimensions: <strong>{art.dimensions}</strong></span>
                      <span>Year: <strong>{art.year}</strong></span>
                    </div>
                    <div className="art-card-actions">
                      <Link className="btn-card-view" to={`/artwork/${art.id}`}>
                        View Details
                      </Link>
                      <Link className="btn-card-inquire" to={`/contact`}>
                        Enquire
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link className="btn btn-primary" to="/collection">
              View All 30+ Collection Pieces →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: CRAFTSMANSHIP PILLARS */}
      <section className="section-padded">
        <div className="container">
          <Reveal>
            <div className="section-header text-center">
              <p className="eyebrow">Artistic Mediums</p>
              <h2>Three Pillars of Devotional Craft</h2>
              <p className="lead">
                Blending classical Indian iconography with organic earth materials.
              </p>
            </div>
          </Reveal>

          <div className="pillars-grid">
            <Reveal>
              <div className="pillar-box">
                <div className="pillar-num">01</div>
                <h3>Sacred Canvas Paintings</h3>
                <p>
                  Specializing in Radha Krishna's divine lila, Maa Durga, and Mahaprabhu Jagannath. Rendered in rich heavy-body acrylics, luminous gold washes, and intricate alpana borders.
                </p>
                <Link to="/collection" className="pillar-link">
                  Browse Canvases →
                </Link>
              </div>
            </Reveal>

            <Reveal>
              <div className="pillar-box">
                <div className="pillar-num">02</div>
                <h3>Dhaner Kaaj & Shell Relief</h3>
                <p>
                  A signature Bengal heritage craft: sun-dried golden paddy grains and coastal cowrie shells hand-inlaid one by one around sculpted clay faces and sacred wall tondos.
                </p>
                <Link to="/process" className="pillar-link">
                  Explore Technique →
                </Link>
              </div>
            </Reveal>

            <Reveal>
              <div className="pillar-box">
                <div className="pillar-num">03</div>
                <h3>Eco Terracotta & Upcycled Decor</h3>
                <p>
                  Sustainable river clay Ganesha idols, hand-pinched terracotta artifacts, and upcycled glass bottles sculpted with 3D clay flora and botanical cottage reliefs.
                </p>
                <Link to="/collection" className="pillar-link">
                  View Sculptures →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: 3D VIRTUAL EXHIBITION INVITATION */}
      <section className="exhibition-invite-banner">
        <div className="container">
          <Reveal>
            <div className="invite-box text-center">
              <div className="invite-badge">Interactive 3D Virtual Tour</div>
              <h2>Step Inside the Virtual Exhibition</h2>
              <p className="lead">
                Take an immersive 3D walkthrough across our two illuminated gallery wings. Walk through Room I (Sacred Canvases) and pass through the architectural portal into Room II (Relief Works & Masks).
              </p>
              <div className="invite-features">
                <span>✓ Interactive 3D Camera Walk</span>
                <span>✓ Soft Museum Spotlights</span>
                <span>✓ Detailed Artwork Captions</span>
                <span>✓ One-Click Easy Exit anytime</span>
              </div>
              <div className="btn-group" style={{ marginTop: '24px', justifyContent: 'center' }}>
                <Link className="btn btn-primary" to="/exhibition">
                  Walk the Exhibition Now
                </Link>
                <Link className="btn btn-secondary" to="/collection">
                  View in Grid Mode
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 6: COLLECTOR TESTIMONIALS */}
      <section className="section-padded bg-surface">
        <div className="container">
          <Reveal>
            <div className="section-header text-center">
              <p className="eyebrow">Collector Experiences</p>
              <h2>Treasured in Homes Across the World</h2>
            </div>
          </Reveal>

          <div className="testimonials-grid">
            <Reveal>
              <div className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>
                  "The Radha Krishna painting brought an unmistakable divine peace into our living room. The gold detailing catches the light at sunset in the most magical way. The wooden crating was exceptionally secure!"
                </p>
                <div className="testimonial-author">
                  <strong>Dr. Ananya Mukherjee</strong>
                  <span>Kolkata & London</span>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>
                  "The Dhaner Durga mask is a true masterpiece of craftsmanship. Everyone who visits our home stops in awe to admire the real paddy grain halos. You can feel the devotion in every single detail."
                </p>
                <div className="testimonial-author">
                  <strong>Rajesh & Sunita Sharma</strong>
                  <span>Mumbai</span>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>
                  "We commissioned a bespoke Jagannath tondo for our newly inaugurated puja altar. The artist communicated transparently throughout each stage, sending work-in-progress photos. Truly blessed!"
                </p>
                <div className="testimonial-author">
                  <strong>Arunodoy Sen</strong>
                  <span>Bengaluru</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 7: COMMISSION CALL TO ACTION */}
      <section className="section-padded">
        <div className="container">
          <Reveal>
            <div className="commission-cta-card text-center">
              <p className="eyebrow">Custom Commissions</p>
              <h2>Have a Sacred Vision in Mind?</h2>
              <p className="lead">
                I accept bespoke painting and relief commissions for home temples, private collections, and festive celebrations.
              </p>
              <div className="btn-group" style={{ marginTop: '20px', justifyContent: 'center' }}>
                <Link className="btn btn-primary" to="/contact">
                  Commission an Artwork
                </Link>
                <Link className="btn btn-outline" to="/collection">
                  Browse Available Works
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
