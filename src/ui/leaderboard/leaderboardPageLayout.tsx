'use client'

import { ReactNode } from 'react'

interface LeaderboardPageLayoutProps {
  children: ReactNode
}

export const LeaderboardPageLayout = ({ children }: LeaderboardPageLayoutProps) => (
  <section className="relative min-h-screen overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

    <div className="absolute -top-48 -right-32 h-72 w-72 sm:h-[420px] sm:w-[420px] rounded-full bg-primary/25 blur-[120px] animate-pulse-slow" />
    <div
      className="absolute -bottom-48 -left-32 h-72 w-72 sm:h-[420px] sm:w-[420px] rounded-full bg-primary-2/20 blur-[120px] animate-pulse-slow"
      style={{ animationDelay: '0.6s' }}
    />
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-violet-500/10 blur-[110px] animate-pulse-slow"
      style={{ animationDelay: '1.2s' }}
    />

    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12 md:py-16 space-y-8 sm:space-y-10">
      {children}
    </div>
  </section>
)
