import { ReactNode, useEffect, useRef } from 'react'
export default function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const r = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = r.current!; if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.classList.add('in'); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.15 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return <div ref={r} className={`reveal ${className}`}>{children}</div>
}
