'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FocusRow } from '@/ui/home/focusRow'
import { ModeCards } from '@/ui/home/modeCards'
import { Typewriter } from '@/ui/home/typewriterText'
import { Gamepad, PlayCircle } from 'lucide-react'

export default function Home() {
  const { t } = useTranslation()

  const navLinks = [
    {
      href: '/marathon',
      icon: PlayCircle,
      label: t('header.nav.marathon'),
    },
    {
      href: '/random',
      icon: Gamepad,
      label: t('header.nav.random'),
    },
  ]

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
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] rounded-full bg-secondary/15 blur-[120px] animate-pulse-slow" />

      <div
        className="
          relative mx-auto max-w-7xl
          px-4 sm:px-6
          py-14 sm:py-20 md:py-28
          grid grid-cols-1 lg:grid-cols-2
          gap-10 sm:gap-12 lg:gap-20
          items-center
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-7 sm:space-y-8 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                font-bold tracking-tight
                bg-linear-to-br from-foreground via-foreground to-foreground/60
                bg-clip-text text-transparent
                leading-tight
              "
            >
              <Typewriter text={t('app.name')} />
            </h1>
          </motion.div>

          <motion.p
            className="
              text-base
              sm:text-lg
              md:text-2xl
              font-medium
              text-foreground/80
            "
          >
            <Typewriter text={t('app.subtitle')} delay={0.5} />
          </motion.p>

          <motion.p
            className="
              max-w-xl mx-auto lg:mx-0
              text-sm
              sm:text-base
              md:text-lg
              leading-relaxed
              text-muted-foreground
            "
          >
            <Typewriter text={t('app.description')} delay={1.1} speed={0.02} />
          </motion.p>

          <nav
            className="
              flex flex-col
              sm:flex-row
              gap-3 sm:gap-4
              items-stretch sm:items-center
              justify-center lg:justify-start
            "
          >
            {navLinks.map(({ href, icon: Icon, label }) => (
              <motion.div
                key={href}
                whileHover={{ scale: 1.05, y: -1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link
                  href={href}
                  className="
                    flex items-center justify-center
                    gap-2
                    px-4 py-3
                    rounded-xl
                    text-sm sm:text-base
                    font-medium
                    bg-primary/5 hover:bg-primary/20
                    text-primary
                    transition-all duration-300
                  "
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mt-8 lg:mt-0"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10 rounded-3xl blur-xl" />

          <div
            className="
              relative
              rounded-2xl sm:rounded-3xl
              border border-border/50
              bg-card/60
              backdrop-blur-xl
              p-5 sm:p-6 md:p-8
              shadow-xl
            "
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <span className="text-sm font-semibold text-primary tracking-wide">
                {t('home.ui.pulse')}
              </span>
              <span className="text-xs text-muted-foreground/80 font-medium">
                {t('home.ui.microInteractions')}
              </span>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {[t('home.rows.row1'), t('home.rows.row2'), t('home.rows.row3')].map(
                (row, i) => (
                  <FocusRow key={i} label={row} delay={0.3 + i * 0.12} />
                )
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-border/30 flex justify-between text-xs text-muted-foreground/70 font-medium">
              <span>{t('home.ui.focusMode')}</span>
              <span>{t('home.ui.noNoise')}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modes */}
      <ModeCards modes={modes} />
    </section>
  )
}
