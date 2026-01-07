"use server"

import { GoogleGenAI } from "@google/genai"

interface TransformImageResult {
  success: boolean
  imageData?: string
  error?: string
}

export async function transformImage(imageData: string, mimeType: string): Promise<TransformImageResult> {
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY

    if (!apiKey) {
      return {
        success: false,
        error: "API key not configured. Please add GOOGLE_AI_API_KEY to your environment variables.",
      }
    }

    const ai = new GoogleGenAI({ apiKey })

    const prompt = `Reimagine all individuals in this photo as characters in a 1950s Kampung Kerinchi story. 
    Their attire must be authentic clothes of the era (hardworking, labour, kampung clothes).
    Give the subjects striking and dynamic poses suitable for the scene: they could be standing proudly by a veranda, sitting thoughtfully on wooden steps, writing a letter at a vintage desk, or even working casually on a traditional wooden kampung house on stilts. 
    The background should be a rich, detailed 1950s Kuala Lumpur kampung Kerinchi setting with tropical foliage.
    
    IMPORTANT: Apply a heavy vintage film filter aesthetic characteristic of the 1950s. Use faded saturations, warm sepia undertones, slight chromatic aberration at the edges, and authentic 35mm film grain. The lighting should be golden and nostalgic, like a faded memory.
    Ensure the faces of all individuals remain clearly recognizable as the original people, but their bodies and environment are fully integrated into these striking 1950s poses and activities.`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            inlineData: {
              data: imageData,
              mimeType: mimeType,
            },
          },
          { text: prompt },
        ],
      },
    })

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return {
            success: true,
            imageData: part.inlineData.data,
          }
        }
      }
    }

    return {
      success: false,
      error: "The model did not return an image. Please try again with a different photo.",
    }
  } catch (err: any) {
    console.error("Transform image error:", err)
    return {
      success: false,
      error: err.message || "Something went wrong during the transformation.",
    }
  }
}
