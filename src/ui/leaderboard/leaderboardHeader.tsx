'use client'

import { motion, Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Clock3, Zap, Sparkles } from 'lucide-react'
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const LeaderboardHeader = () => {
  const { t } = useTranslation()
  const leaderboardTitle = t('leaderboard.title', 'Global Leaderboard')
  const [leaderboardFirstWord, ...leaderboardRestWords] = leaderboardTitle.split(' ')

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        show: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="flex flex-col xl:flex-row gap-8 xl:items-end xl:justify-between"
    >
      <div className="space-y-6 max-w-2xl">
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-2 backdrop-blur-xl"
        >
          <motion.div
            animate={{ rotate: [0, 12, -12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.div>
          <span className="text-xs font-semibold tracking-wide text-primary sm:text-sm">
            {t('leaderboard.badge')}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.9] tracking-tight"
        >
          <span className="text-primary">{leaderboardFirstWord}</span>
          {leaderboardRestWords.length > 0 && (
            <span className="text-primary-2"> {leaderboardRestWords.join(' ')}</span>
          )}
        </motion.h1>

        <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-xl">
          {t(
            'leaderboard.description',
            'Track the best results across frontend, backend, and mobile development. Compete for the top spot!',
          )}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <GlassBadge
          icon={<Zap className="w-4 h-4 text-amber-500 fill-amber-500/20" />}
          text={t('leaderboard.meta.multiTrack', 'Multi-Track System')}
          delay={0.2}
        />
        <GlassBadge
          icon={<Clock3 className="w-4 h-4 text-blue-500" />}
          text={t('leaderboard.meta.refreshWindow', 'Updates every ~15m')}
          delay={0.3}
        />
      </div>
    </motion.div>
  )
}

const GlassBadge = ({ icon, text, delay }: { icon: React.ReactNode, text: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.05)' }}
    className="
         flex items-center gap-3 px-4 py-2.5 rounded-xl
         bg-card/30 backdrop-blur-md border border-border/40
         shadow-xs transition-all duration-300
      "
  >
    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-background/50 border border-white/10 shadow-inner">
      {icon}
    </div>
    <span className="text-sm font-semibold text-foreground/80 leading-tight">
      {text}
    </span>
  </motion.div>
)