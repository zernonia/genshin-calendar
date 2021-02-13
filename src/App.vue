<template>
  <div class=" max-w-screen-xl w-full">
    <h1>Genshin Calendar</h1>
    <div class=" mt-4 w-full bg-gray-800 px-8 py-6 rounded-2xl relative">
      <Calendar />
    </div>
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
