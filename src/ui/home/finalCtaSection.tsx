'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Activity, ArrowRight, Dices,  CheckCircle2 } from 'lucide-react'

interface FinalCtaSectionProps {
  totalUsers?: number
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export function FinalCtaSection({ totalUsers }: FinalCtaSectionProps) {
  const { t } = useTranslation()
  const appName = t('home.finalCta.title')
  const normalizedName = appName.replace(/([a-z])([A-Z])/g, '$1 $2')
  const titleWords = normalizedName.split(/\s+/).filter(Boolean)

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden" aria-labelledby="cta-title">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleUp}
          className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-card/40 shadow-2xl shadow-primary/5 backdrop-blur-2xl"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse-slow" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-[500px] w-[500px] rounded-full bg-primary-2/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary-2/5 opacity-50" />

          <div className="relative px-6 py-12 text-center sm:px-12 sm:py-20 lg:px-20 lg:py-24">

            {typeof totalUsers === 'number' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-md mb-8 ring-1 ring-primary/10"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-bold tracking-wider uppercase text-primary">
                  {totalUsers.toLocaleString()}+ {t('home.stats.visitors')}
                </span>
              </motion.div>
            )}

            <h2 id="cta-title" className="mx-auto max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl mb-6">
              {titleWords.map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={index % 2 === 0 ? 'text-primary drop-shadow-sm' : 'text-primary-2 drop-shadow-sm'}
                >
                  {index > 0 ? ' ' : ''}
                  {word}
                </span>
              ))}
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground/90 sm:text-xl leading-relaxed mb-10 font-medium">
              {t('home.finalCta.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-12 text-sm font-medium text-foreground/70">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Next.js 15
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                React 19
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                AI Powered
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/marathon"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-shimmer" />
                  <Activity className="h-5 w-5" />
                  <span>{t('home.hero.startButton')}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/random"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-border/50 bg-card/50 px-8 py-4 text-lg font-bold text-foreground backdrop-blur-xl transition-all duration-300 hover:border-primary-2/40 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-2/50 focus-visible:ring-offset-2"
                >
                  <Dices className="h-5 w-5 text-primary-2" />
                  <span>{t('home.hero.quickPractice')}</span>
                </Link>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}