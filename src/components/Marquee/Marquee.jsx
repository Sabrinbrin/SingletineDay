import styles from './Marquee.module.css'

export default function Marquee() {
  const text = '★ Welcome to Singletine Day ★ You are loved ★ Happy Singletine Day ★ Self-love is the best love ★ '

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  )
}
