<template>
  <div>
    <div class="grid w-screen max-w-screen-xl gap-x-2 sticky top-0 z-10 bg-white" :style="{ gridTemplateColumns: `repeat(${ startEndDifferentDay },1fr)` }">
      <div v-for="(i, index) in startEndDifferent" :key="index" :style="{ gridColumn: ` ${calculateOffSet(index)} / span ${calculateDaysInMonth(index)}` }" >{{ computeMonthName(index) }}</div>
      <span :style="{ opacity: computeShowDate(index) }" v-for="(i, index) in startEndDifferentDay" :key="index">{{ computeNumberOfDaysInDay(index) }}</span>
      <Arrow :width="15" :height="15" class=" absolute" :style="{ gridRow: 2, gridColumn: `${computeTodayLine} / span 1`, left: '-7px'  }" />
    </div>
    <div  class="grid w-screen max-w-screen-xl grid-custom gap-x-2 gap-y-2" :style="{ gridTemplateColumns: `repeat(${ startEndDifferentDay },1fr)` }">
      <div id="today" class=" bg-gray-400 hover:bg-gray-500 transition-all duration-500" style="width: 2px;" :style="{ gridRow: `1 / ${ eventDetails.specialEvent.length + 3 }` , gridColumn: `${computeTodayLine} / span 1`  }" ></div>
      <div v-for="(item, index) in eventDetails.characterBanner" :key="index" :style="{ gridRow: 1, gridColumn: `${computeStartSpan(item)} / span ${computeEndSpan(item)}` }">
        <img class="grid-image" :src="item.image">
      </div>
      <div v-for="(item, index) in eventDetails.weaponBanner" :key="index" :style="{ gridRow: 2, gridColumn: `${computeStartSpan(item)} / span ${computeEndSpan(item)}` }">
        <img class="grid-image" :src="item.image">
      </div>
      <!-- <div v-for="(item, index) in eventDetails.miniEvent" :key="index" :style="{ gridRow: 3, gridColumn: `${computeStartSpan(item)} / span ${computeEndSpan(item)}` }">
        <img class="grid-image" :src="item.image">
      </div> -->
      <div v-for="(item, index) in eventDetails.specialEvent" :key="index" :style="{ gridRow: index + 3, gridColumn: `${computeStartSpan(item)} / span ${computeEndSpan(item)}` }">
        <img class="grid-image" :src="item.image">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs, { Dayjs } from 'dayjs'
import { computed, defineComponent, ref } from 'vue'
import { Event, BaseEvent } from '../utils/interface'
import Arrow from '../components/Arrow.vue'

export default defineComponent({
  components: {
    Arrow
  },
  setup(){
    const startDate = ref('2021-02-02')
    const endDate = ref('2021-03-22')

    const eventDetails = ref<Event>({
      characterBanner: [
        {
          title: 'Invitation to Mundane Life',
          startDate: '2021-02-02',
          endDate: '2021-02-17',
          image: './images/Invitation_to_Mundane_Life.jpg'
        },
        {
          title: 'Dance of Lanterns',
          startDate: '2021-02-18',
          endDate: '2021-03-02',
          image: './images/Dance_of_Lanterns.jpg'
        },
      ],
      weaponBanner: [
        {
          title: 'Epitome Invocation',
          startDate: '2021-02-02',
          endDate: '2021-02-23',
          image: './images/Wish_Epitome_Invocation_2021_02_03.jpg'
        },
        {
          title: 'Epitome Invocation',
          startDate: '2021-02-24',
          endDate: '2021-03-16',
          image: './images/Wish_Epitome_Invocation_2021_02_23.jpg'
        },
      ],
      miniEvent: [
        {
          title: 'Five Flushes of Fortune',
          startDate: '2021-02-02',
          endDate: '2021-02-10',
          image: './images/Five_Flushes_of_Fortune.jpg'
        },
        {
          title: 'A Sea of Lights" Fan Art Event',
          startDate: '2021-02-18',
          endDate: '2021-02-24',
          image: './images/A_Sea_of_Lights_Fan_Art_Event.png'
        },
        {
          title: 'Ley Line Overflow',
          startDate: '2021-02-26',
          endDate: '2021-03-05',
          image: './images/Ley_Line_Overflow.jpg'
        },
      ],
      specialEvent: [
        {
          title: 'Lantern Rite',
          startDate: '2021-02-10',
          endDate: '2021-02-28',
          image: './images/Lantern_Rite.jpg'
        },
        {
          title: 'May Fortune Find You',
          startDate: '2021-02-11',
          endDate: '2021-02-26',
          image: './images/May_Fortune_Find_You_Rewards.png'
        },
        
        {
          title: 'Stand by Me',
          startDate: '2021-02-18',
          endDate: '2021-03-07',
          image: './images/Stand_by_Me.jpg'
        },
        {
          title: "Night Sky's Grace",
          startDate: '2021-02-26',
          endDate: '2021-03-17',
          image: './images/Night_Sky%27s_Grace.jpg'
        },
        {
          title: 'Lantern-Lit Sky',
          startDate: '2021-02-02',
          endDate: '2021-03-15',
          image: './images/Battle-Pass-Lantern-Lit-Sky.png'
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

    const computeStartSpan = (item: BaseEvent) => {
      const diff = dayjs(item.startDate).diff(startDate.value, 'day') + 1
      return diff
    }

    const computeEndSpan = (item: BaseEvent) => {
      const diff = dayjs(item.endDate).diff(item.startDate, 'day') + 1
      return diff
    }

    const computeTodayLine = computed(() => {
      return dayjs().diff(startDate.value, 'd') + 1
    })

    const computeDateChecker = computed(() => {
      const temp: number[] = []
      // for(let key in eventDetails.value) {
      //   const value = eventDetails.value[key]
      // }
      temp.push(dayjs().diff(startDate.value, 'd'))
      Object.entries(eventDetails.value).forEach(
        ([key, value]) => {
          value.forEach((item: BaseEvent) => {
            temp.push(dayjs(item.startDate).diff(startDate.value, 'd'))
            temp.push(dayjs(item.endDate).diff(startDate.value, 'd'))
          })
        }
      );
      return [...new Set(temp)]
    })

    const computeShowDate = (day: number) => {
      // console.log(day);
      const checker = computeDateChecker.value.find((a: number) => a == day)
      if(checker != undefined) {
        return '100'
      } else {
        return '0'
      }
    }

    // unused animation
    const mouseOverEvent = (e: any) => {
      const divSpan = e.target as HTMLDivElement 
      const image = divSpan.firstChild as HTMLImageElement
      const imageAspectRatio = image.naturalWidth / image.naturalHeight
      divSpan.style.width = image.height * imageAspectRatio + 'px'
      console.log(e);
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
      mouseOverEvent,
      computeTodayLine,
      computeShowDate,
      computeDateChecker
    }
  }
})

</script>

<style>

</style>