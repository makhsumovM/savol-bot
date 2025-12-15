'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group/toggle-group'
import Image from 'next/image'

const languages = [
  {
    code: 'tj',
    label: 'TJ',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Flag_of_Tajikistan.svg',
  },
  {
    code: 'en',
    label: 'EN',
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1024px-Flag_of_the_United_Kingdom_%283-5%29.svg.png',
  },
  {
    code: 'ru',
    label: 'RU',
    flag: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg',
  },
]

export default function LanguageSwitcher() {
  const { t } = useTranslation()
  const [currentLang, setCurrentLang] = useState(i18n.language)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setOpen(!open)
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setCurrentLang(lang)
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node))
        setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative inline-block w-[106px] text-left">
      <motion.button
        onClick={toggleDropdown}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-card/50 backdrop-blur-md border border-border shadow-sm text-foreground font-medium transition-all duration-200"
      >
        <span className="flex items-center gap-2">
          <Image
            width={28}
            height={5}
            src={languages.find((l) => l.code === currentLang)?.flag}
            alt="s"
          />
          {currentLang.toUpperCase()}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute right-0 mt-2 w-full rounded-lg bg-card/70 backdrop-blur-lg border border-border shadow-xl overflow-hidden z-30"
          >
            <ToggleGroup type="single" className="flex flex-col w-full">
              {languages.map((lang) => (
                <ToggleGroupItem
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center gap-2 px-4 py-2 transition-all duration-200 w-full cursor-pointer ${
                    lang.code === currentLang
                      ? 'bg-primary/30 text-primary font-semibold'
                      : 'hover:bg-primary/10 hover:text-primary'
                  }`}
                  value={''}
                >
                  <Image src={lang.flag} width={28} height={5} alt={''} />
                  {lang.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
