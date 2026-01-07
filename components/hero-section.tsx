"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { NostalgiaModal } from "./nostalgia-modal"
import { Sparkles } from "lucide-react"

export function HeroSection() {
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const [isAIModalOpen, setIsAIModalOpen] = useState(false)

  const handleNavClick = (sectionId: string) => {
    setActiveButton(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setTimeout(() => setActiveButton(null), 600)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/kerinchi-heritage-hero.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAIModalOpen(true)}
          className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/20 sm:right-4 sm:top-4 sm:px-4 sm:py-3 sm:text-base md:right-8 md:top-8"
        >
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">AI Time Travel</span>
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 text-center font-serif text-4xl font-bold tracking-tight text-white sm:mb-8 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Kerinchi Heritage
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4 md:gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick("timeline")}
            className="relative overflow-hidden rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 sm:px-6 sm:py-3 sm:text-base"
          >
            {activeButton === "timeline" && (
              <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-lg bg-white/40"
              />
            )}
            Timeline
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick("culture")}
            className="relative overflow-hidden rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 sm:px-6 sm:py-3 sm:text-base"
          >
            {activeButton === "culture" && (
              <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-lg bg-white/40"
              />
            )}
            Culture
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick("about")}
            className="relative overflow-hidden rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 sm:px-6 sm:py-3 sm:text-base"
          >
            {activeButton === "about" && (
              <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-lg bg-white/40"
              />
            )}
            About Us
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 sm:bottom-12"
        >
          <span className="text-xs font-medium text-white drop-shadow-lg sm:text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="h-5 w-3 rounded-full border-2 border-white sm:h-6 sm:w-4"
          >
            <motion.div className="mx-auto mt-1 h-1.5 w-1 rounded-full bg-white sm:h-2" />
          </motion.div>
        </motion.div>
      </div>

      {/* AI Modal Component */}
      <NostalgiaModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </div>
  )
}
