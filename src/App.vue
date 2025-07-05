<template>
  <div id="app">
    <header class="app-header">
      <div class="hero-header">
        <h1 class="animated-gradient">🌌 Cosmic Almanac</h1>
        <p class="subtitle fade-in">Bridging Western Astronomy &amp; Indian Celestial Calendar</p>
      </div>
    </header>
    <main class="main-content">
      <section class="today-section">
        <h2>{{ selectedDate === today ? 'Today in Space History' : 'Selected Date Events' }}</h2>
        <div class="today-events">
          <div class="western-event">
            <h3>Western Astronomy</h3>
            <p v-if="loadingWestern">Loading...</p>
            <ul v-else>
              <li v-for="e in westernEvents" :key="e.year + e.text">
                <strong>{{ e.year }}:</strong> {{ e.text }}
              </li>
              <li v-if="!westernEvents.length">No major astronomical event recorded</li>
            </ul>
          </div>
          <div class="indian-event tooltip-wrapper">
            <h3>Indian Panchang</h3>
            <p><strong>Tithi:</strong> {{ currentPanchang.tithi }}</p>
            <p><strong>Nakshatra:</strong> {{ currentPanchang.nakshatra }}</p>
            <p><strong>Yoga:</strong> {{ currentPanchang.yoga }}</p>
            <!-- Tooltip content -->
            <div class="tooltip-content">
              <h4>🔬 Why are Tithi, Nakshatra, and Yoga Scientific?</h4>
              <ul>
                <li>
                  <strong>Tithi</strong> (Lunar Day): Calculated by measuring the exact angular distance (12° increments) between the Sun and Moon. This is a direct application of astronomy and celestial mechanics, not just tradition.
                </li>
                <li>
                  <strong>Nakshatra</strong> (Star Constellation): The Moon’s position is tracked against 27 fixed stars (constellations) on the ecliptic, marking its journey across the sky using real astronomical coordinates.
                </li>
                <li>
                  <strong>Yoga</strong> (Luni-Solar Day): Computed by adding the longitudes of the Sun and Moon and dividing the sum into 27 parts. Each Yoga represents a unique Sun-Moon relationship, reflecting the dynamic geometry of our solar system.
                </li>
              </ul>
              <p class="science-note">
                <em>These calculations use precise astronomy and mathematics—showing that the Panchang is as much a scientific calendar as a cultural one!</em>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Calendar @date-selected="onDateSelected" />
      <MythScience :date="selectedDate" />
    </main>
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue'
import MythScience from './components/MythScience.vue'
import { MhahPanchang } from 'mhah-panchang'

const SPACE_KEYWORDS = [
  'astronomy','astrophysics','nasa','esa','isro','jaxa','roscosmos',
  'hubble','telescope','satellite','spacecraft','space station','iss',
  'apollo','mercury','gemini','voyager','pioneer','galileo','cassini',
  'rover','curiosity','perseverance','opportunity','spirit',
  'mars','venus','jupiter','saturn','uranus','neptune','pluto',
  'comet','asteroid','meteor','meteorite','eclipse','lunar eclipse','solar eclipse',
  'galaxy','nebula','supernova','black hole','cosmic','universe','big bang'
]
const EXCLUDE_WORDS = [
  'missile','military','test','war','nuclear','bomb','army','navy','air force','weapon','taepodong'
]

// Jaipur, Rajasthan coordinates
const RAJASTHAN_LAT = 26.9124
const RAJASTHAN_LON = 75.7873

const mhahPanchang = new MhahPanchang()

