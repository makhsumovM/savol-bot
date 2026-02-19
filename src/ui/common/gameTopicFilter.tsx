'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'

type GameMode = 'frontend' | 'backend' | 'mobile'

export interface GameTopicFilterTheme {
  topicIcon: StaticImageData
  topicActiveShadow: string
  topicActiveBorder: string
  topicActiveFill: string
  topicActiveGlow: string
  topicHoverGlow: string
  topicPanelGlow: string
  topicPanelGradient: string
}

export interface GameTopicOption<TTopic extends string> {
  value: TTopic
  label: string
  icon?: StaticImageData
}

interface GameTopicFilterProps<TTopic extends string> {
  mode: GameMode
  topic: TTopic
  topicOptions: GameTopicOption<TTopic>[]
  onTopicChange: (topic: TTopic) => void
  theme: GameTopicFilterTheme
}

const topicFilterVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const topicItemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
}

export default function GameTopicFilter<TTopic extends string>({
  mode,
  topic,
  topicOptions,
  onTopicChange,
  theme,
}: GameTopicFilterProps<TTopic>) {
  const isMobile = mode === 'mobile'
  const {
    topicIcon,
    topicActiveShadow,
    topicActiveBorder,
    topicActiveFill,
    topicActiveGlow,
    topicHoverGlow,
    topicPanelGlow,
    topicPanelGradient,
  } = theme

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 backdrop-blur-xl p-3 sm:p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.04 }}
      data-aos="fade-up"
      data-aos-delay="120"
    >
      <div className={`absolute inset-0 bg-linear-to-br ${topicPanelGradient} opacity-80`} />
      <div className={`absolute -top-24 right-6 h-40 w-40 rounded-full blur-[90px] ${topicPanelGlow}`} />
      <div className="absolute -bottom-20 left-6 h-32 w-32 rounded-full bg-foreground/5 blur-[80px]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          variants={topicFilterVariants}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: -6 }}
          className="relative flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:justify-start"
          data-aos="fade-up"
          data-aos-delay="140"
        >
          {topicOptions.map((option) => {
            const isActive = topic === option.value
            return (
              <motion.button
                key={option.value}
                type="button"
                layout
                variants={topicItemVariants}
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.04, y: -2 }}
                onClick={() => onTopicChange(option.value)}
                aria-pressed={isActive}
                className={`group relative overflow-hidden rounded-2xl border bg-card/80 px-3.5 py-2 text-xs sm:text-sm font-semibold backdrop-blur transition-all duration-300 ${
                  isActive
                    ? `text-white ${topicActiveBorder} shadow-xl ${topicActiveShadow} border-opacity-80`
                    : 'text-foreground border-border/60 hover:border-foreground/30 hover:bg-card/95 hover:shadow-lg'
                }`}
              >
                <span
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${topicHoverGlow}`}
                />
                {isActive && (
                  <>
                    <motion.span
                      layoutId="topicIndicator"
                      className={`absolute inset-0 rounded-2xl ${topicActiveFill}`}
                      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    />
                    <motion.span
                      className={`absolute inset-0 rounded-2xl blur-lg ${topicActiveGlow}`}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {isMobile && (
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-purple-400/20 via-transparent to-purple-400/20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                  </>
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <motion.span
                    className={`flex h-7 w-7 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isActive
                        ? 'border-white/40 bg-white/20 shadow-lg'
                        : 'border-border/60 bg-background/90 group-hover:border-foreground/30 group-hover:bg-background group-hover:shadow-md'
                    }`}
                    animate={isActive && isMobile ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                  >
                    <Image
                      src={option.icon ?? topicIcon}
                      alt={option.label}
                      width={18}
                      height={18}
                      className="h-4 w-4 object-contain"
                    />
                  </motion.span>
                  <motion.span
                    className="whitespace-nowrap"
                    animate={isActive && isMobile ? { fontWeight: [600, 700, 600] } : {}}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    {option.label}
                  </motion.span>
                </span>
              </motion.button>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}