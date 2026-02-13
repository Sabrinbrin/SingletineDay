import { useState, useEffect } from 'react'
import { recordVisit } from '../../services/visitors'
import styles from './Footer.module.css'

export default function Footer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    recordVisit().then((total) => {
      // Animate counter from 0 to total
      let current = 0
      const step = Math.max(1, Math.floor(total / 30))
      const timer = setInterval(() => {
        current += step
        if (current >= total) {
          current = total
          clearInterval(timer)
        }
        setCount(current)
      }, 30)
      return () => clearInterval(timer)
    })
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.divider}>
        {'✦'.repeat(30)}
      </div>

      <div className={styles.counter}>
        <span className={styles.counterLabel}>You are visitor #</span>
        <span className={styles.counterNum}>{String(count).padStart(6, '0')}</span>
      </div>

      <p className={styles.made}>
        Made with 💔 and self-love on Singletine Day
      </p>

      <p className={styles.copy}>
        © {new Date().getFullYear()} Singletine Day • No couples were harmed in the making of this website
      </p>

      <div className={styles.retro}>
        <span>⋆ Best viewed with a broken heart ⋆</span>
      </div>
    </footer>
  )
}