export default {
  name: 'App',
  components: {
    Calendar,
    MythScience
  },
  data() {
    const today = new Date().toISOString().split('T')[0]
    return {
      today,
      selectedDate: today,
      westernEvents: [],
      loadingWestern: false
    }
  },
  computed: {
    currentPanchang() {
      // Accurate Panchang for Rajasthan (Jaipur)
      const p = mhahPanchang.calendar(new Date(this.selectedDate), RAJASTHAN_LAT, RAJASTHAN_LON)
      return {
        tithi: p.Tithi?.name_en_IN || '',
        nakshatra: p.Nakshatra?.name_en_IN || '',
        yoga: p.Yoga?.name_en_IN || ''
      }
    }
  },
  mounted() {
    this.fetchWesternEvents(new Date(this.selectedDate))
  },
  methods: {
    async fetchWesternEvents(date) {
      this.loadingWestern = true
      this.westernEvents = []
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${m}/${d}`
      try {
        const res = await fetch(url, { headers: { 'Api-User-Agent': 'CosmicAlmanac' } })
        const data = await res.json()
        this.westernEvents = (data.events || [])
          .filter(e => {
            const text = e.text.toLowerCase()
            if (EXCLUDE_WORDS.some(w => text.includes(w))) return false
            return SPACE_KEYWORDS.some(k => text.includes(k))
          })
          .slice(0, 2)
      } catch {
        this.westernEvents = []
      } finally {
        this.loadingWestern = false
      }
    },
    onDateSelected(dateKey) {
      this.selectedDate = dateKey
      this.fetchWesternEvents(new Date(dateKey))
    }
  }
}
</script>

<style>
/* Modern animated header styles */
.app-header {
  background: transparent;
  padding: 2rem 0 1.2rem 0;
  text-align: center;
  margin-bottom: 0.5rem;
}

.hero-header {
  background: rgba(30, 34, 56, 0.7);
  border-radius: 18px;
  display: inline-block;
  padding: 1.2rem 2.2rem 1.3rem 2.2rem;
  margin: 0 auto 0.5rem auto;
  box-shadow: 0 4px 32px rgba(0,0,0,0.12);
  max-width: 700px;
}

.animated-gradient {
  font-size: 2.8rem;
  font-weight: 800;
  background: linear-gradient(90deg, #a3e635, #3b82f6, #a78bfa, #f472b6);
  background-size: 200% auto;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: gradient-move 3s linear infinite;
  letter-spacing: 1.5px;
  margin-bottom: 0.3rem;
}

@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.subtitle {
  font-size: 1.22rem;
  color: #e0e7ef;
  letter-spacing: 0.5px;
  margin-top: 0.2rem;
  margin-bottom: 0;
  font-weight: 500;
  opacity: 0.88;
}

.fade-in {
  animation: fadeInSubtitle 1.4s cubic-bezier(0.23, 1, 0.32, 1) 0.2s both;
}

@keyframes fadeInSubtitle {
  from { opacity: 0; transform: translateY(18px);}
  to   { opacity: 0.88; transform: translateY(0);}
}

.main-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
}
.today-section {
  margin-bottom: 2rem;
}
.today-events {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}
.western-event, .indian-event {
  flex: 1;
  background: #f5f7fa;
  border-radius: 8px;
  padding: 1rem;
  color: #2c3e50;
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}
.tooltip-content {
  visibility: hidden;
  opacity: 0;
  width: 340px;
  background: #232946;
  color: #fff;
  text-align: left;
  border-radius: 10px;
  padding: 1.2rem 1.2rem 1rem 1.2rem;
  position: absolute;
  z-index: 20;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  transition: opacity 0.3s;
  font-size: 1rem;
}
.tooltip-content h4 {
  font-size: 1.35rem;
  font-weight: bold;
  margin-bottom: 0.7rem;
  color: #a3e635;
  line-height: 1.3;
}
.tooltip-wrapper:hover .tooltip-content,
.tooltip-wrapper:focus-within .tooltip-content {
  visibility: visible;
  opacity: 1;
}
.tooltip-content ul {
  margin: 0 0 0.5rem 1.2rem;
  padding: 0;
}
.tooltip-content li {
  margin-bottom: 0.4rem;
}
.science-note {
  color: #a3e635;
  font-size: 0.97em;
  margin-top: 0.6em;
}
</style>
