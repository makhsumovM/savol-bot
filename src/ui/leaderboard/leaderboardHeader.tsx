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
          className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.85] tracking-tighter"
        >
          <span className="text-primary">{leaderboardFirstWord}</span>
          {leaderboardRestWords.length > 0 && (
            <span className="block text-primary-2"> {leaderboardRestWords.join(' ')}</span>
          )}
        </motion.h1>

        <p className="text-xl text-muted-foreground/70 leading-relaxed max-w-xl font-medium">
          {t(
            'leaderboard.description',
          )}
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <GlassBadge
          icon={<Zap className="w-5 h-5 text-primary-2 fill-primary-2/20" />}
          text={t('leaderboard.meta.multiTrack', 'Multi-Track System')}
          delay={0.2}
          theme="primary-2"
        />
        <GlassBadge
          icon={<Clock3 className="w-5 h-5 text-primary-3" />}
          text={t('leaderboard.meta.refreshWindow', 'Updates every ~15m')}
          delay={0.3}
          theme="primary-3"
        />
      </div>
    </motion.div>
  )
}

const GlassBadge = ({ icon, text, delay, theme = 'default' }: { icon: React.ReactNode, text: string, delay: number, theme?: string }) => {
  const themes: Record<string, string> = {
    'primary-2': 'bg-primary-2/5 border-primary-2/20 text-primary-2',
    'primary-3': 'bg-primary-3/5 border-primary-3/20 text-primary-3',
    'default': 'bg-card/30 border-border/40 text-foreground/80'
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.05 }}
      className={`
           flex items-center gap-2 px-3 py-2 rounded-2xl
           backdrop-blur-xl border shadow-sm
           transition-all duration-300 ${themes[theme] || themes.default}
        `}
    > 
      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-background/40 border border-white/5 shadow-inner">
        {icon}
      </div>
      <span className="text-xs font-black uppercase tracking-widest leading-tight">
        {text}
      </span>
    </motion.div>
  )
}