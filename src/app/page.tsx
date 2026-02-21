import { HeroSection } from '@/ui/home/heroSection'
import { FinalCtaSection } from '@/ui/home/finalCtaSection'
import ModeSection from '@/ui/home/modeSection'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-primary/20 selection:text-primary">
      <main className="relative z-10">
        <HeroSection />
        <ModeSection />
        <FinalCtaSection />
      </main>
    </div>
  )
}
