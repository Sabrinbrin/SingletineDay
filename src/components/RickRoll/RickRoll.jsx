import { useState, useEffect, useCallback } from 'react'

export default function RickRoll() {
  const [activated, setActivated] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)

  const activate = useCallback(() => {
    if (!activated) {
      setActivated(true)
      setShowPlayer(true)
    }
  }, [activated])

  useEffect(() => {
    const handler = () => activate()
    document.addEventListener('click', handler, { once: true })
    document.addEventListener('touchstart', handler, { once: true })
    return () => {
      document.removeEventListener('click', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [activate])

  if (!showPlayer) return null

  return (
    <>
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&loop=1&playlist=dQw4w9WgXcQ"
        allow="autoplay"
        style={{
          position: 'fixed',
          width: 1,
          height: 1,
          bottom: 0,
          left: 0,
          opacity: 0,
          pointerEvents: 'none',
        }}
        title="background music"
      />
      <button
        onClick={() => setShowPlayer(false)}
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 999,
          background: 'rgba(26, 10, 46, 0.9)',
          border: '2px ridge #c0c0c0',
          color: '#ff69b4',
          fontFamily: 'var(--font-pixel)',
          fontSize: '10px',
          padding: '8px 12px',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        🔊 Mute
      </button>
    </>
  )
}
