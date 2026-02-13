import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { loadHeartShape } from '@tsparticles/shape-heart'

export default function HeartParticles() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
      await loadHeartShape(engine)
    }).then(() => setReady(true))
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const options = useMemo(() => ({
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      number: { value: isMobile ? 15 : 30 },
      color: { value: ['#ff69b4', '#ff10f0', '#9b30ff', '#c0c0c0'] },
      shape: { type: 'heart' },
      opacity: {
        value: { min: 0.2, max: 0.6 },
        animation: { enable: true, speed: 0.5, startValue: 'random', minimumValue: 0.1 },
      },
      size: {
        value: { min: 6, max: 16 },
      },
      move: {
        enable: true,
        speed: { min: 0.5, max: 1.5 },
        direction: 'bottom',
        outModes: { default: 'out' },
        drift: { min: -0.5, max: 0.5 },
      },
      rotate: {
        value: { min: 0, max: 360 },
        animation: { enable: true, speed: 3, direction: 'random' },
      },
    },
    detectRetina: true,
  }), [isMobile])

  if (!ready) return null

  return <Particles id="heart-particles" options={options} />
}
