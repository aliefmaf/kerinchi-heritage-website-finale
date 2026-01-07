"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { transformImage } from "@/app/actions/transform-image"

interface ImageState {
  data: string
  mimeType: string
}

interface NostalgiaModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NostalgiaModal({ isOpen, onClose }: NostalgiaModalProps) {
  const [originalImage, setOriginalImage] = useState<ImageState | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(",")[1]
        setOriginalImage({
          data: base64,
          mimeType: file.type,
        })
        setResultImage(null)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTransform = async () => {
    if (!originalImage) return

    setIsProcessing(true)
    setError(null)

    try {
      const result = await transformImage(originalImage.data, originalImage.mimeType)

      if (result.success && result.imageData) {
        setResultImage(`data:image/png;base64,${result.imageData}`)
      } else {
        setError(result.error || "Failed to transform image")
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Something went wrong during the transformation.")
    } finally {
      setIsProcessing(false)
    }
  }

  const reset = () => {
    setOriginalImage(null)
    setResultImage(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-background shadow-2xl"
          >
            <div className="max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 z-10 border-b bg-background/95 px-6 py-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold">Nostalgia Tanah Melayu</h2>
                    <p className="text-sm text-muted-foreground">Transform your photo into 1950s Kampung Kerinchi</p>
                  </div>
                  <button onClick={onClose} className="rounded-full p-2 hover:bg-muted transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {!originalImage ? (
                  <div className="text-center">
                    <h3 className="mb-4 font-serif text-3xl font-bold">Kembali ke Zaman Dahulu</h3>
                    <p className="mx-auto mb-8 max-w-xl leading-relaxed text-muted-foreground">
                      Upload a photo. Our AI will reimagine you in striking, dynamic poses with a classic vintage filter
                      amidst the soulful 1950s KL kampung life.
                    </p>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="group mx-auto cursor-pointer rounded-3xl border-2 border-dashed p-16 transition-all hover:border-primary hover:shadow-md"
                    >
                      <div className="flex flex-col items-center">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted transition-transform group-hover:scale-110">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor"
                            viewBox="0 0 256 256"
                          >
                            <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM156,88a12,12,0,1,1-12,12A12,12,0,0,1,156,88Zm-96,96,33.37-33.37a8,8,0,0,1,11.32,0L120,166l49.37-49.37a8,8,0,0,1,11.32,0L216,152v48H60Z"></path>
                          </svg>
                        </div>
                        <span className="mb-2 text-xl font-medium">Pilih Gambar Anda</span>
                        <p className="text-center text-sm italic text-muted-foreground">
                          Click or drag to upload a photo
                          <br />
                          (Individual or Group portraits welcome!)
                        </p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="grid gap-8 md:grid-cols-2">
                      {/* Left Column: Input */}
                      <div className="space-y-4">
                        <div className="overflow-hidden rounded-2xl border bg-card p-2 shadow-lg">
                          <img
                            src={`data:image/png;base64,${originalImage.data}`}
                            alt="Original"
                            className="aspect-square w-full rounded-xl object-cover"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={reset}
                            disabled={isProcessing}
                            className="flex-1 rounded-xl border-2 px-6 py-4 font-medium transition-colors hover:bg-muted"
                          >
                            Tukar Gambar
                          </button>
                          <button
                            onClick={handleTransform}
                            disabled={isProcessing}
                            className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 disabled:opacity-50"
                          >
                            {isProcessing ? (
                              <>
                                <svg
                                  className="h-5 w-5 animate-spin"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Applying Vintage Filter...
                              </>
                            ) : (
                              "Transform to Kerinchi Lama"
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Right Column: Result */}
                      <div className="space-y-4">
                        {isProcessing ? (
                          <div className="flex aspect-square flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-muted p-8 text-center">
                            <div className="relative mb-6 h-16 w-16">
                              <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                            </div>
                            <p className="mb-2 animate-pulse font-serif text-xl italic">
                              Menghidupkan Suasana Kampung...
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Developing your vintage film... You'll be back in the 50s shortly.
                            </p>
                          </div>
                        ) : resultImage ? (
                          <div className="overflow-hidden rounded-2xl border bg-card p-2 shadow-xl">
                            <div className="vintage-photo-container relative overflow-hidden rounded-xl">
                              <img
                                src={resultImage || "/placeholder.svg"}
                                alt="Reimagined result"
                                className="vintage-filter-applied w-full shadow-inner"
                              />
                              <div className="vintage-grain-overlay"></div>
                              <div className="vintage-vignette"></div>

                              <div className="pointer-events-none absolute right-4 top-4 rounded-md border border-primary/20 bg-background/80 px-2 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur">
                                Kodachrome 50s Filter
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-4">
                              <span className="font-serif text-sm italic text-muted-foreground">
                                Tanah Melayu, 1950s (Vintage Filter)
                              </span>
                              <a
                                href={resultImage}
                                download="nostalgia-kl-50s.png"
                                className="flex items-center gap-1 text-sm font-medium hover:underline"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 256 256"
                                >
                                  <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM216,200H40V56H216V200Zm-96-88a12,12,0,1,1-12,12A12,12,0,0,1,120,112Z"></path>
                                </svg>
                                Simpan Gambar
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="flex aspect-square flex-col items-center justify-center rounded-2xl border-2 bg-muted p-8 text-center text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="48"
                              height="48"
                              fill="currentColor"
                              viewBox="0 0 256 256"
                              className="mb-4 opacity-20"
                            >
                              <path d="M160,112a12,12,0,1,1-12,12A12,12,0,0,1,160,112Zm64,0V200a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V56A16,16,0,0,1,48,40H160a8,8,0,0,1,0,16H48V200H208V112a8,8,0,0,1,16,0Zm-32-48a8,8,0,0,0-8,8V80H168a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V96h16a8,8,0,0,0,0-16H200V72A8,8,0,0,0,192,64Z"></path>
                            </svg>
                            <p className="font-serif italic">Your vintage transformation awaits</p>
                          </div>
                        )}

                        {error && (
                          <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm leading-relaxed text-destructive">
                            <strong>Error:</strong> {error}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <style jsx>{`
            .vintage-photo-container {
              position: relative;
            }

            .vintage-filter-applied {
              filter: sepia(0.2) contrast(1.05) brightness(0.95) saturate(0.9);
            }

            .vintage-grain-overlay {
              position: absolute;
              inset: 0;
              pointer-events: none;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
              opacity: 0.04;
              mix-blend-mode: overlay;
            }

            .vintage-vignette {
              position: absolute;
              inset: 0;
              pointer-events: none;
              background: radial-gradient(circle, transparent 40%, rgba(0, 0, 0, 0.15) 100%);
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  )
}
