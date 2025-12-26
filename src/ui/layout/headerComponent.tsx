'use client'

import { ModeToggle } from '@/ui/common/modeToggle/modeToggle'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/ui/common/languageSwitcher/languageSwitcher'
import clsx from 'clsx'
import Image from 'next/image'
import logo from '../../../public/favicon.ico'
import { User } from 'lucide-react'
import { usePathname } from 'next/navigation'

const HeaderComponent = () => {
  const { t } = useTranslation()
  const pathname = usePathname() // получаем текущий путь

  const navLinks = [
    { href: '/marathon', label: t('header.nav.marathon') },
    { href: '/random', label: t('header.nav.random') },
    { href: '/my-best', label: t('header.nav.myBest') },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        sticky top-0 z-50 flex items-center justify-between
        px-1 sm:px-2 md:px-3 lg:px-2 py-1
        backdrop-blur-lg bg-background/80 border-b border-border shadow-sm
      "
    >
      <Link href="/" className="shrink-0 z-10">
        <Image
          src={logo}
          alt="Logo"
          className="w-25 sm:w-25 md:w-32 h-auto object-contain"
          priority
        />
      </Link>

      <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-4">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href

          return (
            <motion.div
              key={href}
              whileHover={{ scale: 1.03, y: -1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 15 }}
            >
              <Link
                href={href}
                className={clsx(
                  'px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors duration-150',
                  isActive
                    ? 'text-primary bg-accent/20'
                    : 'text-foreground hover:text-primary hover:bg-accent/30',
                )}
              >
                {label}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      <div className="flex items-center gap-1 sm:gap-2 ml-auto z-10">
        <LanguageSwitcher />
        <ModeToggle />

        <Link
          href="/login"
          className={clsx(
            'hidden md:flex h-9.5  items-center gap-1 sm:gap-2 px-2.5  rounded-lg font-medium text-xs sm:text-sm',
            'bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/90',
            'transition-all duration-200 transform hover:-translate-y-0.5',
          )}
        >
          <User size={16} />
          <span>{t('header.login')}</span>
        </Link>
      </div>
    </motion.header>
  )
}

export default HeaderComponent
