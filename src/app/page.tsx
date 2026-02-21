'use client'

import { useQuery } from '@tanstack/react-query'
import { getTotalOnlineUser } from '@/api/userApi'
import { HeroSection } from '@/ui/home/heroSection'
import { FinalCtaSection } from '@/ui/home/finalCtaSection'
import ModeSection from '@/ui/home/modeSection'

export default function Home() {
  const { data: totalUsers, isPending } = useQuery({
    queryKey: ['totalUsers'],
    queryFn: getTotalOnlineUser,
  })

  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-primary/20 selection:text-primary">
      { }


      <main className="relative z-10">
        <HeroSection totalUsers={totalUsers?.totalUsers} isPending={isPending} />
        <ModeSection />
        <FinalCtaSection totalUsers={totalUsers?.totalUsers} />
      </main>
    </div>
  )
}
