<template>
  <div>
    <div class="grid w-screen max-w-screen-lg" :style="{ gridTemplateColumns: `repeat(${ startEndDifferentDay },1fr)` }">
      <div v-for="(i, index) in startEndDifferent" :key="index" :style="{ gridColumn: ` ${calculateOffSet(index)} / span ${calculateDaysInMonth(index)}` }" >{{ computeMonthName(index) }}</div>
      <span v-for="(i, index) in startEndDifferentDay" :key="index">{{ computeNumberOfDaysInDay(index) }}</span>
      <div v-for="(item, index) in eventDetails.eventWish" :key="index" :style="{ gridRow: 3, gridColumn: `${computeStartSpan(item)} / span ${computeEndSpan(item)}` }">
        <img class=" w-full h-full object-cover" :src="item.image">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import { computed, defineComponent, ref } from 'vue'
import { WishEvent, Event } from '../utils/interface'

export default defineComponent({
  setup(){
    const startDate = ref('2021-02-02')
    const endDate = ref('2021-03-12')

    const eventDetails = ref<Event>({
      eventWish: [
        {
          title: 'Invitation to Mundane Life',
          startDate: '2021-02-03',
          endDate: '2021-02-17',
          image: './images/Xiao-Banner.png'
        },
        {
          title: 'Dance of Lanterns',
          startDate: '2021-02-18',
          endDate: '2021-03-02',
          image: './images/Keqing-Banner.png'
        },
      ]
    })

    const computeNumberOfDaysInDay = (day: number) => {
      return dayjs(startDate.value).add(day, 'day').format('D')
    }

    const startEndDifferent = computed(() => {
      return dayjs(endDate.value).diff(startDate.value, 'month') + 1
    })

    const startEndDifferentDay = computed(() => {
      return dayjs(endDate.value).diff(startDate.value, 'day') + 1
    })

    const calculateDaysInMonth = (month: number) => {
      const currentMonth: Dayjs = dayjs(startDate.value).add(month, 'month')
      if(currentMonth.isSame(startDate.value, 'month')) {
        return dayjs(startDate.value).endOf('month').diff(startDate.value, 'd') + 1
      } else if(currentMonth.isSame(endDate.value, 'month')) {
        return dayjs(endDate.value).diff(dayjs(endDate.value).startOf('month'), 'd') + 1
      } else {
        return dayjs(startDate.value).add(month, 'month').daysInMonth()
      }
    }

    const computeMonthName = (month: number) => {
      return dayjs(startDate.value).add(month, 'month').format('MMM')
    }

    let offset = 1
    const calculateOffSet = (month: number) => {
      if(month == 0) return offset
      else {
        offset = calculateDaysInMonth(month - 1) + offset
        return offset
      }
    }

    const computeStartSpan = (item: WishEvent) => {
      const diff = dayjs(item.startDate).diff(startDate.value, 'day') + 1
      return diff
    }

    const computeEndSpan = (item: WishEvent) => {
      const diff = dayjs(item.endDate).diff(item.startDate, 'day') + 1
      return diff
    }

    return {
      startEndDifferent,
      computeNumberOfDaysInDay,
      startEndDifferentDay,
      calculateDaysInMonth,
      computeMonthName,
      eventDetails,
      computeEndSpan,
      calculateOffSet,
      computeStartSpan,
    }
  }
})

</script>

<style>

</style>