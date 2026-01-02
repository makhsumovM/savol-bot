'use client'

import { motion } from 'framer-motion'
import { Award, Zap, Code } from 'lucide-react'
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

export function ModeCards({ modes }: ModeCardsProps) {
  const router = useRouter()
  return (
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="grid grid-cols-1 gap-20 md:grid-cols-3 md:gap-6"
      >
        {modes.map((mode, index) => {
          const Icon = iconMap[mode.id] || Award
          return (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => router.push(mode.id)}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative group max-h-33"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary-2/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-card border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-primary-2/20 text-primary-2">
                    {mode.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{mode.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{mode.desc}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
