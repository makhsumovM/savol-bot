'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface LeaderboardPageLayoutProps {
  children: ReactNode
}

export const LeaderboardPageLayout = ({ children }: LeaderboardPageLayoutProps) => (
  <section className="relative min-h-screen overflow-hidden bg-background">
    <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {children}
    </div>
  </section>
)
