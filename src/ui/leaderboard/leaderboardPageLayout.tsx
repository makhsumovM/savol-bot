'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface LeaderboardPageLayoutProps {
  children: ReactNode
}

export const LeaderboardPageLayout = ({ children }: LeaderboardPageLayoutProps) => (
  <section className="relative min-h-screen overflow-hidden bg-background">
    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary-2/5 blur-3xl" />
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border/45 to-transparent pointer-events-none" />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {children}
    </div>
  </section>
)
