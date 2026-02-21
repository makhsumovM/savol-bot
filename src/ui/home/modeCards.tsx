'use client'

import { motion } from 'framer-motion'
import { Award, Zap, Code, ArrowUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

interface Mode {
  id: string
  title: string
  badge: string
  desc: string
}

interface ModeCardsProps {
  modes: Mode[]
}

const iconMap: Record<string, typeof Award> = {
  marathon: Award,
  random: Zap,
  coding: Code,
}

const themeMap: Record<
  string,
  {
    accent: string
    iconWrap: string
    badge: string
    hoverBorder: string
    focusRing: string
    gradientFrom: string
    gradientTo: string
  }
> = {
  marathon: {
    accent: 'group-hover:text-primary',
    iconWrap: 'bg-primary/10 text-primary border-primary/20',
    badge: 'bg-primary/10 text-primary border-primary/20',
    hoverBorder: 'hover:border-primary/40',
    focusRing: 'focus-visible:ring-primary/40',
    gradientFrom: 'from-primary/5',
    gradientTo: 'to-primary/0',
  },
  random: {
    accent: 'group-hover:text-primary-2',
    iconWrap: 'bg-primary-2/10 text-primary-2 border-primary-2/20',
    badge: 'bg-primary-2/10 text-primary-2 border-primary-2/20',
    hoverBorder: 'hover:border-primary-2/45',
    focusRing: 'focus-visible:ring-primary-2/40',
    gradientFrom: 'from-primary-2/5',
    gradientTo: 'to-primary-2/0',
  },
  coding: {
    accent: 'group-hover:text-violet-500',
    iconWrap: 'bg-violet-500/10 text-violet-500 border-violet-500/25',
    badge: 'bg-violet-500/10 text-violet-500 border-violet-500/25',
    hoverBorder: 'hover:border-violet-500/35',
    focusRing: 'focus-visible:ring-violet-500/40',
    gradientFrom: 'from-violet-500/5',
    gradientTo: 'to-violet-500/0',
  },
  default: {
    accent: 'group-hover:text-primary',
    iconWrap: 'bg-primary/10 text-primary border-primary/20',
    badge: 'bg-muted/30 text-muted-foreground border-border/40',
    hoverBorder: 'hover:border-primary/35',
    focusRing: 'focus-visible:ring-primary/40',
    gradientFrom: 'from-primary/5',
    gradientTo: 'to-primary/0',
  },
}

export function ModeCards({ modes }: ModeCardsProps) {
  const router = useRouter()
  return (
    <div
      className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16"
      data-aos="fade-up"
      data-aos-delay="60"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-primary/5 via-transparent to-primary-2/5 blur-3xl" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border/45 to-transparent pointer-events-none" />

      <div className="relative grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
        {modes.map((mode, index) => {
          const Icon = iconMap[mode.id] || Award
          const theme = themeMap[mode.id] ?? themeMap.default

          return (
            <motion.button
              key={mode.id}
              onClick={() => router.push(`/${mode.id}`)}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              type="button"
              aria-label={mode.title}
              className={clsx(
                'group relative w-full text-left overflow-hidden',
                'rounded-4xl border bg-card/40 backdrop-blur-xl p-6 sm:p-8',
                'transition-all duration-300 cursor-pointer',
                'border-border/40 shadow-sm hover:shadow-xl',
                theme.hoverBorder,
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                theme.focusRing
              )}
              data-aos="fade-up"
              data-aos-delay={150 + index * 100}
            >
              {}
              <div
                className={clsx(
                  'absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none',
                  theme.gradientFrom,
                  theme.gradientTo
                )}
              />

              <div className="relative flex h-full flex-col z-10">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={clsx(
                      'flex h-14 w-14 items-center justify-center rounded-2xl border shadow-sm transition-colors duration-300',
                      theme.iconWrap
                    )}
                  >
                    <Icon className="w-7 h-7" strokeWidth={2} />
                  </motion.div>

                  <div className="flex items-center gap-2">
                    <span
                      className={clsx(
                        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full',
                        'text-[10px] font-bold uppercase tracking-wider',
                        'border transition-colors duration-300',
                        theme.badge
                      )}
                    >
                      {mode.id === 'coding' ? null : <span className="relative flex h-1.5 w-1.5"><span className=" absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span></span>}
                      {mode.badge}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/60 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <h3 className={clsx("mt-2 text-2xl font-black tracking-tight transition-colors duration-300", theme.accent)}>
                  {mode.title}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-muted-foreground/90 font-medium">
                  {mode.desc}
                </p>

                <div className="mt-auto pt-8 flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={clsx("h-1 w-8 rounded-full transition-all duration-500 group-hover:w-16 bg-current", theme.accent)} />
                  <div className="h-px flex-1 bg-border/60" />
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
