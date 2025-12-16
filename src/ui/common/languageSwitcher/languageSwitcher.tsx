"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import i18n from "@/i18n"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Check } from "lucide-react"

const languages = [
  {
    code: "tj",
    label: "Тоҷикӣ",
    shortLabel: "TJ",
    flagSrc: "/tj.png",
  },
  {
    code: "en",
    label: "English",
    shortLabel: "EN",
    flagSrc: "/en.png",
  },
  {
    code: "ru",
    label: "Русский",
    shortLabel: "RU",
    flagSrc: "/ru.png",
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
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currentLanguage = languages.find((l) => l.code === currentLang) || languages[0]

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <motion.button
        onClick={toggleDropdown}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="true"
        className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl bg-card/80 backdrop-blur-xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 text-foreground font-medium transition-all duration-300 min-w-[100px]"
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative flex items-center gap-2.5 flex-1">
          <img
            src={currentLanguage.flagSrc}
            alt={currentLanguage.label}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm font-semibold tracking-wide">{currentLanguage.shortLabel}</span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative text-muted-foreground group-hover:text-foreground transition-colors"
        >
          <ChevronDown size={16} strokeWidth={2.5} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute right-0 mt-2 min-w-[200px] rounded-xl bg-card/95 backdrop-blur-2xl border border-border/50 shadow-2xl overflow-hidden z-50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <div className="relative flex flex-col py-1.5">
              {languages.map((lang, index) => {
                const isActive = lang.code === currentLang
                return (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => changeLanguage(lang.code)}
                    className={`
                      group/item relative flex items-center justify-between gap-3 px-4 py-3 transition-all duration-200 cursor-pointer
                      ${isActive ? "bg-primary/15 text-primary font-semibold" : "hover:bg-primary/8 text-foreground hover:text-primary"}
                    `}
                    aria-current={isActive ? "true" : "false"}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeLanguage"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="flex items-center gap-3 flex-1">
                      <img
                        src={lang.flagSrc}
                        alt={lang.label}
                        className="w-6 h-6 rounded-full object-cover transition-transform group-hover/item:scale-110 duration-200"
                      />
                      <span className="text-sm font-medium">{lang.label}</span>
                    </span>
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <Check size={16} strokeWidth={3} className="text-primary" />
                      </motion.span>
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
