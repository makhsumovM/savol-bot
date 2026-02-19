'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface LeaderboardPageLayoutProps {
  children: ReactNode
}

export const LeaderboardPageLayout = ({ children }: LeaderboardPageLayoutProps) => (
  <section className="relative min-h-screen overflow-hidden bg-background">
    <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
    <div className="absolute inset-0 bg-linear-to-b from-background via-background/40 to-background pointer-events-none" />

    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.15, 0.25, 0.15],
        rotate: [0, 90, 0]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute -top-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px] pointer-events-none"
    />

    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.1, 0.2, 0.1],
        x: [0, 50, 0]
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
      className="absolute top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-primary-2/15 blur-[120px] pointer-events-none"
    />

    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.05, 0.15, 0.05],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 5
      }}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none"
    />

    <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {children}
    </div>
  </section>
)