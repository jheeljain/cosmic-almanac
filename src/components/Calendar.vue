<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <button @click="prevMonth" class="nav-btn">&lt;</button>
      <h2>{{ monthName }} {{ currentYear }}</h2>
      <button @click="nextMonth" class="nav-btn">&gt;</button>
    </div>

    <!-- Horizontal weekdays row -->
    <div class="calendar-weekdays-row">
      <span v-for="day in weekdays" :key="day" class="weekday">{{ day }}</span>
    </div>

    <div class="calendar-grid">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="calendar-day"
        :class="{
          'today': isToday(day),
          'selected': isSelected(day),
          'other-month': day && day.getMonth() !== currentMonth
        }"
        @click="selectDate(day)"
      >
        <span v-if="day">{{ day.getDate() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: ['events'],
  data() {
    return {
      currentDate: new Date(),
      selectedDate: new Date(),
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  },
  computed: {
    currentMonth() {
      return this.currentDate.getMonth()
    },
    currentYear() {
      return this.currentDate.getFullYear()
    },
    monthName() {
      return this.currentDate.toLocaleString('default', { month: 'long' })
    },
    calendarDays() {
      const year = this.currentYear
      const month = this.currentMonth
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const firstDayOfWeek = firstDay.getDay()
      const daysInMonth = lastDay.getDate()
      const days = []

      // Add days from previous month
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const prevMonthDay = new Date(year, month, -i)
        days.push(prevMonthDay)
      }
      // Add days of current month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day))
      }
      // Add days from next month to fill the grid
      const remainingDays = 42 - days.length
      for (let day = 1; day <= remainingDays; day++) {
        days.push(new Date(year, month + 1, day))
      }
      return days
    }
  },
  methods: {
    prevMonth() {
      this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1)
    },
    nextMonth() {
      this.currentDate = new Date(this.currentYear, this.currentMonth + 1, 1)
    },
    selectDate(day) {
    if (!day) return
    this.selectedDate = new Date(day)
    // Emit ISO date string (YYYY-MM-DD)
    const dateKey = day.toISOString().split('T')[0]
    this.$emit('date-selected', dateKey)
  },
    isToday(day) {
      if (!day) return false
      const today = new Date()
      return day.toDateString() === today.toDateString()
    },
    isSelected(day) {
      if (!day) return false
      return day.toDateString() === this.selectedDate.toDateString()
    },
    formatDate(date) {
      return date.toISOString().split('T')[0]
    }
  }
}
</script>

<style scoped>
.calendar-container {
  background: #232946;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.nav-btn {
  background: #45aaf2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
}
.calendar-weekdays-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 0.5rem;
}
.weekday {
  font-weight: 600;
  color: #fff;
  padding: 0.5rem 0;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.calendar-day {
  min-height: 48px;
  text-align: center;
  background: #393e6c;
  color: #fff;
  border-radius: 8px;
  margin: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.calendar-day.today {
  background: #45aaf2;
  color: #fff;
  font-weight: bold;
}
.calendar-day.selected {
  background: #9b59b6;
  color: #fff;
}
.calendar-day.other-month {
  opacity: 0.3;
}
</style>
