import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Grid, RotateCcw, Sparkles } from 'lucide-react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Artwork, room1, room2 } from '../data/artworks'
import { wallTex, marbleTex, radial } from '../three/textures'

const WALL_Z = -3, CAM_Z = 2.6, CAM_Y = 1.55, GATE_X = 31, H = 3.5
const R1 = room1.slice(0, 6).map((a, i) => ({ a, x: 4 + 4.4 * i })) // Room I: exactly six sacred canvases
const R2 = room2.map((a, i) => ({ a, x: 37 + 4 * i })) // Room II: relief works and masks
const ALL = [...R1, ...R2]
const END_X = R2[R2.length - 1].x + 4

// Camera path: travel + pause segments
type Seg = { x0: number; x1: number; l0: number; l1: number; w: number }
const segs: Seg[] = []
let cx = 0, lz = WALL_Z
const add = (x: number, w: number, l = lz) => {
  segs.push({ x0: cx, x1: x, l0: lz, l1: l, w })
  cx = x
  lz = l
}
R1.forEach((r, i) => {
  add(r.x - 0.9, 1.1, WALL_Z)
  add(r.x - 0.9, i === 5 ? 2.4 : 0.7)
})
add(GATE_X - 4.5, 1.3, CAM_Z)
add(GATE_X - 4.5, 0.6)
add(GATE_X + 3, 1.7, CAM_Z)
R2.forEach((r) => {
  add(r.x - 0.9, 1.1, WALL_Z)
  add(r.x - 0.9, 0.7)
})
add(END_X - 3, 0.8)
const TOTAL = segs.reduce((s, g) => s + g.w, 0)

function pathAt(p: number): [number, number] {
  let t = p * TOTAL
  for (const g of segs) {
    if (t <= g.w || g === segs[segs.length - 1]) {
      const u = Math.min(1, Math.max(0, t / g.w))
      const e = u * u * (3 - 2 * u)
      return [g.x0 + (g.x1 - g.x0) * e, g.l0 + (g.l1 - g.l0) * e]
    }
    t -= g.w
  }
  return [0, WALL_Z]
}

const mat = (color: string, emissive: string) =>
  new THREE.MeshStandardMaterial({ color, metalness: 0.55, roughness: 0.35, emissive })
const GOLD = mat('#C5A049', '#3D2F0B')
const BRONZE = mat('#7A5229', '#2E1C0A')
const WOOD = mat('#382215', '#120B06')

const Bar = ({
  p,
  s,
  m,
}: {
  p: [number, number, number]
  s: [number, number, number]
  m: THREE.Material
}) => (
  <mesh position={p} material={m}>
    <boxGeometry args={s} />
  </mesh>
)

