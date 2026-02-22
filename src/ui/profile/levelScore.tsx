import { Crown, Medal, Zap, LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

interface ILevelScoreResponse {
  bestFrontendScore: number
  bestBackendScore: number
  bestMobdevScore: number
}

interface LevelConfig {
  label: string
  icon: LucideIcon
  textColor: string
}

const LevelScore = ({
  bestBackendScore,
  bestFrontendScore,
  bestMobdevScore,
}: ILevelScoreResponse) => {
  const { t } = useTranslation()

  const getLevelConfig = (score: number | undefined): LevelConfig => {
    if (score === undefined || score === null || score < 25) {
      return {
        label: t('profile.levels.beginner'),
        icon: Zap,
        textColor: 'text-foreground/70',
      }
    }
    if (score >= 50) {
      return {
        label: t('profile.levels.master'),
        icon: Crown,
        textColor: 'text-foreground font-black',
      }
    }
    return {
      label: t('profile.levels.advanced'),
      icon: Medal,
      textColor: 'text-foreground/90 font-bold',
    }
  }

  const scores = [
    {
      name: 'Frontend',
      value: bestFrontendScore,
      accent: 'text-primary',
      bg: 'bg-primary',
      border: 'border-primary/20',
    },
    {
      name: 'Backend',
      value: bestBackendScore,
      accent: 'text-primary-2',
      bg: 'bg-primary-2',
      border: 'border-primary-2/20',
    },
    {
      name: 'Mobile',
      value: bestMobdevScore,
      accent: 'text-primary-3',
      bg: 'bg-primary-3',
      border: 'border-primary-3/20',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 w-full mt-6">
      {scores.map((s, idx) => {
        const level = getLevelConfig(s.value)
        const Icon = level.icon

        const progress = (s.value / 100) * 100
        const clampedProgress = Math.min(Math.max(progress, 2), 100)

        return (
          <div
            key={idx}
            className={`
              relative overflow-hidden group
              flex flex-col justify-between
              rounded-2xl border backdrop-blur-xl
              bg-card/30 transition-all duration-300
              ${s.border} hover:bg-card/40
            `}
          >
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="flex items-center gap-4 px-4 py-5 relative z-10">
              <div
                className={`
                  flex-shrink-0 p-2.5 rounded-xl bg-background/40 border ${s.border}
                  ${s.accent} shadow-sm
                `}
              >
                <Icon className="w-5 h-5" strokeWidth={2.5} />
              </div>

              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-muted-foreground/60">
                    {s.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${s.accent} bg-white/5 px-2 py-0.5 rounded-full border border-white/5`}
                  >
                    {s.value} pts
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${level.textColor} tracking-tight`}>
                    {level.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-1.5 bg-white/5 relative overflow-hidden mt-auto">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${clampedProgress}%` }}
                transition={{ duration: 1.5, ease: 'circOut', delay: idx * 0.15 }}
                className={`h-full ${s.bg} relative`}
              >
                <div
                  className="absolute inset-0 opacity-40 blur-[4px]"
                  style={{ backgroundColor: `var(--${s.name === 'Frontend' ? 'primary' : s.name === 'Backend' ? 'primary-2' : 'primary-3'})` }}
                />
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-white/30" />
              </motion.div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LevelScore