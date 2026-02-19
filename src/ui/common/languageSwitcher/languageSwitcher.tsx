'use client'

import { useState, useRef, useEffect } from 'react'
import i18n from '@/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import Image from 'next/image'

const languages = [
  { code: 'tj', label: 'Тоҷикӣ', shortLabel: 'TJ', flagSrc: '/tj.png' },
  { code: 'en', label: 'English', shortLabel: 'EN', flagSrc: '/en.png' },
  { code: 'ru', label: 'Русский', shortLabel: 'RU', flagSrc: '/ru.png' },
]

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState(i18n.language)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const listRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setOpen(!open)

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setCurrentLang(lang)
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const currentLanguage = languages.find((l) => l.code === currentLang) || languages[0]

  return (
    <div ref={containerRef} className="relative inline-block text-left z-50">
      <motion.button
        onClick={toggleDropdown}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls="language-menu"
        className={`
          group relative flex items-center gap-2.5 px-3 py-2 rounded-full
          bg-background/80 backdrop-blur-md border border-border/60 shadow-xs
          transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:bg-card/90
          focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
          h-10 min-w-[100px]
        `}
      >
        <span className="relative flex items-center gap-2.5">
          <div className="relative h-5 w-5 overflow-hidden rounded-full shadow-sm border border-border/20">
            <Image
              src={currentLanguage.flagSrc}
              alt={currentLanguage.label}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-foreground/90">{currentLanguage.shortLabel}</span>
        </span>

        <div className="w-px h-4 bg-border/60 mx-0.5" />

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="text-muted-foreground group-hover:text-primary transition-colors"
        >
          <ChevronDown size={14} strokeWidth={2.5} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="language-menu"
            role="listbox"
            ref={listRef}
            initial={{ opacity: 0, scale: 0.95, y: -6, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 6, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, y: -6, filter: 'blur(10px)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 0.8 }}
            className="absolute right-0 top-full min-w-[180px] p-1.5 rounded-2xl bg-card/95 backdrop-blur-2xl border border-border/50 shadow-xl overflow-hidden origin-top-right"
          >
            <div className="flex flex-col space-y-0.5">
              {languages.map((lang) => {
                const isActive = lang.code === currentLang
                return (
                  <motion.button
                    key={lang.code}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => changeLanguage(lang.code)}
                    className={`
                      relative flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                      ${isActive
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted/60 text-foreground/80 hover:text-foreground'}
                      focus-visible:outline-hidden focus-visible:bg-muted/80
                    `}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-3">
                      <div className={`
                          relative h-5 w-5 rounded-full overflow-hidden border shadow-sm
                          ${isActive ? 'border-primary/30' : 'border-border/30'}
                       `}>
                        <Image
                          src={lang.flagSrc}
                          alt={lang.label}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>{lang.label}</span>
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        <Check size={14} strokeWidth={3} className="text-primary" />
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
