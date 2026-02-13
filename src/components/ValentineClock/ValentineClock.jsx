import { useState, useEffect } from 'react'
import useCountdown from '../../hooks/useCountdown'
import styles from './ValentineClock.module.css'

export default function ValentineClock() {
  const countdown = useCountdown()
  const [rotation, setRotation] = useState(0)
  const [showMotto, setShowMotto] = useState(false)

  // Continuous clockwise rotation — second hand does a full 360 every 60s
  useEffect(() => {
    let animationId
    let startTime = null
    const SPEED = 6 // degrees per second (360/60 = 6 deg/s for second hand)

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = (timestamp - startTime) / 1000
      const newRotation = elapsed * SPEED
      setRotation(newRotation)

      // Show motto when second hand crosses 12 (every 60 degrees = 360)
      const currentAngle = newRotation % 360
      if (currentAngle < 3 && Math.floor(newRotation / 360) > 0) {
        setShowMotto(true)
        setTimeout(() => setShowMotto(false), 3000)
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  const secondDeg = rotation
  const minuteDeg = rotation / 60
  const hourDeg = rotation / 720

  return (
    <section id="clock" className={styles.section}>
      <h2 className={styles.heading}>✧ The Singletine Clock ✧</h2>
      <p className={styles.subtext}>Ticking towards Singletine Day...</p>

      <div className={styles.clockFrame}>
        <div className={styles.clock}>
          {/* Hour markers as hearts */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) - 90
            const rad = (angle * Math.PI) / 180
            const x = 50 + 40 * Math.cos(rad)
            const y = 50 + 40 * Math.sin(rad)
            return (
              <span
                key={i}
                className={styles.marker}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {i === 0 ? '12' : i === 3 ? '3' : i === 6 ? '6' : i === 9 ? '9' : '♥'}
              </span>
            )
          })}

          {/* Clock center dot */}
          <div className={styles.center} />

          {/* Hour hand */}
          <div
            className={`${styles.hand} ${styles.hourHand}`}
            style={{ transform: `rotate(${hourDeg}deg)` }}
          />

          {/* Minute hand */}
          <div
            className={`${styles.hand} ${styles.minuteHand}`}
            style={{ transform: `rotate(${minuteDeg}deg)` }}
          />

          {/* Second hand */}
          <div
            className={`${styles.hand} ${styles.secondHand}`}
            style={{ transform: `rotate(${secondDeg}deg)` }}
          />
        </div>
      </div>

      {/* Motto reveal */}
      <div className={`${styles.motto} ${showMotto ? styles.mottoVisible : ''}`}>
        &ldquo;Aim for someone above the numbers on this clock&rdquo;
      </div>

      {/* Digital countdown */}
      <div className={styles.countdown}>
        <div className={styles.countdownItem}>
          <span className={styles.countdownNum}>{String(countdown.days).padStart(3, '0')}</span>
          <span className={styles.countdownLabel}>days</span>
        </div>
        <span className={styles.colon}>:</span>
        <div className={styles.countdownItem}>
          <span className={styles.countdownNum}>{String(countdown.hours).padStart(2, '0')}</span>
          <span className={styles.countdownLabel}>hrs</span>
        </div>
        <span className={styles.colon}>:</span>
        <div className={styles.countdownItem}>
          <span className={styles.countdownNum}>{String(countdown.minutes).padStart(2, '0')}</span>
          <span className={styles.countdownLabel}>min</span>
        </div>
        <span className={styles.colon}>:</span>
        <div className={styles.countdownItem}>
          <span className={styles.countdownNum}>{String(countdown.seconds).padStart(2, '0')}</span>
          <span className={styles.countdownLabel}>sec</span>
        </div>
      </div>
      <p className={styles.countdownText}>until Singletine Day</p>
    </section>
  )
}
