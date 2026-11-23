import { Link, useParams } from 'react-router-dom'
import { Check, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react'
import Reveal from '../components/Reveal'
import { everything } from '../data/artworks'

export default function ArtworkPage() {
  const { id } = useParams()
  const i = everything.findIndex((a) => a.id === id)
  const a = everything[i]

  if (!a) {
    return (
      <main className="page text-center">
        <h1>Artwork Not Found</h1>
        <p className="lead">The requested piece could not be located in the current archive.</p>
        <Link className="btn btn-primary" to="/collection" style={{ marginTop: '20px' }}>
          Back to Collection
        </Link>
      </main>
    )
  }

  const prev = everything[(i + everything.length - 1) % everything.length]
  const next = everything[(i + 1) % everything.length]

  const specs: [string, string | undefined][] = [
    ['Category', a.categoryLabel || 'Original Devotional Art'],
    ['Medium', a.medium || 'Hand-painted mixed media & pigments'],
    ['Dimensions', a.dimensions || 'Dimensions on inquiry'],
    ['Creation Year', a.year || '2026'],
    ['Current Status', a.availability || 'Available in Studio'],
    ['Authentication', 'Hand-signed by artist with physical Certificate of Authenticity'],
    ['Packaging', 'Acid-free glassine wrap, shock-absorbent foam & rigid wood crate'],
  ]

  return (
    <main className="page detail-page">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-nav">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/collection">Collection</Link>
        <span>/</span>
        <span className="current">{a.title || 'Artwork'}</span>
      </div>

      {/* Balanced Web-View Height Layout: Left Image & Right Specs with Identical Background & Border */}
      <Reveal>
        <div className="artwork-detail-layout">
          {/* Left Column: Artwork Museum Frame */}
          <div className="artwork-image-container">
            <div className="artwork-museum-frame">
              <div className="artwork-img-box">
                <img src={a.image} alt={a.title || 'Devotional Artwork'} className="artwork-zoom-img" />
              </div>
              <div className="artwork-guarantee-badges">
                <div className="badge-item">
                  <Check size={14} className="badge-check-icon" />
                  <span>100% Original Handcrafted Work</span>
                </div>
                <div className="badge-item">
                  <Check size={14} className="badge-check-icon" />
                  <span>Museum-Grade UV & Moisture Seal</span>
                </div>
                <div className="badge-item">
                  <Check size={14} className="badge-check-icon" />
                  <span>Signed Physical Certificate Included</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Specs & Acquisition Actions */}
          <div className="artwork-info-pane">
            <div className="artwork-info-top">
              <div className="artwork-header-tags">
                <span className="badge-category">{a.categoryLabel || 'Fine Art'}</span>
                <span className="badge-status">{a.availability || 'Available'}</span>
              </div>

              <h1 className="artwork-main-title">{a.title || 'Original Sacred Creation'}</h1>

              {a.story && (
                <div className="artwork-narrative">
                  <h3 className="section-sub-title">Sacred Story & Symbolism</h3>
                  <p className="prose">{a.story}</p>
                </div>
              )}

              <div className="artwork-specs-box">
                <h3 className="specs-box-title">Artwork Specifications</h3>
                <dl className="specs-list">
                  {specs
                    .filter((r) => r[1])
                    .map(([label, val]) => (
                      <div key={label} className="spec-row">
                        <dt>{label}</dt>
                        <dd>{val}</dd>
                      </div>
                    ))}
                </dl>
              </div>
            </div>

            <div className="artwork-bottom-section">
              {/* BUTTONS WITH CLEAN SEPARATE MARGINS & NO OVERLAP */}
              <div className="artwork-actions-bar">
                <Link
                  className="btn btn-primary btn-action-inquire"
                  to={`/contact?artwork=${encodeURIComponent(a.title || '')}`}
                >
                  <MessageSquare size={14} style={{ marginRight: '8px' }} />
                  Inquire to Acquire This Piece
                </Link>
                <Link className="btn btn-outline btn-action-process" to="/process">
                  Learn About Our Process
                </Link>
              </div>

              {/* Previous / Next Switcher */}
              <div className="artwork-prev-next-nav">
                <Link to={`/artwork/${prev.id}`} className="nav-arrow-link">
                  <ArrowLeft size={13} style={{ marginRight: '6px' }} />
                  <span>{prev.title || 'Previous Work'}</span>
                </Link>
                <Link to={`/artwork/${next.id}`} className="nav-arrow-link right">
                  <span>{next.title || 'Next Work'}</span>
                  <ArrowRight size={13} style={{ marginLeft: '6px' }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  )
}
