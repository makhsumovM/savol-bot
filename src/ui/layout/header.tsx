'use client'

import { ModeToggle } from '@/ui/common/modeToggle/modeToggle'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Gamepad, PlayCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/ui/common/languageSwitcher/languageSwitcher'

const Header = () => {
  const { t } = useTranslation()

  const navLinks = [
    {
      href: '/marathon',
      icon: PlayCircle,
      label: t('header.nav.marathon'),
    },
    {
      href: '/random',
      icon: Gamepad,
      label: t('header.nav.random'),
    },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 flex items-center justify-between px-2 md:px-6 py-4 backdrop-blur-xl  bg-background/80 border-b border-border shadow-md"
    >
      <Link href="/">
        <h1 className=" md:text-3xl text-2xl  font-extrabold tracking-tight text-primary hover:text-primary/80 transition-colors duration-300">
          {t('app.name')}
        </h1>
      </Link>

      <nav className="flex gap-3 md:gap-4">
        {navLinks.map(({ href, icon: Icon, label }) => (
          <motion.div
            key={href}
            className="hidden md:block"
            whileHover={{ scale: 1.05, y: -1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              href={href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm md:text-base font-medium
                         bg-primary/5 hover:bg-primary/20 text-primary transition-all duration-300"
            >
              <Icon size={20} />
              <span className="hidden md:block">{label}</span>
            </Link>
          </motion.div>
        ))}
      </nav>
      <div className="flex items-center md:gap-7 gap-2">
        <LanguageSwitcher />

        <ModeToggle />
      </div>
    </motion.header>
  )
}

export default Header
