"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { CultureItem } from "@/types/culture"

interface CultureCardProps {
  item: CultureItem
  index: number
  onClick: () => void
}

export function CultureCard({ item, index, onClick }: CultureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-4 left-4 text-4xl">{item.icon}</div>
      </div>

      <div className="p-6">
        <h3 className="mb-2 font-serif text-xl font-bold text-foreground">{item.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.brief}</p>

        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
          <span>Learn more</span>
          <motion.span initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
            →
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
