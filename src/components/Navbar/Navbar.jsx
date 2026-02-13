import { useState } from 'react'
import styles from './Navbar.module.css'

const links = [
  { href: '#clock', label: '⏰ Clock' },
  { href: '#dinner', label: '🕯️ Dinner' },
  { href: '#confessions', label: '📝 Confess' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <a href="#" className={styles.logo}>✧ Singletine Day ✧</a>
      <button className={styles.burger} onClick={() => setOpen(!open)} aria-label="Menu">
        {open ? '✕' : '☰'}
      </button>
      <ul className={`${styles.links} ${open ? styles.open : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
