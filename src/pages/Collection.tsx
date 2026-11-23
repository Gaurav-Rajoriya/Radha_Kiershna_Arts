import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Artwork, everything } from '../data/artworks'

const OUT = 16
const IN = Math.min(12, everything.length - OUT)

function Card3D({ a, i, hover, setHover }: { a: Artwork; i: number; hover: number; setHover: (idx: number) => void }) {
  const navigate = useNavigate()
  const tex = useTexture(a.image) as THREE.Texture

  const ring = i < OUT ? 0 : 1
  const n = ring ? IN : OUT
  const k = ring ? i - OUT : i
  const ang = (k / n) * Math.PI * 2 + (ring ? Math.PI / n : 0)
  const R = ring ? 3.6 : 5.8
  const y = ring ? 1.3 : 0.1

  const { w, h } = useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    const aspect = (tex.image?.width || 1) / (tex.image?.height || 1)
    let cardH = ring ? 1.3 : 1.6
    let cardW = cardH * aspect
    if (cardW > 1.6) {
      cardW = 1.6
      cardH = cardW / aspect
    }
    return { w: cardW, h: cardH }
  }, [tex, ring])

  const on = hover === i
  const r = R + (on ? 0.35 : 0)

  return (
    <group
      position={[Math.sin(ang) * r, y + h / 2 + (on ? 0.12 : 0), Math.cos(ang) * r]}
      rotation={[-0.1, ang, 0]}
      scale={on ? 1.15 : 1}
    >
      {/* Subtle realistic champagne gold backing */}
      <mesh position={[0, 0, -0.015]}>
        <boxGeometry args={[w + 0.05, h + 0.05, 0.02]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.65} roughness={0.35} />
      </mesh>

      {/* Artwork Canvas */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(i)
        }}
        onPointerOut={() => setHover(-1)}
        onClick={() => navigate(`/artwork/${a.id}`)}
      >
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          map={tex}
          roughness={0.4}
          metalness={0.05}
          emissive="#ffffff"
          emissiveIntensity={on ? 0.2 : 0.04}
        />
      </mesh>
    </group>
  )
}

export default function Collection() {
  const [hover, setHover] = useState(-1)
  const [activeFilter, setActiveFilter] = useState<'all' | 'canvas' | 'relief' | 'sculpted'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'ring'>('grid')
  const [isMobile, setIsMobile] = useState(innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredArtworks = useMemo(() => {
    if (activeFilter === 'all') return everything
    return everything.filter((art) => art.category === activeFilter)
  }, [activeFilter])

  const activeArtwork = hover >= 0 ? everything[hover] : null

  return (
    <main className="page wide">
      <Reveal>
        <div className="page-header text-center">
          <p className="eyebrow">Studio Archive</p>
          <h1>The Complete Collection</h1>
          <p className="lead">
            Explore authentic hand-painted sacred canvases, Bengal paddy (Dhaner Kaaj) relief masks, cowrie shell mandalas, and terracotta sculptures.
          </p>
        </div>
      </Reveal>

      {/* Controls Bar: Category Filters & View Toggle */}
      <div className="collection-controls-bar">
        <div className="category-tabs">
          <button
            type="button"
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Works ({everything.length})
          </button>
          <button
            type="button"
            className={`filter-tab ${activeFilter === 'canvas' ? 'active' : ''}`}
            onClick={() => setActiveFilter('canvas')}
          >
            Sacred Canvases
          </button>
          <button
            type="button"
            className={`filter-tab ${activeFilter === 'relief' ? 'active' : ''}`}
            onClick={() => setActiveFilter('relief')}
          >
            Dhaner & Shell Relief
          </button>
          <button
            type="button"
            className={`filter-tab ${activeFilter === 'sculpted' ? 'active' : ''}`}
            onClick={() => setActiveFilter('sculpted')}
          >
            Eco Clay & Upcycled
          </button>
        </div>

        {!isMobile && (
          <div className="view-mode-toggle">
            <button
              type="button"
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Gallery Grid View"
            >
              Gallery Grid
            </button>
            <button
              type="button"
              className={`view-btn ${viewMode === 'ring' ? 'active' : ''}`}
              onClick={() => setViewMode('ring')}
              title="3D Ring View"
            >
              3D Ring Carousel
            </button>
          </div>
        )}
      </div>

      {/* 3D Ring View (Desktop Only when active) */}
      {!isMobile && viewMode === 'ring' ? (
        <div className="realistic-gallery-ring">
          <Canvas camera={{ position: [0, 3.2, 11], fov: 45 }} dpr={[1, 1.5]}>
            {/* Luminous warm gallery lighting */}
            <color attach="background" args={['#FAF7F2']} />
            <ambientLight intensity={1.1} color="#FFF5EA" />
            <directionalLight position={[4, 8, 6]} intensity={1.5} color="#FFE9CE" />
            <directionalLight position={[-4, 6, -3]} intensity={0.6} color="#E2DCD5" />

            {/* Seamless, realistic soft floor without hard circle borders */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
              <planeGeometry args={[40, 40]} />
              <meshStandardMaterial color="#F0EAE1" roughness={0.6} metalness={0.05} />
            </mesh>

            <Suspense fallback={null}>
              {everything.slice(0, OUT + IN).map((art, idx) => (
                <Card3D key={art.id} a={art} i={idx} hover={hover} setHover={setHover} />
              ))}
            </Suspense>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={hover < 0}
              autoRotateSpeed={0.5}
              minPolarAngle={1.1}
              maxPolarAngle={1.48}
              target={[0, 1, 0]}
            />
          </Canvas>

          <div className="ring-caption-bar">
            {activeArtwork ? (
              <p>
                <strong>{activeArtwork.title || 'Sacred Artwork'}</strong> • Click to view full details
              </p>
            ) : (
              <p>
                Rotate by dragging gently • Hover over any artwork to inspect • Click to open details
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Realism-Enhanced Masonry Grid View */
        <div className="realistic-art-grid">
          {filteredArtworks.map((art) => (
            <Reveal key={art.id}>
              <Link to={`/artwork/${art.id}`} className="art-grid-card">
                <div className="art-grid-frame">
                  <img src={art.image} alt={art.title || 'Artwork'} loading="lazy" />
                  {art.categoryLabel && (
                    <span className="art-grid-tag">{art.categoryLabel}</span>
                  )}
                  {art.availability && (
                    <span className="art-grid-avail">{art.availability}</span>
                  )}
                </div>
                <div className="art-grid-meta">
                  <h3>{art.title || 'Original Devotional Piece'}</h3>
                  {art.medium && <p className="art-grid-medium">{art.medium}</p>}
                  <div className="art-grid-bottom">
                    {art.dimensions && <span>{art.dimensions}</span>}
                    <span className="art-view-cta">View Details →</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}

      {/* Bottom Banner */}
      <div className="collection-bottom-cta">
        <Reveal>
          <div className="text-center">
            <h3>Interested in a bespoke piece or collector acquisition?</h3>
            <p>We provide full provenance documents, custom framing options, and insured global delivery.</p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '16px' }}>
              Inquire with the Artist
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
