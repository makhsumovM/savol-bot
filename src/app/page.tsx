'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '@/ui/button/button'
import { FocusRow } from '@/ui/home/focusRow'
import { ModeCards } from '@/ui/home/modeCards'
import { Typewriter } from '@/ui/home/typewriterText'

export default function Home() {
  const { t } = useTranslation()

  const modes = [
    {
      id: 'marathon',
      title: t('modes.marathon.title'),
      badge: t('modes.marathon.badge'),
      desc: t('modes.marathon.description'),
    },
    {
      id: 'classic',
      title: t('modes.classic.title'),
      badge: t('modes.classic.badge'),
      desc: t('modes.classic.description'),
    },
    {
      id: 'coding',
      title: t('modes.coding.title'),
      badge: t('modes.coding.badge'),
      desc: t('modes.coding.description'),
    },
  ]

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-secondary/15 blur-[120px] animate-pulse-slow" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-32 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-linear-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent leading-[1.1]">
                <Typewriter text={t('app.name')} />
              </h1>
            </motion.div>

            <motion.p className="text-xl md:text-2xl font-medium text-foreground/80">
              <Typewriter text={t('app.subtitle')} delay={0.6} />
            </motion.p>
          </div>

          <motion.p className="max-w-xl text-muted-foreground text-lg leading-relaxed">
            <Typewriter
              text={t('app.description')}
              delay={1.4}
              speed={0.02}
            />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center gap-4"
          >
            <Link href="/marathon">
              <Button className="px-8 py-6 text-base font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl">
                {t('home.cta.startMarathon')}
              </Button>
            </Link>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center gap-2.5 rounded-full border border-border/50 bg-card/40 backdrop-blur-sm px-5 py-3 text-sm text-muted-foreground hover:bg-card/60 hover:border-border transition-all duration-300 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {t('home.cta.features')}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10 rounded-3xl blur-xl" />
          <div className="relative rounded-3xl border border-border/50 bg-card/50 backdrop-blur-xl p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-semibold text-primary tracking-wide">
                {t('home.ui.pulse')}
              </span>
              <span className="text-xs text-muted-foreground/80 font-medium">
                {t('home.ui.microInteractions')}
              </span>
            </div>

            <div className="space-y-6">
              {[t('home.rows.row1'), t('home.rows.row2'), t('home.rows.row3')].map(
                (row, i) => (
                  <FocusRow key={row} label={row} delay={0.3 + i * 0.12} />
                )
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-border/30 flex justify-between text-xs text-muted-foreground/70 font-medium">
              <span>{t('home.ui.focusMode')}</span>
              <span>{t('home.ui.noNoise')}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <ModeCards modes={modes} />
    </section>
  )
}
