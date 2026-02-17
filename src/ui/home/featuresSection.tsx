'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Sparkles, Target, Zap, Trophy, LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  titleKey: string
  descKey: string
  glow: string
  iconWrap: string
  dot: string
  divider: string
}

export function FeaturesSection() {
  const { t } = useTranslation()

  const features: Feature[] = [
    {
      icon: Sparkles,
      titleKey: 'home.features.aiPowered.title',
      descKey: 'home.features.aiPowered.desc',
      glow: 'from-primary/20 via-primary/5 to-primary-2/18',
      iconWrap: 'border-primary/25 bg-primary/10 text-primary',
      dot: 'bg-primary',
      divider: 'from-primary/55 via-primary/20 to-transparent',
    },
    {
      icon: Target,
      titleKey: 'home.features.focusedPractice.title',
      descKey: 'home.features.focusedPractice.desc',
      glow: 'from-primary-2/20 via-primary-2/5 to-primary/18',
      iconWrap: 'border-primary-2/25 bg-primary-2/10 text-primary-2',
      dot: 'bg-primary-2',
      divider: 'from-primary-2/55 via-primary-2/20 to-transparent',
    },
    {
      icon: Zap,
      titleKey: 'home.features.instantFeedback.title',
      descKey: 'home.features.instantFeedback.desc',
      glow: 'from-primary/20 via-primary/5 to-primary-2/18',
      iconWrap: 'border-primary/25 bg-primary/10 text-primary',
      dot: 'bg-primary',
      divider: 'from-primary/55 via-primary/20 to-transparent',
    },
    {
      icon: Trophy,
      titleKey: 'home.features.competeAndWin.title',
      descKey: 'home.features.competeAndWin.desc',
      glow: 'from-primary-2/20 via-primary-2/5 to-primary/18',
      iconWrap: 'border-primary-2/25 bg-primary-2/10 text-primary-2',
      dot: 'bg-primary-2',
      divider: 'from-primary-2/55 via-primary-2/20 to-transparent',
    },
  ]
  const title = t('home.features.title')
  const normalizedName = title.replace(/([a-z])([A-Z])/g, '$1 $2')
  const [brandFirst, ...brandRest] = normalizedName.split(' ')
  const brandSecond = brandRest.join(' ')
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="text-4xl flex items-center justify-center gap-2 font-bold tracking-tight sm:text-5xl">
            <span className="text-[#ec6216]">{brandFirst}</span>
            {!!brandSecond && <span className="text-[#13aeac]"> {brandSecond}</span>}
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {t('home.features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article
              key={feature.titleKey}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="group relative overflow-hidden rounded-3xl border border-border/45 bg-card/70 p-6 shadow-xl shadow-black/8 backdrop-blur-xl transition-all duration-300 hover:border-primary/30"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-linear-to-br ${feature.glow} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/6 via-transparent to-transparent opacity-70" />

              <div className="relative flex h-full flex-col">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${feature.iconWrap}`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">{t(feature.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(feature.descKey)}
                </p>

                <div className="mt-auto flex items-center gap-2 pt-6">
                  <span className={`h-1.5 w-1.5 rounded-full ${feature.dot}`} />
                  <div className={`h-px flex-1 bg-linear-to-r ${feature.divider}`} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
