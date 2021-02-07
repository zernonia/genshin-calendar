
interface Event {
  characterBanner: BaseEvent[],
  weaponBanner: BaseEvent[],
  specialEvent: SpecialEvent[],
  miniEvent: BaseEvent[]
}

interface BaseEvent {
  title: string,
  startDate: string,
  endDate: string,
  image: string
}

interface SpecialEvent extends BaseEvent {
  order?: number,
}

export {
  Event,
  BaseEvent,
  SpecialEvent
}
