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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        sticky top-0 z-50 flex items-center justify-between
        px-3 sm:px-4 md:px-6 lg:px-4 py-0
        backdrop-blur-xl bg-background/80 border-b border-border shadow-md
      "
    >
      <Link href="/" className="shrink-0 z-10">
        <Image
          src={logo}
          alt="Logo"
          className="w-24 sm:w-28 md:w-36 lg:w-40 h-auto object-contain"
          priority
        />
      </Link>

      <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-6">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href // проверяем, текущая ли ссылка

          return (
            <motion.div
              key={href}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link
                href={href}
                className={clsx(
                  'px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200',
                  isActive
                    ? 'text-primary bg-accent/20' // стиль для активной ссылки
                    : 'text-foreground hover:text-primary hover:bg-accent/30'
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
            'hidden md:flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-medium text-sm lg:text-base',
            'bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:bg-primary/90',
            'transition-all duration-300 transform hover:-translate-y-0.5',
          )}
        >
          <User size={18} />
          <span>{t('header.login')}</span>
        </Link>
      </div>
    </motion.header>
  )
}

export default HeaderComponent
