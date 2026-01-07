"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import type { Artwork } from "@/types/artwork"

interface ArtworkCardProps {
  artwork: Artwork
  isActive: boolean
  dragOffset: number
  index: number
  currentIndex: number
  onClick: () => void
}

export function ArtworkCard({ artwork, isActive, dragOffset, index, currentIndex, onClick }: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const distance = index - currentIndex
  const parallaxOffset = dragOffset * (0.1 * (distance + 1))

  return (
    <motion.div
      className="relative flex-shrink-0"
      animate={{
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.5,
        rotateY: distance * 5,
      }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      style={{
        x: parallaxOffset,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="group relative cursor-pointer overflow-hidden rounded-2xl"
        onClick={onClick}
        animate={{
          y: isHovered && isActive ? -10 : 0,
          boxShadow: isHovered && isActive ? "0 40px 80px -20px rgba(0,0,0,0.2)" : "0 20px 40px -10px rgba(0,0,0,0.1)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="absolute inset-0 rounded-2xl border border-primary/20 bg-card/80 backdrop-blur-md" />

        <div className="relative h-[320px] w-[320px] overflow-hidden rounded-2xl p-2 sm:h-[360px] sm:w-[360px] sm:p-2.5 md:h-[500px] md:w-[500px] md:p-3">
          <motion.img
            src={artwork.image}
            alt={artwork.title}
            className="h-full w-full rounded-xl object-cover"
            animate={{
              scale: isHovered && isActive ? 1.05 : 1,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            crossOrigin="anonymous"
            draggable={false}
          />

          <motion.div
            className="absolute inset-x-2 bottom-2 rounded-b-xl bg-gradient-to-t from-secondary via-secondary/60 to-transparent sm:inset-x-2.5 sm:bottom-2.5 md:inset-x-3 md:bottom-3"
            initial={{ opacity: 0, height: "40%" }}
            animate={{
              opacity: isActive ? 1 : 0,
              height: isHovered ? "65%" : "40%",
            }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute inset-x-2 bottom-2 select-none p-3 sm:inset-x-2.5 sm:bottom-2.5 sm:p-4 md:inset-x-3 md:bottom-3 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: isActive ? 0.1 : 0 }}
          >
            {artwork.year && (
              <motion.p
                className="mb-0.5 font-mono text-xs font-semibold tracking-wide text-accent-foreground sm:mb-1 sm:text-sm"
                animate={{ y: isHovered ? -5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {artwork.year}
              </motion.p>
            )}
            {artwork.era && (
              <motion.p
                className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent-foreground/90 sm:mb-2 sm:text-xs"
                animate={{ y: isHovered ? -5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {artwork.era}
              </motion.p>
            )}
            <motion.h2
              className="font-serif text-lg font-bold leading-tight text-primary-foreground sm:text-xl md:text-2xl lg:text-3xl"
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {artwork.title}
            </motion.h2>

            {artwork.description && (
              <motion.p
                className="mt-1.5 text-xs leading-relaxed text-primary-foreground/80 sm:mt-2 sm:text-sm md:mt-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {artwork.description}
              </motion.p>
            )}

            {artwork.significance && (
              <motion.div
                className="mt-1.5 border-l-2 border-accent pl-2 sm:mt-2 sm:pl-3 md:mt-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : -10,
                }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <p className="text-[10px] leading-relaxed text-primary-foreground/70 sm:text-xs">
                  {artwork.significance}
                </p>
              </motion.div>
            )}

            {isHovered && isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 flex items-center gap-1.5 text-[10px] text-primary-foreground/60 sm:mt-3 sm:gap-2 sm:text-xs md:mt-4"
              >
                <span>Click to learn more</span>
                <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-20 left-3 right-3 h-20 overflow-hidden rounded-2xl opacity-10 blur-sm"
        style={{
          background: `linear-gradient(to bottom, oklch(0.55 0.12 35 / 0.2), transparent)`,
          transform: "scaleY(-1)",
        }}
        animate={{ opacity: isActive ? 0.1 : 0.03 }}
      />
    </motion.div>
  )
}
