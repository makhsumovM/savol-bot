'use client'

import { ModeToggle } from '@/ui/common/modeToggle/modeToggle'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '@/ui/common/languageSwitcher/languageSwitcher'
import clsx from 'clsx'
import Image from 'next/image'
import logo from '../../../public/favicon.ico'
import { User, Activity, Dices, Award, ChartBar, Badge } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { getJwtFromCookie } from '@/lib/utils/jwt'
import ProfileMenuModal from '@/ui/profileMenuModal/modal'
import { useState, useRef } from 'react'

const HeaderComponent = () => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [profileMenuModalOpen, setProfileMenuModalOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const jwt = getJwtFromCookie()
  const userName = jwt?.Email?.split('@')[0]

  const navLinks = [
    { href: '/marathon', icon: Activity },
    { href: '/random', icon: Dices },
    ...(jwt ? [{ href: '/my-best', icon: Award }] : []),
    ...(jwt ? [{ href: '/my-rank', icon: Badge }] : []),
    { href: '/leaderboard', icon: ChartBar },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative sticky top-0 z-50 flex items-center justify-between px-2 py-1 backdrop-blur-lg bg-background/80 border-b border-border shadow-sm"
    >
      <Link href="/" className="shrink-0 z-10">
        <Image
          src={logo}
          alt="Logo"
          className="w-25 sm:w-25 md:w-32 h-auto object-contain"
          priority
        />
      </Link>

      <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8">
        {navLinks.map(({ href, icon: Icon }) => {
          const isActive = pathname === href

          return (
            <motion.div
              key={href}
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Link
                href={href}
                className={clsx(
                  'flex items-center justify-center p-3 rounded-lg transition-colors duration-200',
                  isActive
                    ? 'text-primary bg-accent/20'
                    : 'text-foreground hover:text-primary hover:bg-accent/30',
                )}
              >
                <Icon size={24} />
              </Link>
            </motion.div>
          )
        })}
      </nav>

      <div className="flex items-center gap-1 sm:gap-2 ml-auto z-10 relative">
        <LanguageSwitcher />
        <ModeToggle />

        {!jwt ? (
          <Link
            href="/login"
            className="hidden md:flex h-9.5 items-center gap-1 sm:gap-2 px-2.5 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-200 hover:-translate-y-0.5"
          >
            <User size={16} />
            <span>{t('header.login')}</span>
          </Link>
        ) : (
          <div
            ref={profileRef}
            onClick={() => setProfileMenuModalOpen((prev) => !prev)}
            className="hidden md:flex h-9.5 items-center gap-2 px-3 rounded-lg bg-accent/30 text-foreground text-xs sm:text-sm font-medium cursor-pointer select-none"
          >
            <User size={16} />
            <span>{userName}</span>
          </div>
        )}
        <ProfileMenuModal
          profileMenuModalOpen={profileMenuModalOpen}
          setProfileMenuModalOpen={setProfileMenuModalOpen}
        />
      </div>
    </motion.header>
  )
}

export default HeaderComponent
