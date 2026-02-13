import { useState, useEffect } from 'react'

export default function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  function getTimeLeft() {
    const now = new Date()
    const valentine = new Date(now.getFullYear(), 1, 14) // Feb 14
    if (now > valentine) {
      valentine.setFullYear(valentine.getFullYear() + 1)
    }
    const diff = Math.max(0, valentine - now)
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      total: diff,
    }
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  return timeLeft
}
