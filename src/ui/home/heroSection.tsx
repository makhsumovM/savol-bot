'use client'

import { motion, Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Activity, Dices, Users, ArrowRight, Sparkles, ArrowUpRight } from 'lucide-react'
import { HomeLeaderboardPreview } from './homeLeaderboardPreview'
import { Typewriter } from './typewriterText'

interface HeroSectionProps {
  totalUsers?: number
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function HeroSection({ totalUsers }: HeroSectionProps) {
  const { t } = useTranslation()
  const appName = t('app.name')
  const normalizedName = appName.replace(/([a-z])([A-Z])/g, '$1 $2')
  const brandWords = normalizedName.split(/\s+/).filter(Boolean)

  return (
    <section className="relative pt-8 sm:pt-12" aria-label="Hero">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-2 backdrop-blur-xl">
              <motion.div
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="text-xs font-semibold tracking-wide text-primary sm:text-sm">
                {t('home.hero.badge')}
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-5">
              <h1 className="text-5xl font-black tracking-tight flex flex-wrap gap-x-3 sm:text-6xl lg:text-7xl">
                {brandWords.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1]  }}
                    className={index % 2 === 0 ? 'text-primary' : 'text-primary-2'}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p variants={fadeUp} className="text-xl font-semibold text-foreground/85 sm:text-2xl">
                {t('app.subtitle')}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="max-w-2xl rounded-2xl border border-border/40 bg-card/55 p-4 text-sm text-muted-foreground shadow-xl shadow-black/5 backdrop-blur-2xl sm:p-5 sm:text-base"
              >
                <Typewriter text={t('app.description')} delay={220} speed={34} />
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/marathon" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2">
                <span className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                <Activity className="h-5 w-5 shrink-0 relative z-10" />
                <span className="leading-none relative z-10">{t('home.hero.startButton')}</span>
                <ArrowRight className="h-4 w-4 shrink-0 relative z-10 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link href="/random" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/50 bg-card/50 px-8 py-4 font-semibold text-foreground backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-primary-2/40 hover:bg-card/70 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-2/50 focus-visible:ring-offset-2">
                <Dices className="h-5 w-5 shrink-0 text-primary-2" />
                <span className="leading-none">{t('home.hero.quickPractice')}</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <div className="pointer-events-none absolute inset-2 rounded-3xl bg-linear-to-br from-primary/12 via-transparent to-primary-2/12 blur-2xl animate-glow-pulse" />
            <HomeLeaderboardPreview />
          </motion.div>
        </div>

        {typeof totalUsers === 'number' && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-12 w-full max-w-5xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="pointer-events-none absolute inset-2 rounded-3xl bg-primary-2/15 blur-2xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl backdrop-saturate-180 sm:p-5">
              <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.04]" />

              <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full items-center justify-center gap-4 sm:w-auto sm:justify-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {t('home.stats.visitors')}
                    </div>
                    <div className="mt-1 flex items-center justify-center gap-2 text-2xl font-black leading-none sm:justify-start sm:text-3xl">
                      <span className="text-primary">{totalUsers.toLocaleString()}+</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-xs font-semibold text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    {t('modes.marathon.title')}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary-2/25 bg-primary-2/8 px-3 py-1.5 text-xs font-semibold text-primary-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-2 animate-pulse" />
                    {t('modes.random.title')}
                  </div>
                </div>

                <div className="flex w-full items-center justify-center sm:w-auto sm:justify-end">
                  <Link
                    href="/leaderboard"
                    className="group inline-flex items-center gap-2 rounded-xl border border-border/50 bg-background/50 px-3.5 py-2 text-xs font-semibold text-foreground/85 backdrop-blur-xl transition-all duration-300 hover:border-primary-2/40 hover:text-primary-2 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-2/40"
                  >
                    {t('leaderboard.title')}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
