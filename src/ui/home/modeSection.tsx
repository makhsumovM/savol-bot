'use client'
import { ModeCards } from '@/ui/home/modeCards'
import { useTranslation } from 'react-i18next'
import { motion, Variants } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const ModeSection = () => {
  const { t } = useTranslation()
  const modes = [
    {
      id: 'marathon',
      title: t('modes.marathon.title'),
      badge: t('modes.marathon.badge'),
      desc: t('modes.marathon.description'),
    },
    {
      id: 'random',
      title: t('modes.random.title'),
      badge: t('modes.random.badge'),
      desc: t('modes.random.description'),
    },
    {
      id: 'coding',
      title: t('modes.coding.title'),
      badge: t('modes.coding.badge'),
      desc: t('modes.coding.description'),
    },
  ]
  const title = t('home.modes.title')
  const normalizedName = title.replace(/([a-z])([A-Z])/g, '$1 $2')
  const titleWords = normalizedName.split(/\s+/).filter(Boolean)

  return (
    <section className="relative pb-24 lg:pb-32" aria-labelledby="mode-section-title">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 items-center justify-items-center gap-10 mb-16 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-2 backdrop-blur-xl"
          >
            <motion.div
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.div>
            <span className="text-xs font-semibold tracking-wide text-primary sm:text-sm">
              {t('home.modes.badge')}
            </span>
          </motion.div>

          <div className="max-w-3xl space-y-6">
            <h1
              id="mode-section-title"
              className="text-4xl font-black tracking-tight flex flex-wrap justify-center gap-x-3 gap-y-2 sm:text-5xl lg:text-6xl"
            >
              {titleWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={index % 2 === 0 ? 'text-primary' : 'text-primary-2'}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground px-4 leading-relaxed sm:text-xl"
            >
              {t('home.modes.subtitle')}
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <ModeCards modes={modes} />
        </motion.div>
      </div>
    </section>
  )
}

export default ModeSection
