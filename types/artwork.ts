export interface DetailedHistoryParagraph {
  text: string
  image?: string
  imagePosition?: "left" | "right" | "top"
  objectPosition?: "top" | "center" | "bottom" | "left" | "right"
}

export interface Artwork {
  id: number
  title: string
  artist: string
  year: number
  image: string
  objectPosition?: "top" | "center" | "bottom" | "left" | "right"
  era?: string
  description?: string
  significance?: string
  detailedHistory?: (string | DetailedHistoryParagraph)[]
  keyFacts?: string[]
}
