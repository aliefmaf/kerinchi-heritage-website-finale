"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { Artwork } from "@/types/artwork"

interface DetailModalProps {
  artwork: Artwork | null
  isOpen: boolean
  onClose: () => void
}

export function DetailModal({ artwork, isOpen, onClose }: DetailModalProps) {
  if (!artwork) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-4 z-50 flex items-center justify-center sm:inset-6 md:inset-8"
          >
            <div className="relative max-h-full w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl sm:rounded-2xl">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-3 top-3 z-10 rounded-full border border-border bg-card/80 p-1.5 backdrop-blur-md transition-colors hover:bg-muted sm:right-4 sm:top-4 sm:p-2"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Scrollable content */}
              <div className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-h-[calc(100vh-3rem)] md:max-h-[calc(100vh-4rem)]">
                <div className="relative h-48 sm:h-56 md:h-80">
                  <img
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    className={`h-full w-full object-cover ${
                      artwork.objectPosition === "top"
                        ? "object-top"
                        : artwork.objectPosition === "bottom"
                          ? "object-bottom"
                          : artwork.objectPosition === "left"
                            ? "object-left"
                            : artwork.objectPosition === "right"
                              ? "object-right"
                              : "object-center"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6 lg:p-8">
                    {artwork.year && (
                      <p className="mb-0.5 font-mono text-xs font-semibold tracking-wide text-accent-foreground sm:mb-1 sm:text-sm">
                        {artwork.year}
                      </p>
                    )}
                    {artwork.era && (
                      <p className="mb-1 text-[10px] uppercase tracking-widest text-accent-foreground/90 font-mono sm:mb-2 sm:text-xs">
                        {artwork.era}
                      </p>
                    )}
                    <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                      {artwork.title}
                    </h2>
                    <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">{artwork.artist}</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 md:p-6 lg:p-8">
                  {artwork.description && (
                    <p className="text-pretty text-base leading-relaxed text-foreground sm:text-lg">
                      {artwork.description}
                    </p>
                  )}

                  {artwork.significance && (
                    <div className="mt-4 rounded-lg border-l-2 border-accent bg-muted/50 p-3 sm:mt-6 sm:p-4">
                      <h3 className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-foreground sm:mb-2 sm:text-xs">
                        Historical Significance
                      </h3>
                      <p className="text-pretty text-sm leading-relaxed text-foreground">{artwork.significance}</p>
                    </div>
                  )}

                  {artwork.detailedHistory && artwork.detailedHistory.length > 0 && (
                    <div className="mt-6 sm:mt-8">
                      <h3 className="mb-3 font-serif text-xl font-bold text-foreground sm:mb-4 sm:text-2xl">
                        Detailed History
                      </h3>
                      <div className="space-y-4 sm:space-y-6">
                        {artwork.detailedHistory.map((item, index) => {
                          // Handle both string and object types
                          const isString = typeof item === "string"
                          const text = isString ? item : item.text
                          const image = isString ? undefined : item.image
                          const imagePosition = isString ? undefined : item.imagePosition
                          const objectPosition = isString ? undefined : item.objectPosition

                          if (!image) {
                            // Plain text paragraph
                            return (
                              <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base"
                              >
                                {text}
                              </motion.p>
                            )
                          }

                          // Paragraph with image
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`flex flex-col gap-3 sm:gap-4 ${
                                imagePosition === "top"
                                  ? ""
                                  : imagePosition === "left"
                                    ? "md:flex-row-reverse"
                                    : "md:flex-row"
                              }`}
                            >
                              {imagePosition === "top" && (
                                <div className="w-full">
                                  <img
                                    src={image || "/placeholder.svg"}
                                    alt=""
                                    className={`h-48 w-full rounded-lg object-cover shadow-md sm:h-56 md:h-64 ${
                                      objectPosition === "top"
                                        ? "object-top"
                                        : objectPosition === "bottom"
                                          ? "object-bottom"
                                          : objectPosition === "left"
                                            ? "object-left"
                                            : objectPosition === "right"
                                              ? "object-right"
                                              : "object-center"
                                    }`}
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                                  {text}
                                </p>
                              </div>
                              {imagePosition !== "top" && (
                                <div className="w-full md:w-64 flex-shrink-0">
                                  <img
                                    src={image || "/placeholder.svg"}
                                    alt=""
                                    className={`h-40 w-full rounded-lg object-cover shadow-md sm:h-48 md:h-40 ${
                                      objectPosition === "top"
                                        ? "object-top"
                                        : objectPosition === "bottom"
                                          ? "object-bottom"
                                          : objectPosition === "left"
                                            ? "object-left"
                                            : objectPosition === "right"
                                              ? "object-right"
                                              : "object-center"
                                    }`}
                                  />
                                </div>
                              )}
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {artwork.keyFacts && artwork.keyFacts.length > 0 && (
                    <div className="mt-6 sm:mt-8">
                      <h3 className="mb-3 font-serif text-xl font-bold text-foreground sm:mb-4 sm:text-2xl">
                        Key Facts
                      </h3>
                      <div className="grid gap-2 sm:gap-3 md:grid-cols-2">
                        {artwork.keyFacts.map((fact, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-2 rounded-lg bg-muted/50 p-2.5 sm:gap-3 sm:p-3"
                          >
                            <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                            <p className="text-sm leading-relaxed text-foreground">{fact}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
