import { useState, useEffect } from 'react'
import { subscribeConfessions, addConfession } from '../../services/confessions'
import styles from './ConfessionWall.module.css'

const PASTEL_COLORS = ['#ffb6c1', '#dda0dd', '#e6c3f0', '#f0c3d0', '#c3d0f0', '#f0d0c3']

export default function ConfessionWall() {
  const [confessions, setConfessions] = useState([])
  const [input, setInput] = useState('')
  const [shakeId, setShakeId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeConfessions(setConfessions)
    return unsubscribe
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || submitting) return

    const color = PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)]
    const rotation = Math.floor(Math.random() * 7) - 3

    setSubmitting(true)
    try {
      await addConfession(input.trim(), color, rotation)
      setInput('')
    } catch (err) {
      console.error('Failed to add confession:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="confessions" className={styles.section}>
      <h2 className={styles.heading}>✧ Confession Wall ✧</h2>
      <p className={styles.subtext}>Drop your Singletine Day confessions anonymously</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your confession here..."
          maxLength={200}
          rows={3}
        />
        <button type="submit" className={styles.submit} disabled={submitting}>
          {submitting ? '✦ Posting... ✦' : '✦ Confess ✦'}
        </button>
      </form>

      <div className={styles.wall}>
        {confessions.map((note) => (
          <div
            key={note.id}
            className={`${styles.note} ${shakeId === note.id ? styles.shake : ''}`}
            style={{
              backgroundColor: note.color,
              '--rotate': `${note.rotation}deg`,
              transform: `rotate(${note.rotation}deg)`,
            }}
          >
            <p className={styles.noteText}>{note.text}</p>
            <span className={styles.pin}>📌</span>
          </div>
        ))}
      </div>
    </section>
  )
}