function Painting({ item, camX }: { item: { a: Artwork; x: number }; camX: { current: number } }) {
  const navigate = useNavigate()
  const shadow = useMemo(() => radial('0,0,0', 0.6), [])
  const pool = useMemo(() => radial('255,220,160', 0.55), [])
  const tex = useTexture(item.a.image) as THREE.Texture
  const g = useRef<THREE.Group>(null)
  const am = useRef<THREE.MeshStandardMaterial>(null)

  const { w, h } = useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    const asp = (tex.image?.width || 1) / (tex.image?.height || 1)
    let cardH = 1.75
    let cardW = cardH * asp
    if (cardW > 2.5) {
      cardW = 2.5
      cardH = cardW / asp
    }
    return { w: cardW, h: cardH }
  }, [tex])

  const lw = 0.04,
    fw = 0.12,
    W = w + 2 * lw,
    Hh = h + 2 * lw

  useFrame(() => {
    const r = Math.min(1, Math.max(0, (camX.current - (item.x - 6)) / 2))
    const o = g.current!
    o.visible = r > 0.001
    o.scale.setScalar(0.92 + 0.08 * r)
    o.position.z = WALL_Z + 0.02 + (1 - r) * 0.45
    if (am.current) am.current.opacity = r
  })

  return (
    <group ref={g} position={[item.x, 1.7, WALL_Z + 0.02]} visible={false}>
      <mesh position={[0, -0.06, -0.012]}>
        <planeGeometry args={[W + 0.8, Hh + 0.8]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} />
      </mesh>

      <mesh position={[0, 0.2, -0.01]}>
        <planeGeometry args={[W + 3.6, Hh + 3.4]} />
        <meshBasicMaterial map={pool} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <mesh
        onClick={() => navigate(`/artwork/${item.a.id}`)}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = '')}
      >
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          ref={am}
          map={tex}
          emissiveMap={tex}
          emissive="#ffffff"
          emissiveIntensity={0.25}
          roughness={0.5}
          transparent
        />
      </mesh>

      <Bar m={GOLD} s={[W, lw, 0.05]} p={[0, h / 2 + lw / 2, 0.025]} />
      <Bar m={GOLD} s={[W, lw, 0.05]} p={[0, -(h / 2 + lw / 2), 0.025]} />
      <Bar m={GOLD} s={[lw, h, 0.05]} p={[w / 2 + lw / 2, 0, 0.025]} />
      <Bar m={GOLD} s={[lw, h, 0.05]} p={[-(w / 2 + lw / 2), 0, 0.025]} />

      <Bar m={BRONZE} s={[W + 2 * fw, fw, 0.08]} p={[0, Hh / 2 + fw / 2, 0.04]} />
      <Bar m={BRONZE} s={[W + 2 * fw, fw, 0.08]} p={[0, -(Hh / 2 + fw / 2), 0.04]} />
      <Bar m={BRONZE} s={[fw, Hh, 0.08]} p={[W / 2 + fw / 2, 0, 0.04]} />
      <Bar m={BRONZE} s={[fw, Hh, 0.08]} p={[-(W / 2 + fw / 2), 0, 0.04]} />

      {[-1, 1].flatMap((sx) =>
        [-1, 1].map((sy) => (
          <Bar
            key={`${sx}${sy}`}
            m={WOOD}
            s={[fw * 1.15, fw * 1.15, 0.1]}
            p={[sx * (W / 2 + fw / 2), sy * (Hh / 2 + fw / 2), 0.045]}
          />
        ))
      )}
    </group>
  )
}

function RoomShell() {
  const X0 = -8,
    X1 = END_X + 6,
    Lw = X1 - X0,
    cxm = (X0 + X1) / 2
  const wall = useMemo(() => wallTex(Lw / 4), [Lw])
  const floor = useMemo(() => marbleTex(Lw / 5, 9 / 5), [Lw])
  const darkWall = '#1C1814'

  return (
    <group>
      <mesh position={[cxm, H / 2, WALL_Z]}>
        <planeGeometry args={[Lw, H]} />
        <meshStandardMaterial map={wall} color="#C4B8A8" roughness={0.9} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cxm, 0, 1.5]}>
        <planeGeometry args={[Lw, 9]} />
        <meshStandardMaterial map={floor} roughness={0.25} metalness={0.2} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[cxm, H, 1.5]}>
        <planeGeometry args={[Lw, 9]} />
        <meshStandardMaterial color="#B0885C" emissive="#5C3B1E" emissiveIntensity={0.5} />
      </mesh>

      <mesh rotation={[0, Math.PI, 0]} position={[cxm, H / 2, 6]}>
        <planeGeometry args={[Lw, H]} />
        <meshStandardMaterial color={darkWall} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[X0, H / 2, 1.5]}>
        <planeGeometry args={[9, H]} />
        <meshStandardMaterial color={darkWall} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[X1, H / 2, 1.5]}>
        <planeGeometry args={[9, H]} />
        <meshStandardMaterial color={darkWall} />
      </mesh>

      <Bar m={GOLD} s={[Lw, 0.12, 0.08]} p={[cxm, 0.06, WALL_Z + 0.04]} />

      <Bar
        m={new THREE.MeshStandardMaterial({ color: '#1A1816' })}
        s={[Lw, 0.05, 0.07]}
        p={[cxm, H - 0.08, -1.7]}
      />

      {ALL.map((r) => (
        <group key={r.a.id} position={[r.x, H - 0.2, -1.7]}>
          <mesh>
            <cylinderGeometry args={[0.09, 0.11, 0.24, 16]} />
            <meshStandardMaterial color="#2A241E" />
          </mesh>
          <mesh position={[0, -0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.08, 16]} />
            <meshBasicMaterial color="#FFE0B2" />
          </mesh>
        </group>
      ))}

      <Bar m={new THREE.MeshStandardMaterial({ color: darkWall })} s={[0.3, H, 4.1]} p={[GATE_X, H / 2, -0.95]} />
      <Bar m={new THREE.MeshStandardMaterial({ color: darkWall })} s={[0.3, H, 1.9]} p={[GATE_X, H / 2, 5.05]} />
      <Bar m={new THREE.MeshStandardMaterial({ color: darkWall })} s={[0.3, 0.5, 3]} p={[GATE_X, 3.25, 2.6]} />
      <Bar m={BRONZE} s={[0.5, 3, 0.3]} p={[GATE_X, 1.5, 1.1]} />
      <Bar m={BRONZE} s={[0.5, 3, 0.3]} p={[GATE_X, 1.5, 4.1]} />
      <Bar m={GOLD} s={[0.55, 0.28, 3.6]} p={[GATE_X, 3.05, 2.6]} />
      <Bar m={WOOD} s={[0.6, 0.12, 3.9]} p={[GATE_X, 3.28, 2.6]} />
      <pointLight position={[GATE_X + 2, 2.4, 2.6]} color="#FFC488" intensity={20} distance={10} />
    </group>
  )
}

