'use client'

import { useQuery } from '@tanstack/react-query'
import { getTotalUsers } from '@/api/userApi'
import { HeroSection } from '@/ui/home/heroSection'
import { FinalCtaSection } from '@/ui/home/finalCtaSection'
import ModeSection from '@/ui/home/modeSection'

export default function Home() {
  const { data: totalUsers, isPending } = useQuery({
    queryKey: ['totalUsers'],
    queryFn: getTotalUsers,
    staleTime: 1000 * 60 * 5,
  })

  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-primary/20 selection:text-primary">
      {}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 left-0 w-full h-full bg-background" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] animate-pulse-slow" />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary-2/5 blur-[100px] animate-pulse-slow"
          style={{ animationDelay: '2.5s' }}
        />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full bg-primary/3 blur-[80px] animate-float" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <main className="relative z-10">
        <HeroSection totalUsers={totalUsers?.totalUsers} isPending={isPending} />
        <ModeSection />
        <FinalCtaSection totalUsers={totalUsers?.totalUsers} />
      </main>
    </div>
  )
}
