import Marquee from './components/Marquee/Marquee'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import HeartParticles from './components/HeartParticles/HeartParticles'
import RickRoll from './components/RickRoll/RickRoll'
import ValentineClock from './components/ValentineClock/ValentineClock'
import CandleDinner from './components/CandleDinner/CandleDinner'
import ConfessionWall from './components/ConfessionWall/ConfessionWall'
import Footer from './components/Footer/Footer'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <HeartParticles />
      <RickRoll />
      <Marquee />
      <Navbar />
      <main>
        <Hero />
        <div className={styles.divider}>✦ ✧ ✦ ✧ ✦ ✧ ✦</div>
        <ValentineClock />
        <div className={styles.divider}>✦ ✧ ✦ ✧ ✦ ✧ ✦</div>
        <CandleDinner />
        <div className={styles.divider}>✦ ✧ ✦ ✧ ✦ ✧ ✦</div>
        <ConfessionWall />
      </main>
      <Footer />
    </div>
  )
}
