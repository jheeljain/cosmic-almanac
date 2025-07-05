<template>
  <div class="myth-science-section">
    <h2>💡 Myth vs. Science: Understanding the Indian Celestial Calendar</h2>
    
    <!-- Daily Myth vs Science -->
    <div class="daily-fact">
      <p><strong>Myth:</strong> {{ todayMyth.myth }}</p>
      <p><strong>Science:</strong> {{ todayMyth.fact }}</p>
    </div>

    <!-- Educational Info -->
    <div class="info-box">
      <h3>Did you know?</h3>
      <p>
        The Indian Panchang, or Hindu calendar, is often misunderstood as purely mythological or religious. 
        In reality, it is a sophisticated and ancient scientific system for tracking time. The Panchang is a 
        <strong>lunisolar</strong> calendar, meaning it carefully synchronizes both the Moon's phases and the Sun's movement.
      </p>
      <p>
        Ancient Indian astronomers developed precise mathematical methods to calculate <em>Tithi</em> (lunar day), 
        <em>Nakshatra</em> (the Moon's position among 27 constellations), and even added an extra month 
        (<em>Adhika Maas</em>) every few years to keep the calendar in harmony with the solar year—much like 
        the leap year in the Western calendar.
      </p>
      <p>
        These calculations were based on real astronomical observations, not just tradition. Many Indian festivals 
        and rituals are set according to the actual positions of the Sun, Moon, and stars, ensuring they stay 
        aligned with natural cosmic cycles.
      </p>
      <div class="highlight">
        <p>
          <strong>The Panchang's scientific foundation shows that what is often labeled as "mythology" is, 
          in fact, a reflection of India's rich legacy of astronomy and mathematics—bridging culture, 
          science, and the cosmos.</strong>
        </p>
      </div>
    </div>
    
    <!-- Comparison Table -->
    <div class="comparison-table">
      <h3>Calendar Comparison</h3>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Hindu Calendar (Panchang)</th>
            <th>Western Calendar (Gregorian)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Type</td>
            <td>Lunisolar (moon & sun cycles)</td>
            <td>Solar (sun cycle only)</td>
          </tr>
          <tr>
            <td>Month Length</td>
            <td>29.5–30 days (lunar), leap months added</td>
            <td>28–31 days, leap day every 4 years</td>
          </tr>
          <tr>
            <td>Time Units</td>
            <td>Tithi, Nakshatra, Yoga, Karana, Vara</td>
            <td>Day, Week, Month, Year</td>
          </tr>
          <tr>
            <td>Festival Dates</td>
            <td>Calculated by Tithi/Nakshatra (move each year)</td>
            <td>Fixed dates (e.g., Christmas: Dec 25)</td>
          </tr>
          <tr>
            <td>Astronomical Basis</td>
            <td>Moon & Sun positions, constellations</td>
            <td>Earth's orbit around Sun</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const mythList = [
  { myth: "The Sun is not a star.", fact: "The Sun is a G-type main-sequence star." },
  { myth: "The Moon has no gravity.", fact: "The Moon has gravity, about 1/6th of Earth's." },
  { myth: "Space is completely silent.", fact: "Space is not completely silent; electromagnetic waves can travel in plasma." },
  { myth: "The Great Wall of China is visible from space.", fact: "It's not visible to the naked eye from space." },
  { myth: "All stars are the same color.", fact: "Stars come in many colors, from red to blue, depending on their temperature." },
  { myth: "A full moon causes insanity.", fact: "There's no scientific evidence linking the full moon to insanity." },
  // Add more myths/facts!
]
const today = new Date()
const idx = today.getDate() % mythList.length
const todayMyth = computed(() => mythList[idx])
</script>

<style scoped>
.myth-science-section {
  margin-top: 2rem;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 1.5rem;
}
.daily-fact {
  margin-bottom: 1.5rem;
  background: #f5f7fa;
  border-radius: 8px;
  padding: 1rem;
  color: #2c3e50;
}
.comparison-table {
  margin-top: 2rem;
}
.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(255,255,255,0.02);
}
.comparison-table th,
.comparison-table td {
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #ddd;
  text-align: left;
}
.comparison-table th {
  background: #3498db;
  color: #fff;
}
.comparison-table tr:last-child td {
  border-bottom: none;
}
</style>
