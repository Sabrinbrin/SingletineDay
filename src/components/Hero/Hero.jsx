import { useMemo } from 'react'
import styles from './Hero.module.css'

// Seeded pseudo-random for deterministic sparkle positions
function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

export default function Hero() {
  const stars = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      left: `${seededRandom(i * 4) * 100}%`,
      top: `${seededRandom(i * 4 + 1) * 100}%`,
      animationDelay: `${seededRandom(i * 4 + 2) * 3}s`,
      fontSize: `${12 + seededRandom(i * 4 + 3) * 18}px`,
    })), [])

  return (
    <section className={styles.hero}>
      <div className={styles.sparkles}>
        {stars.map((style, i) => (
          <span
            key={i}
            className={styles.star}
            style={style}
          >
            ✦
          </span>
        ))}
      </div>
      <h1 className={styles.title}>Singletine Day</h1>
      <p className={styles.subtitle}>
        Because who needs a valentine when you&apos;ve got <span className={styles.highlight}>✨ yourself ✨</span>
      </p>
      <div className={styles.badge}>
        <span>💖</span> Est. Every Feb 14th <span>💖</span>
      </div>
      <div className={styles.scrollHint}>
        <span>↓ scroll for vibes ↓</span>
      </div>
    </section>
  )
}
