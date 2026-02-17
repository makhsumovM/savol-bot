'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Activity, ArrowRight, Dices, Sparkles, Trophy, Users } from 'lucide-react'

interface FinalCtaSectionProps {
  totalUsers?: number
}

export function FinalCtaSection({ totalUsers }: FinalCtaSectionProps) {
  const { t } = useTranslation()
  const appName = t('home.finalCta.title')
  const normalizedName = appName.replace(/([a-z])([A-Z])/g, '$1 $2')
  const [brandFirst, ...brandRest] = normalizedName.split(' ')
  const brandSecond = brandRest.join(' ')

  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-card/60 shadow-2xl shadow-black/10 backdrop-blur-2xl"
        >
          <div className="pointer-events-none absolute -left-20 top-[-120px] h-[280px] w-[280px] rounded-full bg-primary/25 blur-[110px]" />
          <div className="pointer-events-none absolute -right-20 bottom-[-120px] h-[280px] w-[280px] rounded-full bg-primary-2/25 blur-[110px]" />
          <div className="absolute inset-0 bg-linear-to-br from-primary/14 via-background/50 to-primary-2/14" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />

          <div className="relative p-8 text-center sm:p-12 lg:p-16">
            <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-wide text-primary sm:text-sm">
                <Sparkles className="h-4 w-4" />
                {t('home.hero.badge')}
              </div>

              {typeof totalUsers === 'number' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.2 }}
                  className="inline-flex items-center gap-2.5 rounded-full border border-border/50 bg-card/70 px-4 py-2 shadow-lg shadow-black/8 backdrop-blur-xl"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/25 bg-primary/12">
                    <Users className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {t('home.stats.visitors')}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-black text-foreground">
                    {totalUsers.toLocaleString()}+
                    <Trophy className="h-3.5 w-3.5 text-primary-2" />
                  </span>
                </motion.div>
              )}
            </div>

            <h2 className="mx-auto max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-primary">{brandFirst}</span>{' '}
              <span className="text-primary-2">
                {brandSecond}
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-foreground/80 sm:text-lg">
              {t('home.finalCta.subtitle')}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
