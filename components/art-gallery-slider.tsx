"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArtworkCard } from "./artwork-card"
import { NavigationDots } from "./navigation-dots"
import { DetailModal } from "./detail-modal"
import { artworks } from "@/data/artworks"
import { useSliderNavigation } from "@/hooks/use-slider-navigation"
import { useSliderDrag } from "@/hooks/use-slider-drag"
import { useSliderWheel } from "@/hooks/use-slider-wheel"
import { useColorExtraction, useCurrentColors } from "@/hooks/use-color-extraction"
import type { Artwork } from "@/types/artwork"

export function ArtGallerySlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { currentIndex, goToNext, goToPrev, goToSlide } = useSliderNavigation({
    totalSlides: artworks.length,
    enableKeyboard: true,
  })

  const { isDragging, dragX, handleDragStart, handleDragMove, handleDragEnd } = useSliderDrag({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrev,
  })

  useSliderWheel({
    sliderRef,
    onScrollLeft: goToNext,
    onScrollRight: goToPrev,
    currentIndex,
    totalSlides: artworks.length,
  })

  const colors = useColorExtraction(artworks)
  const currentColors = useCurrentColors(colors, artworks[currentIndex]?.id)

  const handleCardClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedArtwork(null), 300)
  }

  const getSlideWidth = () => {
    if (typeof window === "undefined") return 320
    return window.innerWidth < 640 ? 320 : window.innerWidth < 768 ? 360 : 532
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, ${currentColors[0]}33 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, ${currentColors[1]}33 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, ${currentColors[2]}22 0%, transparent 70%),
              linear-gradient(180deg, oklch(0.98 0.01 60) 0%, oklch(0.95 0.01 55) 100%)
            `,
          }}
        />
      </AnimatePresence>

      {/* Subtle blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-4 top-4 z-10 sm:left-6 sm:top-5 md:left-8 md:top-6"
      >
        <h1 className="font-serif text-xl font-bold text-foreground sm:text-2xl md:text-3xl">Kampung Kerinchi</h1>
        <p className="text-[10px] text-muted-foreground sm:text-xs md:text-sm">A Journey Through Time</p>
      </motion.div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="relative flex h-full w-full cursor-grab items-center active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <motion.div
          className="flex items-center gap-4 px-[calc(50vw-160px)] sm:gap-6 sm:px-[calc(50vw-180px)] md:gap-8 md:px-[calc(50vw-250px)]"
          animate={{
            x: -currentIndex * getSlideWidth() + dragX,
          }}
          transition={isDragging ? { duration: 0 } : { duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          {artworks.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              isActive={index === currentIndex}
              dragOffset={dragX}
              index={index}
              currentIndex={currentIndex}
              onClick={() => handleCardClick(artwork)}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation dots */}
      <NavigationDots total={artworks.length} current={currentIndex} onSelect={goToSlide} colors={currentColors} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-4 hidden items-center gap-2 text-muted-foreground sm:bottom-8 sm:left-8 sm:gap-3 md:flex"
      >
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground sm:px-2 sm:py-1 sm:text-xs">
          ←
        </kbd>
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground sm:px-2 sm:py-1 sm:text-xs">
          →
        </kbd>
        <span className="text-[10px] sm:text-xs">navigate through time</span>
      </motion.div>

      <DetailModal artwork={selectedArtwork} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
