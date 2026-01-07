import { HeroSection } from "@/components/hero-section"
import { ArtGallerySlider } from "@/components/art-gallery-slider"
import { CultureSection } from "@/components/culture-section"

export default function Home() {
  return (
    <main className="w-screen overflow-y-auto overflow-x-hidden bg-background">
      {/* Hero Section with Background Image and Navigation */}
      <HeroSection />

      {/* Timeline Section */}
      <div id="timeline" className="h-screen w-full overflow-hidden">
        <ArtGallerySlider />
      </div>

      {/* Culture Section */}
      <div id="culture">
        <CultureSection />
      </div>

      <div id="about" className="relative min-h-screen w-full bg-background p-4 py-12 sm:p-6 sm:py-16 md:p-8 md:py-20">
        <div
          className="absolute right-4 top-1/2 h-32 w-32 -translate-y-1/2 opacity-25 sm:right-6 sm:h-48 sm:w-48 md:right-8 md:h-64 md:w-64 lg:h-80 lg:w-80"
          style={{
            backgroundImage: "url('/um-logo-color.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground sm:mb-5 sm:text-4xl md:mb-6 md:text-5xl">
            About Us
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:space-y-5 sm:text-lg md:space-y-6">
            <p>
              We are a group of passionate students from Universiti Malaya dedicated to documenting the remarkable
              transformation of Kampung Kerinchi from a traditional village into the modern Bangsar South. With the
              invaluable guidance and expertise of Professor Dr. Hanafi Hussin, we have engaged deeply with the
              community to record the architectural evolution and personal stories that define this area's unique
              identity. This digital platform serves as our contribution to ensuring Kerinchi's rich cultural legacy
              remains vibrant and accessible despite rapid urbanization.
            </p>
            <p>
              Our mission is to bridge the past and present, honoring original residents while educating future
              generations about their profound cultural roots. By integrating academic research with heartfelt community
              memories, we aim to foster a more connected and culturally aware society. We are grateful to Professor Dr.
              Hanafi Hussin for his contributions, which have been essential in our effort to celebrate the history and
              heritage that continue to shape our community today.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