function Rig({
  prog,
  camX,
  onActive,
}: {
  prog: { current: number }
  camX: { current: number }
  onActive: (i: number) => void
}) {
  const { camera } = useThree()
  const p = useRef(0)
  const last = useRef(-2)
  const light = useRef<THREE.PointLight>(null)

  useFrame(() => {
    p.current += (prog.current - p.current) * 0.075
    const [x, l] = pathAt(p.current)
    camX.current = x
    camera.position.set(x, CAM_Y, CAM_Z)
    const t = (l - WALL_Z) / (CAM_Z - WALL_Z)
    camera.lookAt(x + 1.8 + 4.2 * t, 1.5, l)
    light.current?.position.set(x + 1.2, 2.8, 1.4)
    let idx = -1
    ALL.forEach((w, i) => {
      if (Math.abs(x - (w.x - 0.9)) < 1.1) idx = i
    })
    if (idx !== last.current) {
      last.current = idx
      onActive(idx)
    }
  })

  return <pointLight ref={light} color="#FFD8A8" intensity={32} distance={15} />
}

const hasGL = () => {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

export default function Exhibition() {
  const navigate = useNavigate()
  const box = useRef<HTMLDivElement>(null)
  const prog = useRef(0)
  const camX = useRef(0)
  const [active, setActive] = useState(-1)
  const [room, setRoom] = useState(1)
  const [scrollProgress, setScrollProgress] = useState(0)

  const simple = useMemo(() => !hasGL() || matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  // Keyboard shortcut: Press Escape to exit exhibition immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  useEffect(() => {
    if (simple) return
    const st = ScrollTrigger.create({
      trigger: box.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (s) => {
        prog.current = s.progress
        setScrollProgress(Math.round(s.progress * 100))
      },
    })
    const id = setInterval(() => setRoom(camX.current > GATE_X ? 2 : 1), 250)
    return () => {
      st.kill()
      clearInterval(id)
    }
  }, [simple])

  const restartExhibition = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (simple) {
    return (
      <main className="page">
        <div className="page-header text-center">
          <p className="eyebrow">Virtual Exhibition</p>
          <h1>The Exhibition</h1>
          <p className="lead">
            The animated walkthrough requires WebGL; here are all paintings in gallery sequence.
          </p>
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
            >
              ← Exit to Home
            </button>
          </div>
        </div>
        <div className="realistic-art-grid">
          {ALL.map((w) => (
            <Link key={w.a.id} className="art-grid-card" to={`/artwork/${w.a.id}`}>
              <div className="art-grid-frame">
                <img src={w.a.image} alt={w.a.title} loading="lazy" />
              </div>
              <div className="art-grid-meta">
                <h3>{w.a.title}</h3>
                <p className="art-grid-medium">{w.a.medium}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    )
  }

  const cur = active >= 0 ? ALL[active].a : null
  const isAtEnd = scrollProgress >= 95

  return (
    <div ref={box} style={{ height: '1500vh', position: 'relative' }}>
      {/* ========================================================
          SINGLE RESPONSIVE HUD - NEVER COLLIDES OR OVERLAPS
          ======================================================== */}
      <div className="exhibition-floating-hud">
        <div className="exhibition-left-controls">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="hud-exit-btn"
            title="Exit Virtual Exhibition & Return Home (Esc)"
          >
            <ArrowLeft size={16} />
            <span>Exit Exhibition</span>
          </button>

          <Link
            to="/collection"
            className="hud-collection-btn"
          >
            <Grid size={14} style={{ marginRight: '6px' }} />
            <span>Collection Grid</span>
          </Link>
        </div>

        <div className="exhibition-right-controls">
          <span className="hud-room-badge">
            {room === 1 ? 'Room I: Sacred Canvases' : 'Room II: Relief & Masks'}
          </span>
          <span className="hud-progress-badge">
            {scrollProgress}% Walked
          </span>
        </div>
      </div>

      {/* FIXED PROGRESS LINE AT VERY TOP */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '3px',
          background: 'linear-gradient(90deg, #C28E34, #F5D38A)',
          zIndex: 1000000,
          transition: 'width 0.1s linear',
        }}
      />

      {/* 3D WEBGL STAGE */}
      <div className="stage">
        <Canvas dpr={[1, 1.6]} camera={{ fov: 50, near: 0.1, far: 120 }} gl={{ antialias: true }}>
          <color attach="background" args={['#171411']} />
          <fog attach="fog" args={['#171411', 16, 48]} />
          <ambientLight intensity={0.55} color="#FFE6C2" />
          <Suspense fallback={null}>
            <RoomShell />
            {ALL.map((w) => (
              <Painting key={w.a.id} item={w} camX={camX} />
            ))}
          </Suspense>
          <Rig prog={prog} camX={camX} onActive={setActive} />
        </Canvas>

        {/* ARTWORK CAPTION CARD ON SPOTLIGHT (HIGH-CONTRAST BUTTONS) */}
        {cur && !isAtEnd && (
          <div className="caption exhibition-artwork-card" key={cur.id}>
            <span className="caption-category">{cur.categoryLabel || 'Original'}</span>
            <h2>{cur.title}</h2>
            <p className="caption-medium">{cur.medium}</p>
            <p className="caption-story">{cur.story}</p>
            <div className="caption-actions">
              <Link className="btn btn-primary btn-caption-primary" to={`/artwork/${cur.id}`}>
                View Details & Acquire
              </Link>
              <Link className="btn-caption-secondary" to="/contact">
                Inquire with Artist
              </Link>
            </div>
          </div>
        )}

        {/* GOLDEN GLOW FLASH & FULL-SCREEN BRIGHT CELEBRATION MODAL ON COMPLETION */}
        {isAtEnd && (
          <div className="exhibition-fullscreen-end">
            <div className="glow-flash-aura" />
            <div className="end-celebration-card">
              <span className="end-badge">
                <Sparkles size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Virtual Tour Completed
              </span>
              <h2>You Have Walked Through the Entire Gallery</h2>
              <p className="end-lead">
                Thank you for experiencing both rooms of original sacred canvases, Dhaner Kaaj paddy reliefs, and terracotta sculptures.
              </p>

              <div className="end-buttons-group">
                <button
                  type="button"
                  className="btn-end-primary"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft size={16} style={{ marginRight: '8px' }} />
                  Return to Home Page
                </button>

                <button
                  type="button"
                  className="btn-end-explore"
                  onClick={() => navigate('/collection')}
                >
                  <Grid size={15} style={{ marginRight: '8px' }} />
                  Explore Full Collection Grid →
                </button>

                <button
                  type="button"
                  className="btn-end-restart"
                  onClick={restartExhibition}
                >
                  <RotateCcw size={14} style={{ marginRight: '6px' }} />
                  Walk Again from Room I
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
