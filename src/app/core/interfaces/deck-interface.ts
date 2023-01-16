export interface Deck {
  success: boolean,
  deck_id: string,
  remaining: number,
  shuffled: boolean
}
export interface Card {
  [prop: string]: any,
  success: boolean,
  deck_id: string,
  cards: cards[],
  remaining: number
}

export interface cards {
  code: string,
  image: string,
  images: {
    svg: string,
    png: string
  },
  value: string,
  suit: string
}

