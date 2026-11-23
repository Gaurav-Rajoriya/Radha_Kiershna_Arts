import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { content } from '../data/content'

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Armature & Surface Preparation',
      subtitle: 'Sculpting the Form',
      description:
        'Every artwork begins with careful structural composition. For relief works, natural river clay is hand-sculpted without molds onto treated circular wood tondos or kraft armatures. For canvases, multiple coats of acid-free archival gesso are applied and hand-sanded to achieve a velvety, luminous painting ground.',
      tag: 'Foundation & Form',
      image: '/images/artworks/05.jpg',
    },
    {
      num: '02',
      title: 'Devotional Pigments & Chakshudaan',
      subtitle: 'Giving Life to the Sacred Eyes',
      description:
        'Using rich artist-grade acrylics, turmeric ochres, vermilion red, and twilight slate indigo, layers of glazes are built up. The most sacred moment is the traditional Bengali "Chakshudaan"—the ritual painting of the deity’s eyes with zero-number sable brushes, breathing divine soul and presence into the canvas.',
      tag: 'Color & Spirit',
      image: '/images/artworks/18.jpg',
    },
    {
      num: '03',
      title: 'Hand-Inlaying Golden Paddy & Cowrie Shells',
      subtitle: 'Grain-by-Grain Tactile Artistry',
      description:
        'The signature hallmark of our studio: real golden paddy grains (Dhaner Kaaj) are hand-sorted by size and tonal hue, then carefully placed with precision tweezers one by one in radial halos around the deities. Natural sea cowrie shells, rudraksha beads, and delicate pearls are inlaid to create rich three-dimensional tactile depth.',
      tag: '3D Tactile Relief',
      image: '/images/artworks/03.jpg',
    },
    {
      num: '04',
      title: 'Natural Curing & Archival Varnish',
      subtitle: 'Preserving for Generations',
      description:
        'Organic elements require meticulous preservation. Each completed work rests through a 72-hour controlled natural curing period. It is then treated with a proprietary dual-coat museum archival sealant that shields the natural grains and pigments from moisture, UV fading, and dust, ensuring the piece stays vibrant for decades.',
      tag: 'Archival Sealing',
      image: '/images/artworks/20.jpg',
    },
  ]

  return (
    <main className="page">
      <Reveal>
        <div className="page-header text-center">
          <p className="eyebrow">Studio Craftsmanship</p>
          <h1>The Creation Process</h1>
          <p className="lead">
            Step behind the easel to see how raw natural clay, golden harvest paddy grains, and sacred pigments transform into enduring devotional masterpieces.
          </p>
        </div>
      </Reveal>

      {/* Process Steps Timeline */}
      <div className="process-timeline">
        {steps.map((step, idx) => (
          <Reveal key={step.num}>
            <div className={`process-row ${idx % 2 === 1 ? 'reverse' : ''}`}>
              <div className="process-image-wrap">
                <img src={step.image} alt={step.title} loading="lazy" />
                <span className="process-badge">{step.tag}</span>
              </div>
              <div className="process-content">
                <span className="step-counter">STEP {step.num}</span>
                <h2>{step.title}</h2>
                <h4 className="process-subtitle">{step.subtitle}</h4>
                <p className="prose">{step.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Natural Materials Grid */}
      <section className="section-spaced bg-surface-box">
        <Reveal>
          <div className="text-center max-w-700">
            <p className="eyebrow">Earth & Spirit</p>
            <h2>Sacred Materials from Nature</h2>
            <p className="lead">
              We work with organic, eco-friendly, and culturally auspicious materials that connect every artwork with Bengal’s sacred landscape.
            </p>
          </div>
        </Reveal>

        <div className="materials-grid">
          {content.materials.map((m) => (
            <Reveal key={m.title}>
              <div className="material-card">
                <span className="material-tag">{m.subtitle}</span>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Custom Commission Prompt */}
      <section className="about-cta-banner">
        <Reveal>
          <div className="cta-content">
            <p className="eyebrow" style={{ color: 'var(--gold-dark)' }}>Bespoke Creations</p>
            <h2>Have a Sacred Vision for Your Home or Temple?</h2>
            <p className="lead">
              We work directly with art collectors to create custom Radha Krishna canvases, bespoke Durga relief masks, and personalized spiritual installations.
            </p>
            <div className="btn-group">
              <Link to="/contact" className="btn btn-primary">
                Commission a Custom Piece
              </Link>
              <Link to="/collection" className="btn btn-outline">
                Browse Existing Collection
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
