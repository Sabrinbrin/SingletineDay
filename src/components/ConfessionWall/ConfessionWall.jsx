import { useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import styles from './ConfessionWall.module.css'

const PASTEL_COLORS = ['#ffb6c1', '#dda0dd', '#e6c3f0', '#f0c3d0', '#c3d0f0', '#f0d0c3']
const MAX_CONFESSIONS = 50

const defaultConfessions = [
  { id: 1, text: "I ate an entire pizza alone on Valentine's Day and felt POWERFUL", color: '#ffb6c1', rotation: -3 },
  { id: 2, text: "I sent myself flowers. No regrets.", color: '#dda0dd', rotation: 2 },
  { id: 3, text: "My cat is my valentine. She doesn't know that.", color: '#e6c3f0', rotation: -1 },
]

export default function ConfessionWall() {
  const [confessions, setConfessions] = useLocalStorage('singletine-confessions', defaultConfessions)
  const [input, setInput] = useState('')
  const [shakeId, setShakeId] = useState(null)

  const addConfession = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newNote = {
      id: Date.now(),
      text: input.trim(),
      color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
      rotation: Math.floor(Math.random() * 7) - 3,
    }

    const updated = [newNote, ...confessions].slice(0, MAX_CONFESSIONS)
    setConfessions(updated)
    setInput('')
    setShakeId(newNote.id)
    setTimeout(() => setShakeId(null), 500)
  }

  return (
    <section id="confessions" className={styles.section}>
      <h2 className={styles.heading}>✧ Confession Wall ✧</h2>
      <p className={styles.subtext}>Drop your Singletine Day confessions anonymously</p>

      <form className={styles.form} onSubmit={addConfession}>
        <textarea
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your confession here..."
          maxLength={200}
          rows={3}
        />
        <button type="submit" className={styles.submit}>
          ✦ Confess ✦
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
