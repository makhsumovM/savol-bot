'use client'

import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'

type GameMode = 'frontend' | 'backend' | 'mobile'

interface GameModeSwitcherProps {
  mode: GameMode
  onModeChange: (mode: GameMode) => void
  modeIcons: Record<GameMode, StaticImageData>
}

const modeButtons: Array<{
  value: GameMode
  label: string
  alt: string
  activeClassName: string
  indicatorClassName: string
  delay: number
}> = [
  {
    value: 'frontend',
    label: 'Frontend',
    alt: 'Frontend',
    activeClassName: 'bg-primary text-white border-primary',
    indicatorClassName: 'bg-primary',
    delay: 100,
  },
  {
    value: 'backend',
    label: 'Backend',
    alt: 'Backend',
    activeClassName: 'bg-primary-2 text-white border-primary-2',
    indicatorClassName: 'bg-primary-2',
    delay: 140,
  },
  {
    value: 'mobile',
    label: 'Mobile',
    alt: 'mobile',
    activeClassName: 'bg-violet-500 text-white border-violet-500',
    indicatorClassName: 'bg-violet-500',
    delay: 140,
  },
]

export default function GameModeSwitcher({
  mode,
  onModeChange,
  modeIcons,
}: GameModeSwitcherProps) {
  return (
    <div className="flex sm:flex-row justify-center gap-3 sm:gap-4" data-aos="fade-up" data-aos-delay="80">
      {modeButtons.map((button) => (
        <motion.button
          key={button.value}
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onModeChange(button.value)}
          className={`relative w-full sm:w-auto min-h-11 px-5 sm:px-6 py-2.5 rounded-3xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md border ${
            mode === button.value
              ? button.activeClassName
              : 'bg-card/80 backdrop-blur-md text-foreground border-border'
          }`}
          data-aos="zoom-in"
          data-aos-delay={button.delay}
        >
          <span className="relative z-10 flex items-center justify-center gap-2.5">
            <Image
              src={modeIcons[button.value]}
              alt={button.alt}
              width={22}
              height={22}
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
            />
            {button.label}
          </span>
          {mode === button.value && (
            <motion.div
              layoutId="modeIndicator"
              className={`absolute inset-0 rounded-3xl ${button.indicatorClassName} z-0`}
              initial={false}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  )
}