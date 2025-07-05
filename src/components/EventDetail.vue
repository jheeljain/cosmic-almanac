<template>
  <div class="event-detail">
    <h3>{{ event.date.toDateString() }}</h3>
    
    <div class="event-content">
      <div class="western-detail">
        <h4>🌟 Western Astronomy</h4>
        <p>{{ event.western }}</p>
      </div>
      
      <div class="indian-detail">
        <h4>🕉️ Indian Panchang</h4>
        <p>{{ event.indian }}</p>
      </div>
    </div>
    
    <button @click="closeDetail" class="close-btn">Close</button>
  </div>
</template>

<script>
export default {
  name: 'EventDetail',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeDetail() {
      this.$emit('close')
    }
  }
}
</script>
