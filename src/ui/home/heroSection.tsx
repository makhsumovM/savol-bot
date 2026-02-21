'use client'

import { motion, Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Activity, Dices, Users, ArrowRight, Sparkles, ArrowUpRight, Loader2 } from 'lucide-react'
import { HomeLeaderboardPreview } from './homeLeaderboardPreview'
import { Typewriter } from './typewriterText'

interface HeroSectionProps {
  totalUsers?: number
  isPending?: boolean
  setIsPending?: (isPending: boolean) => void
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

export function HeroSection({ totalUsers, isPending }: HeroSectionProps) {
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
                {t('home.hero.badge')}
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-5">
              <h1 className="text-5xl font-black tracking-tight flex flex-wrap  sm:text-6xl lg:text-7xl">
                {brandWords.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={index % 2 === 0 ? 'text-primary' : 'text-primary-2'}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                variants={fadeUp}
                className="text-xl font-semibold text-foreground/85 sm:text-2xl"
              >
                {t('app.subtitle')}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="max-w-2xl rounded-2xl border border-border/40 bg-card/55 p-4 text-sm text-muted-foreground shadow-xl shadow-black/5 backdrop-blur-2xl sm:p-5 sm:text-base"
              >
                <Typewriter text={t('app.description')} delay={220} speed={34} />
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/marathon"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
              >
                <Activity className="h-5 w-5 shrink-0 relative z-10" />
                <span className="leading-none relative z-10">{t('home.hero.startButton')}</span>
                <ArrowRight className="h-4 w-4 shrink-0 relative z-10 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/random"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/50 bg-card/50 px-8 py-4 font-semibold text-foreground backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-primary-2/40 hover:bg-card/70 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-2/50 focus-visible:ring-offset-2"
              >
                <Dices className="h-5 w-5 shrink-0 text-primary-2" />
                <span className="leading-none">{t('home.hero.quickPractice')}</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" animate="show" className="relative">
            <HomeLeaderboardPreview />
          </motion.div>
        </div>

        <>
          {isPending && (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {typeof totalUsers === 'number' && (
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto mt-12 w-full max-w-5xl px-4"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/6 p-5  backdrop-blur-2xl backdrop-saturate-180 sm:p-6 md:p-7">
                <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left md:gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center gap-3 sm:flex-row sm:items-center"
                  >
                    <div className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-[0_4px_16px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.15)]">
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-white/10 to-transparent" />
                      <Users className="h-5 w-5 text-primary relative z-10" />
                    </div>

                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">
                        {t('home.stats.visitors')}
                      </div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-0.5 text-[2rem] font-black leading-none tracking-tight sm:text-[2.25rem]"
                      >
                        <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                          {totalUsers.toLocaleString()}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-center gap-2 flex-wrap"
                  >
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/9 px-3.5 py-1.5 text-[11px] font-semibold text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm">
                      <span className="relative flex h-1.5 w-1.5">
                        <span
                          className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"
                          style={{ animationDuration: '2s' }}
                        />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      {t('modes.marathon.title')}
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-primary-2/20 bg-primary-2/9 px-3.5 py-1.5 text-[11px] font-semibold text-primary-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm">
                      <span className="relative flex h-1.5 w-1.5">
                        <span
                          className="absolute inline-flex h-full w-full rounded-full bg-primary-2 opacity-60"
                          style={{ animationDuration: '2.4s', animationDelay: '0.4s' }}
                        />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-2" />
                      </span>
                      {t('modes.random.title')}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href="/leaderboard"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-[12px] font-semibold text-foreground/80 shadow-[0_2px_12px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition-all duration-300 hover:border-primary-2/35 hover:bg-primary-2/8 hover:text-primary-2 hover:shadow-[0_4px_20px_rgba(0,0,0,0.15),0_0_0_1px_rgba(var(--primary-2),0.15)] active:scale-95"
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-white/[0.07] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="relative z-10">{t('leaderboard.title')}</span>
                      <ArrowUpRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      </div>
    </section>
  )
}
