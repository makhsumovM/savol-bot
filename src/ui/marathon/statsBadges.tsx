'use client'

import type { MarathonMode } from '@/types/marathon-client'
import { motion } from 'framer-motion'
import { CheckCircle2, Trophy, Zap } from 'lucide-react'

interface MarathonStatsBadgesProps {
  mode: MarathonMode
  bestScore: number
  currentScore: number
  difficultyLabel: string
  bestScoreText: string
  difficultyText: string
  currentScoreText: string
}

export default function MarathonStatsBadges({
  mode,
  bestScore,
  currentScore,
  difficultyLabel,
  bestScoreText,
  difficultyText,
  currentScoreText,
}: MarathonStatsBadgesProps) {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:justify-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.08 }}
      data-aos="fade-up"
      data-aos-delay="160"
    >
      <motion.div
        className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground"
        whileHover={{ scale: 1.05, y: -1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.span
          className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80"
          animate={mode === 'mobile' ? { rotate: [0, 360] } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 5, ease: 'linear' }}
        >
          <Trophy className="w-3.5 h-3.5 text-foreground/70" />
        </motion.span>
        <span className="uppercase tracking-wide">{bestScoreText}</span>
        <motion.span
          className="font-semibold text-foreground/80"
          animate={mode === 'mobile' ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
        >
          {bestScore}
        </motion.span>
      </motion.div>

      <motion.div
        className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground"
        whileHover={{ scale: 1.05, y: -1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.span
          className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80"
          animate={mode === 'mobile' ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
        >
          <Zap className="w-3.5 h-3.5 text-foreground/70" />
        </motion.span>
        <span className="uppercase tracking-wide">{difficultyText}</span>
        <span className="font-semibold text-foreground/80">{difficultyLabel}</span>
      </motion.div>

      <motion.div
        className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground"
        whileHover={{ scale: 1.05, y: -1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.span
          className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80"
          animate={mode === 'mobile' ? { opacity: [0.7, 1, 0.7] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-foreground/70" />
        </motion.span>
        <span className="uppercase tracking-wide">{currentScoreText}</span>
        <motion.span
          className="font-semibold text-foreground/80"
          animate={currentScore > 0 && mode === 'mobile' ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {currentScore}
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
