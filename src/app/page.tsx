'use client'

import { useQuery } from '@tanstack/react-query'
import { getTotalUsers } from '@/api/userApi'
import { HeroSection } from '@/ui/home/heroSection'
import { FeaturesSection } from '@/ui/home/featuresSection'
import { FinalCtaSection } from '@/ui/home/finalCtaSection'
import ModeSection from '@/ui/home/modeSection'

export default function Home() {
  const { data: totalUsers } = useQuery({
    queryKey: ['totalUsers'],
    queryFn: getTotalUsers,
    staleTime: 1000 * 60 * 5,
  })

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-background via-background to-primary/8" />
      <div className="pointer-events-none absolute -top-56 -right-40 h-[460px] w-[460px] rounded-full bg-primary/18 blur-[130px] animate-pulse-slow" />
      <div
        className="pointer-events-none absolute top-[34%] -left-44 h-[420px] w-[420px] rounded-full bg-primary-2/14 blur-[130px] animate-pulse-slow"
        style={{ animationDelay: '1.2s' }}
      />
      <div className="pointer-events-none absolute -bottom-52 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative">
        <HeroSection totalUsers={totalUsers?.totalUsers} />
        <FeaturesSection />
        <ModeSection />
        <FinalCtaSection totalUsers={totalUsers?.totalUsers} />
      </div>
    </div>
  )
}
