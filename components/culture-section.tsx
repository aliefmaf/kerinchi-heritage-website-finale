"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cultureItems } from "@/data/culture"
import { CultureCard } from "./culture-card"
import { CultureModal } from "./culture-modal"
import type { CultureItem } from "@/types/culture"

export function CultureSection() {
  const [selectedCulture, setSelectedCulture] = useState<CultureItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (item: CultureItem) => {
    setSelectedCulture(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedCulture(null), 300)
  }

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-background to-muted/30 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12 md:mb-16"
        >
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Cultural Heritage
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
            Discover the rich traditions and customs of the Kerinchi people
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {cultureItems.map((item, index) => (
            <CultureCard key={item.id} item={item} index={index} onClick={() => handleCardClick(item)} />
          ))}
        </div>
      </div>

      <CultureModal culture={selectedCulture} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  )
}
