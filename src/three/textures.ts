import * as THREE from 'three'

const mk = (w: number, h: number, draw: (c: CanvasRenderingContext2D) => void) => {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  draw(c.getContext('2d')!)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.anisotropy = 4
  return t
}

// Warm limestone plaster wall for luminous museum gallery
export const wallTex = (rx: number) => {
  const t = mk(512, 512, (c) => {
    c.fillStyle = '#C8BCAC'
    c.fillRect(0, 0, 512, 512)
    for (let i = 0; i < 9000; i++) {
      c.fillStyle =
        Math.random() > 0.5
          ? `rgba(255,245,230,${Math.random() * 0.12})`
          : `rgba(80,60,40,${Math.random() * 0.08})`
      c.fillRect(Math.random() * 512, Math.random() * 512, 1 + Math.random() * 3, 1 + Math.random() * 2)
    }
  })
  t.repeat.set(rx, 1)
  return t
}

// Polished warm amber marble with gold veins
export const marbleTex = (rx: number, ry: number) => {
  const t = mk(1024, 1024, (c) => {
    c.fillStyle = '#261F18'
    c.fillRect(0, 0, 1024, 1024)
    for (let k = 0; k < 28; k++) {
      c.strokeStyle = `rgba(224,185,85,${0.25 + Math.random() * 0.45})`
      c.lineWidth = 0.8 + Math.random() * 1.8
      c.beginPath()
      let x = Math.random() * 1024,
        y = Math.random() * 1024
      c.moveTo(x, y)
      for (let s = 0; s < 9; s++) {
        x += (Math.random() - 0.5) * 160
        y += (Math.random() - 0.5) * 160
        c.lineTo(x, y)
      }
      c.stroke()
    }
    c.strokeStyle = 'rgba(212,175,55,0.2)'
    c.lineWidth = 2
    c.strokeRect(0, 0, 1024, 1024)
  })
  t.repeat.set(rx, ry)
  return t
}

export const radial = (rgb: string, a: number) =>
  mk(256, 256, (c) => {
    const g = c.createRadialGradient(128, 128, 0, 128, 128, 128)
    g.addColorStop(0, `rgba(${rgb},${a})`)
    g.addColorStop(1, `rgba(${rgb},0)`)
    c.fillStyle = g
    c.fillRect(0, 0, 256, 256)
  })
