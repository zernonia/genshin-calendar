<template>
  <div>
    <!-- <table>
      <tr>
        <th v-for="(i, index) in startEndDifferent" :key="index" :colspan="calculateDaysInMonth(index)">{{ computeMonthName(index) }}</th>
      </tr>
      <tr>
        <th v-for="(i, index) in startEndDifferentDay" :key="index">{{ computeNumberOfDaysInDay(index) }}</th>  
      </tr>
      <tbody>
        <tr>
          <td colspan="1"></td>
          <td v-for="(item, index) in eventDetails.eventWish" :key="index" :colspan="computeColSpanEvent(item.startDate, item.endDate)" class=" h-56" >
            <img class=" w-full h-full object-cover" :src="item.image" alt="" srcset="">
          </td>
        </tr>
        <tr>2</tr>
        <tr>3</tr>
        <tr>4</tr>
      </tbody>
    </table> -->
    <section class="grid w-screen max-w-screen-lg" :style="{ gridTemplateColumns: `repeat(${ startEndDifferentDay },1fr)` }">
      <div v-for="(i, index) in startEndDifferent" :key="index" :style="{ gridColumn: ` ${calculateOffSet(index)} / span ${calculateDaysInMonth(index)}` }" >{{ computeMonthName(index) }}</div>
      <span v-for="(i, index) in startEndDifferentDay" :key="index">{{ computeNumberOfDaysInDay(index) }}</span>
      <div v-for="(item, index) in eventDetails.eventWish" :key="index" :style="{ gridRow: 3, gridColumn: `${computeStartSpan(item)} / span ${computeEndSpan(item)}` }">
        <img class=" w-full h-full object-cover" :src="item.image" alt="" srcset="">
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import { computed, defineComponent, ref } from 'vue'

interface Event {
  eventWish: WishEvent[]
}

interface WishEvent {
  title: string,
  startDate: string,
  endDate: string,
  image: string
}

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