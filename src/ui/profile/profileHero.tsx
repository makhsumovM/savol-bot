'use client'

import { useTranslation } from 'react-i18next'
import { motion, Variants } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function ProfileHero() {
  const { t } = useTranslation()
  const profileTitle = t('profile.title')
  const [profileFirstWord, ...profileRestWords] = profileTitle.split(' ')

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
      className="mb-4 flex flex-col items-center gap-6 text-center sm:mb-6"
    >
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
          {t('profile.badge')}
        </span>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        suppressHydrationWarning
        className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl"
      >
        <span className="text-primary">{profileFirstWord}</span>
        {profileRestWords.length > 0 && (
          <span className="text-primary-2"> {profileRestWords.join(' ')}</span>
        )}
      </motion.h1>
    </motion.div>
  )
}
