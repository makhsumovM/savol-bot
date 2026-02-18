'use client'

import { motion } from 'framer-motion'
import { Award, Zap, Code, ArrowUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
  }
> = {
  marathon: {
    accent: 'text-primary',
    iconWrap: 'bg-primary/10 text-primary border-primary/20',
    badge: 'bg-primary/10 text-primary border-primary/20',
    hoverBorder: 'hover:border-primary/40',
    focusRing: 'focus-visible:ring-primary/40',
  },
  random: {
    accent: 'text-primary-2',
    iconWrap: 'bg-primary-2/10 text-primary-2 border-primary-2/20',
    badge: 'bg-primary-2/10 text-primary-2 border-primary-2/20',
    hoverBorder: 'hover:border-primary-2/45',
    focusRing: 'focus-visible:ring-primary-2/40',
  },
  coding: {
    accent: 'text-violet-500/7',
    iconWrap: 'bg-violet-500/7 text-violet-500 border-violet-500/55',
    badge: 'bg-violet-500/7 text-violet-500/80 border-border/55',
    hoverBorder: 'hover:border-violet-500/35',
    focusRing: 'focus-visible:ring-violet-500/40',
  },
  default: {
    accent: 'text-primary',
    iconWrap: 'bg-primary/10 text-primary border-primary/20',
    badge: 'bg-muted/30 text-muted-foreground border-border/40',
    hoverBorder: 'hover:border-primary/35',
    focusRing: 'focus-visible:ring-primary/40',
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
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-primary/10 via-transparent to-primary-2/10 blur-3xl" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border/45 to-transparent pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative  grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3"
      >
        {modes.map((mode, index) => {
          const Icon = iconMap[mode.id] || Award
          const theme = themeMap[mode.id] ?? themeMap.default
          return (
            <motion.button
              key={mode.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => router.push(`/${mode.id}`)}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              type="button"
              aria-label={mode.title}
              className={`
                group relative w-full hover:${theme.accent} text-left overflow-hidden
                rounded-3xl border bg-card/75 backdrop-blur-xl p-6 sm:p-7

                transition-all duration-300 cursor-pointer
                border-border/40 ${theme.hoverBorder}
                focus-visible:outline-none focus-visible:ring-2 ${theme.focusRing} focus-visible:ring-offset-2 focus-visible:ring-offset-background
              `}
              data-aos="fade-up"
              data-aos-delay={140 + index * 60}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />
              <div className="absolute inset-0 bg-linear-to-b from-white/5 via-transparent to-transparent opacity-60 pointer-events-none" />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${theme.iconWrap} transition-colors duration-300`}
                  >
                    <Icon className="w-6 h-6 " />
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`
                        inline-flex items-center justify-center px-3 py-1 rounded-full
                        text-[10px] font-bold uppercase tracking-wider
                        border ${theme.badge}
                      `}
                    >
                      {mode.badge}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/70 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <h3 className={`mt-5 text-xl  font-black tracking-tight `}>
                  {mode.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed sm:text-[0.95rem]`}>
                  {mode.desc}
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full  bg-current`} />
                  <div className="h-px flex-1 bg-linear-to-r from-border/50 via-border/20 to-transparent" />
                </div>
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
