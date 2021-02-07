
interface Event {
  eventWish: WishEvent[]
}

interface WishEvent {
  title: string,
  startDate: string,
  endDate: string,
  image: string
}

export {
  Event,
  WishEvent
}
