export interface CultureItem {
  id: string
  title: string
  brief: string
  icon: string
  image: string
  objectPosition?: "top" | "center" | "bottom" | "left" | "right"
  detailedContent: {
    overview: string
    sections: {
      title: string
      content: string
      image?: string
      objectPosition?: "top" | "center" | "bottom" | "left" | "right"
    }[]
    highlights: string[]
  }
}
