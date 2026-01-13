'use client'

import { getJwtFromCookie } from '@/lib/utils/jwt'
import LanguageSwitcher from '@/ui/common/languageSwitcher/languageSwitcher'
import { ModeToggle } from '@/ui/common/modeToggle/modeToggle'
import ProfileMenuModal from '@/ui/modals/profileMenuModal/modal'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { Activity, Badge, ChartBar, Dices, Menu, User, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../../../public/favicon.ico'
import { Button } from '@/ui/button/button'

const HeaderComponent = () => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [profileMenuModalOpen, setProfileMenuModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const jwt = getJwtFromCookie()
  const userName = jwt?.Email?.split('@')[0]

  const navLinks = [
    { href: '/marathon', icon: Activity },
    { href: '/random', icon: Dices },
    ...(jwt ? [{ href: '/my-rank', icon: Badge }] : []),
    { href: '/leaderboard', icon: ChartBar },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className=" sticky top-0 z-50 flex items-center justify-between px-2 py-1 backdrop-blur-lg bg-background/80 border-b border-border shadow-sm"
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
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
        <ProfileMenuModal
          profileMenuModalOpen={profileMenuModalOpen}
          setProfileMenuModalOpen={setProfileMenuModalOpen}
        />
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden overflow-hidden shadow-lg"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map(({ href, icon: Icon }) => {
                const isActive = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={clsx(
                      'flex items-center gap-3 p-3 rounded-lg transition-colors duration-200',
                      isActive
                        ? 'text-primary bg-accent/20'
                        : 'text-foreground hover:text-primary hover:bg-accent/30',
                    )}
                  >
                    <Icon size={20} />
                    <span className="font-medium text-sm">
                      {t(
                        `${href
                          .replace('/', '')
                          .replace(/-([a-z])/g, (g) => g[1].toUpperCase())}.title`,
                      )}
                    </span>
                  </Link>
                )
              })}
              {!jwt ? (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 transition-colors mt-2"
                >
                  <User size={20} />
                  <span className="font-medium text-sm">{t('header.login')}</span>
                </Link>
              ) : (
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg text-foreground bg-accent/30 hover:bg-accent/40 transition-colors mt-2"
                >
                  <User size={20} />
                  <span className="font-medium text-sm">{userName}</span>
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default HeaderComponent
