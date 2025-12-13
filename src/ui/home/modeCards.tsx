'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export interface Mode {
  id: string
  title: string
  badge: string
  desc: string
}

interface ModeCardsProps {
  modes: Mode[]
}

export function ModeCards({ modes }: ModeCardsProps) {
  const router = useRouter()

  return (
    <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-12">
      <div className="grid md:grid-cols-3 gap-6">
        {modes.map((mode, i) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            onClick={() => router.push(mode.id)}
            transition={{
              delay: i * 0.12,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover={{
              scale: 1.03,
              y: -4,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative rounded-3xl border border-border/40 bg-card/40 backdrop-blur-xl p-8 hover:bg-card/60 hover:border-border/60 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground group-hover:text-foreground transition-colors duration-200">
                  {mode.title}
                </h3>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className={`text-xs font-semibold rounded-full px-3 py-1.5 ${
                    mode.badge === 'LIVE'
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-muted/50 text-muted-foreground border border-border/30'
                  }`}
                >
                  {mode.badge}
                </motion.span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-200">
                {mode.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
