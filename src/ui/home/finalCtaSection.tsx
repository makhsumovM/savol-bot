'use client'

import { motion, type Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { Activity, ArrowRight, Dices, CheckCircle2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getTotalOnlineUser } from '@/api/userApi'

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function FinalCtaSection() {
  const { t } = useTranslation()
  const appName = t('home.finalCta.title')
  const { data } = useQuery({
    queryKey: ['totalUsers'],
    queryFn: getTotalOnlineUser,
  })
  const normalizedName = appName.replace(/([a-z])([A-Z])/g, '$1 $2')
  const titleWords = normalizedName.split(/\s+/).filter(Boolean)

  return (
    <section
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      aria-labelledby="cta-title"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden"></div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-[0_24px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/35 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(255,255,255,0.04),transparent)]" />

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="relative flex flex-col items-center px-5 py-14 text-center sm:px-12 sm:py-20 lg:px-20 lg:py-24"
            >
              {data?.totalOnlineUsers != null && (
                <motion.div variants={fadeUp} className="mb-8">
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    <span className="relative flex h-2 w-2">
                      <span
                        className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"
                        style={{ animationDuration: '2.5s' }}
                      />
                    </span>
                    -
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary">
                      {data?.totalOnlineUsers}+ {t('home.stats.visitors')}
                    </span>
                  </div>
                </motion.div>
              )}

              <motion.h2
                variants={fadeUp}
                id="cta-title"
                className="mx-auto max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-[1.05]"
              >
                {titleWords.map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className={`inline-block ${index > 0 ? 'ml-[0.25em]' : ''} ${
                      index % 2 === 0
                        ? 'bg-linear-to-br from-primary to-primary/70 bg-clip-text text-transparent'
                        : 'bg-linear-to-br from-primary-2 to-primary-2/70 bg-clip-text text-transparent'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mx-auto max-w-2xl text-base text-muted-foreground/85 sm:text-lg lg:text-xl leading-relaxed mb-10 font-medium"
              >
                {t('home.finalCta.subtitle')}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap justify-center gap-x-5 gap-y-2.5 mb-12 text-sm font-semibold text-foreground/60"
              >
                {['Next.js 15', 'React 19', 'AI Powered'].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    {item}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 w-full max-w-md sm:max-w-none"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/marathon"
                    className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-[0_6px_20px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.15)] transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(0,0,0,0.18)] sm:w-auto"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-600 group-hover:translate-x-full" />
                    <Activity className="relative h-4.5 w-4.5" />
                    <span className="relative">{t('home.hero.startButton')}</span>
                    <ArrowRight className="relative h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/random"
                    className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-white/12 bg-white/6 px-7 py-4 text-base font-bold text-foreground/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm transition-all duration-300 hover:border-primary-2/30 hover:bg-white/9 sm:w-auto"
                  >
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
                    <Dices className="relative h-4.5 w-4.5 text-primary-2 transition-transform duration-500 group-hover:rotate-180" />
                    <span className="relative">{t('home.hero.quickPractice')}</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
