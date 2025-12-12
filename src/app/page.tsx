'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Activity, Keyboard, Sparkles, Sunrise } from 'lucide-react'
import { ModeToggle } from '@/ui/common/modeToggle/modeToggle'
import { Button } from '@/ui/button/button'

const modeTiles = [
  {
    title: 'Marathon',
    description: 'Бесконечный поток вопросов для прокачки концентрации.',
    href: '/marathon',
    icon: Activity,
    accent: 'from-primary/15 via-primary/5 to-transparent',
  },
  {
    title: 'Classic',
    description: 'Спринт из 10–15 вопросов, чтобы быстро проверить себя.',
    href: '#',
    icon: Keyboard,
    accent: 'from-emerald-400/20 via-emerald-400/10 to-transparent',
    disabled: true,
  },
  {
    title: 'Coding',
    description: 'Подбор задач с код-блоками и подсказками, вдохновлено IDE.',
    href: '#',
    icon: Sparkles,
    accent: 'from-indigo-400/20 via-indigo-400/10 to-transparent',
    disabled: true,
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

const Home = () => {
  return (
    <div className="relative isolate overflow-hidden min-h-[calc(100vh-2rem)] bg-gradient-to-br from-background via-background to-background/80 px-6 py-12 sm:py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-2 text-xs font-medium text-muted-foreground backdrop-blur"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Sunrise className="h-4 w-4 text-primary" />
            Минимализм + мгновенный старт
          </motion.div>
          <ModeToggle />
        </header>

        <motion.div
          className="grid gap-8 lg:grid-cols-[1.2fr_0.9fr] lg:items-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="space-y-6" variants={item}>
            <div className="space-y-4">
              <motion.h1
                className="text-4xl font-semibold leading-tight tracking-tight text-primary sm:text-5xl"
                variants={item}
              >
                Savol-bot — отвечай быстро, как в Monkeytype
              </motion.h1>
              <motion.p
                className="max-w-2xl text-lg text-muted-foreground"
                variants={item}
              >
                Выбирай режим на первом экране, погружайся в вопросы без лишних кликов и держи фокус с лаконичными анимациями.
              </motion.p>
            </div>

            <motion.div className="flex flex-wrap items-center gap-3" variants={item}>
              <Link href="/marathon">
                <Button className="group bg-gradient-to-r from-primary to-primary/80 px-6 text-base shadow-lg shadow-primary/20">
                  Начать марафон
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-3 py-2 text-sm text-muted-foreground backdrop-blur">
                <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                Ритм, плотность и тихие анимации
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-6 shadow-xl shadow-black/5 backdrop-blur-lg"
            variants={item}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-card to-background opacity-80" />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">Pulse UI</span>
                <span>Micro-interactions</span>
              </div>
              <div className="flex flex-col gap-3">
                {[0, 1, 2].map((row) => (
                  <motion.div
                    key={row}
                    className="group relative overflow-hidden rounded-xl border border-border/70 bg-background/60 px-4 py-3 shadow-sm"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: row * 0.08 }}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    <div className="flex items-center justify-between text-sm font-medium text-primary">
                      Строка {row + 1}
                      <span className="text-xs text-muted-foreground">hover/tap</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ scaleX: 0.4, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.1, delay: 0.1 + row * 0.08, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Focus mode</span>
                <span>Без визуального шума</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {modeTiles.map(({ title, description, href, icon: Icon, accent, disabled }) => (
            <motion.div
              key={title}
              className={`group relative overflow-hidden rounded-xl border border-border/60 bg-card/70 p-4 backdrop-blur transition-transform duration-200 ${disabled ? 'opacity-60' : 'hover:-translate-y-1'}`}
              variants={item}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent}`} />
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2 text-primary">
                    <Icon className="h-4 w-4" />
                    {title}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">{disabled ? 'soon' : 'live'}</span>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
                <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground/80">
                  <span>точность + темп</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
                {!disabled && <Link className="absolute inset-0" href={href} />}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Home
