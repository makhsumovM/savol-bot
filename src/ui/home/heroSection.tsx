'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Activity, Dices, Users, ArrowRight, Sparkles, Trophy, ArrowUpRight } from 'lucide-react'
import { HomeLeaderboardPreview } from './homeLeaderboardPreview'
import { Typewriter } from './typewriterText'

interface HeroSectionProps {
  totalUsers?: number
}

export function HeroSection({ totalUsers }: HeroSectionProps) {
  const { t } = useTranslation()
  const appName = t('app.name')
  const normalizedName = appName.replace(/([a-z])([A-Z])/g, '$1 $2')
  const [brandFirst, ...brandRest] = normalizedName.split(' ')
  const brandSecond = brandRest.join(' ')

  return (
    <section className="relative pt-8 sm:pt-12">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-primary sm:text-sm">
                {t('home.hero.badge')}
              </span>
            </div>

            <div className="space-y-5">
              <h1 className="text-5xl font-black tracking-tight flex sm:text-6xl lg:text-7xl">
                <span className="text-[#ec6216]">{brandFirst}</span>
                {!!brandSecond && <span className="text-[#13aeac]"> {brandSecond}</span>}
              </h1>

              <p className="text-xl font-semibold text-foreground/85 sm:text-2xl">
                {t('app.subtitle')}
              </p>
              <div className="max-w-2xl rounded-2xl border border-border/45 bg-card/65 p-4 text-sm text-muted-foreground shadow-xl shadow-black/5 backdrop-blur-xl sm:p-5 sm:text-base">
                <Typewriter text={t('app.description')} delay={220} speed={34} />
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/marathon"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  {t('home.hero.startButton')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-primary via-[#ec6216] to-[#13aeac] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>

              <Link
                href="/random"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/55 bg-card/60 px-8 py-4 font-semibold text-foreground transition-all duration-300 hover:scale-[1.02] hover:border-primary-2/50 hover:bg-card/80"
              >
                <Dices className="h-5 w-5 text-primary-2" />
                {t('home.hero.quickPractice')}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="pointer-events-none absolute inset-2 rounded-3xl bg-linear-to-br from-primary/15 via-transparent to-primary-2/15 blur-2xl" />
            <HomeLeaderboardPreview />
          </motion.div>
        </div>

        {typeof totalUsers === 'number' && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative mx-auto mt-10 w-full max-w-4xl"
          >
            <div className="pointer-events-none absolute inset-2 rounded-3xl bg-linear-to-r from-primary/30 via-primary-2/20 to-primary/30 blur-2xl opacity-65" />
            <div className="relative overflow-hidden rounded-3xl border border-border/45 bg-card/80 p-4 shadow-2xl shadow-black/15 backdrop-blur-2xl sm:p-6">
              <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.055]" />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-primary/16 via-transparent to-primary-2/16" />
              <motion.div
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/18 to-transparent"
                animate={{ x: ['-35%', '290%'] }}
                transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 2.5 }}
              />

              <div className="relative grid grid-cols-1 items-center gap-4 sm:grid-cols-[1.3fr_0.85fr_0.85fr]">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/12">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {t('home.stats.visitors')}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-2xl font-black leading-none text-foreground sm:text-3xl">
                      {totalUsers.toLocaleString()}+
                      <Trophy className="h-4 w-4 text-primary-2 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t('modes.marathon.title')}
                  </div>
                </div>

                <div className="flex items-center justify-start sm:justify-end">
                  <Link
                    href="/leaderboard"
                    className="group inline-flex items-center gap-2 rounded-xl border border-border/55 bg-background/55 px-3.5 py-2 text-xs font-semibold text-foreground/85 transition-all duration-300 hover:border-primary-2/45 hover:text-primary-2"
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
