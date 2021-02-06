<template>
  <div class=" max-w-screen-xl mt-4">
    <h1>Genshin Calendar</h1>
    <Calendar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Calendar from './components/Calendar.vue'

export default defineComponent({
  name: 'App',
  components: {
    Calendar
  }
})
</script>
