import { useState, useEffect, useRef } from 'react'
import wittyRemarks from '../../data/wittyRemarks'
import styles from './CandleDinner.module.css'

export default function CandleDinner() {
  const [remark, setRemark] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasRevealed, setHasRevealed] = useState(false)
  const sectionRef = useRef(null)

  // Pick a random remark on mount
  useEffect(() => {
    setRemark(wittyRemarks[Math.floor(Math.random() * wittyRemarks.length)])
  }, [])

  // Intersection Observer to trigger typewriter on scroll
  useEffect(() => {
    if (!sectionRef.current || hasRevealed) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true)
          setIsTyping(true)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasRevealed])

  // Typewriter effect
  useEffect(() => {
    if (!isTyping || !remark) return
    let i = 0
    const timer = setInterval(() => {
      setDisplayText(remark.slice(0, i + 1))
      i++
      if (i >= remark.length) {
        clearInterval(timer)
        setIsTyping(false)
      }
    }, 60)
    return () => clearInterval(timer)
  }, [isTyping, remark])

  const newRemark = () => {
    const next = wittyRemarks[Math.floor(Math.random() * wittyRemarks.length)]
    setRemark(next)
    setDisplayText('')
    setIsTyping(true)
  }

  return (
    <section id="dinner" className={styles.section} ref={sectionRef}>
      <h2 className={styles.heading}>✧ Dinner for Two ✧</h2>

      <div className={styles.scene}>
        {/* Table */}
        <div className={styles.table}>
          {/* Tablecloth pattern */}
          <div className={styles.tablecloth} />

          {/* Left side - person silhouette */}
          <div className={styles.side}>
            <div className={styles.candle}>
              <div className={styles.flame} />
              <div className={styles.wax} />
            </div>
            <div className={styles.plate}>
              <div className={styles.food}>🍝</div>
            </div>
            <div className={styles.glass}>🍷</div>
            <div className={styles.person}>
              {/* Pixel person */}
              <div className={styles.personHead} />
              <div className={styles.personBody} />
            </div>
          </div>

          {/* Center decoration */}
          <div className={styles.centerpiece}>
            <div className={styles.candle}>
              <div className={styles.flame} />
              <div className={styles.wax} />
            </div>
            <span className={styles.rose}>🌹</span>
          </div>

          {/* Right side - mirror */}
          <div className={styles.side}>
            <div className={styles.candle}>
              <div className={styles.flame} />
              <div className={styles.wax} />
            </div>
            <div className={styles.plate}>
              <div className={styles.food}>🍝</div>
            </div>
            <div className={styles.glass}>🍷</div>
            <div className={styles.mirror}>
              <div className={styles.mirrorFrame}>
                <div className={styles.mirrorGlass}>
                  <span className={styles.mirrorReflection}>🪞</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient glow */}
        <div className={styles.ambientGlow} />
      </div>

      {/* Witty remark with typewriter */}
      <div className={styles.remarkBox}>
        <p className={`${styles.remark} ${isTyping ? styles.typing : ''}`}>
          {displayText}
          <span className={styles.cursor}>|</span>
        </p>
      </div>

      <button className={styles.newRemark} onClick={newRemark}>
        ✦ Another Remark ✦
      </button>
    </section>
  )
}
