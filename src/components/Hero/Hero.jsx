import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.sparkles}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${12 + Math.random() * 18}px`,
            }}
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
