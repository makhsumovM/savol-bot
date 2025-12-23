'use client'

import { ModeToggle } from '@/ui/common/modeToggle/modeToggle'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Gamepad, PlayCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/ui/common/languageSwitcher/languageSwitcher'
import clsx from 'clsx'
import Image from 'next/image'
import logo from '../../../public/favicon.ico'
const HeaderComponent = () => {
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
      className="sticky top-0 z-50 flex items-center px-2 md:px-6 py-4
             backdrop-blur-xl bg-background/80 border-b border-border shadow-md"
    >
      <Link href="/">
        <div suppressHydrationWarning>
          <Image src={logo} className="md:w-40 md:h-13 w-30 h-10 object-cover" alt="" />
        </div>
      </Link>

      <nav className="absolute left-1/2 -translate-x-1/2 flex gap-3 md:gap-4">
        {navLinks.map(({ href, icon: Icon, label }) => (
          <motion.div
            key={href}
            className="hidden md:block"
            whileHover={{ scale: 1.05, y: -1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              href={href}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300',
                'bg-primary/5 hover:bg-primary/20 text-primary',
              )}
            >
              <Icon size={20} />
              <span suppressHydrationWarning>{label}</span>
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className="ml-auto flex items-center md:gap-7 gap-2">
        <LanguageSwitcher />
        <ModeToggle />
      </div>
    </motion.header>
  )
}

export default HeaderComponent
