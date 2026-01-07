"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"
import type { CultureItem } from "@/types/culture"

interface CultureModalProps {
  culture: CultureItem | null
  isOpen: boolean
  onClose: () => void
}

export function CultureModal({ culture, isOpen, onClose }: CultureModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!culture) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-4 z-50 flex items-center justify-center sm:inset-6 md:inset-8"
          >
            <div className="relative h-full w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl sm:rounded-2xl">
              <button
                onClick={onClose}
                className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-background sm:right-4 sm:top-4 sm:p-2"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <div className="h-full overflow-y-auto">
                <div className="relative h-48 w-full sm:h-56 md:h-64">
                  <Image
                    src={culture.image || "/placeholder.svg"}
                    alt={culture.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: culture.objectPosition || "center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 sm:bottom-6 sm:left-6 sm:gap-4">
                    <span className="text-4xl sm:text-5xl md:text-6xl">{culture.icon}</span>
                    <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">{culture.title}</h2>
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                  <p className="mb-6 text-base leading-relaxed text-muted-foreground sm:mb-8 sm:text-lg">
                    {culture.detailedContent.overview}
                  </p>

                  <div className="space-y-6 sm:space-y-8">
                    {culture.detailedContent.sections.map((section, index) => (
                      <div key={index}>
                        <h3 className="mb-2 font-serif text-lg font-semibold text-foreground sm:mb-3 sm:text-xl">
                          {section.title}
                        </h3>
                        {section.image ? (
                          <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:gap-6">
                            <div className="relative h-40 w-full flex-shrink-0 overflow-hidden rounded-lg sm:h-48 md:h-auto md:w-64">
                              <Image
                                src={section.image || "/placeholder.svg"}
                                alt={section.title}
                                fill
                                className="object-cover"
                                style={{ objectPosition: section.objectPosition || "center" }}
                              />
                            </div>
                            <p className="flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                              {section.content}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {section.content}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
