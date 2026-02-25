'use client'

import { getJwtFromCookie } from '@/lib/utils/jwt'
import LanguageSwitcher from '@/ui/common/languageSwitcher/languageSwitcher'
import { ModeToggle } from '@/ui/common/modeToggle/modeToggle'
import ProfileMenuModal from '@/ui/modals/profileMenuModal/modal'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Badge, ChartBar, Dices, Home, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../../../public/favicon.ico'

const HeaderComponent = () => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [profileMenuModalOpen, setProfileMenuModalOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const jwt = getJwtFromCookie()
  const userName = jwt?.Email?.split('@')[0]

  const navLinks = [
    { href: '/marathon', icon: Activity, label: 'marathon' },
    { href: '/random', icon: Dices, label: 'random' },

    { href: '/leaderboard', icon: ChartBar, label: 'leaderboard' },
    ...(jwt ? [{ href: '/profile', icon: User, label: 'profile' }] : []),
  ]
  const mobileNavLinks = [
    { href: '/', icon: Home, label: 'home' },
    ...navLinks,

    ...(!jwt ? [{ href: '/login', icon: User, label: 'login' }] : []),
  ]

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-50 flex items-center justify-between px-4 py-2.5 backdrop-blur-2xl bg-background/65 border-b border-border/50 shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
      >
        <Link href="/" className="shrink-0 z-10" aria-label={t('header.home')}>
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <Image
              src={logo}
              alt="Logo"
              className="w-30 sm:w-25 md:w-32 h-auto object-contain"
              priority
            />
          </motion.div>
        </Link>

        <nav
          className="hidden md:flex absolute left-1/2 -translate-x-1/2"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-1 rounded-2xl border border-border/40 bg-background/50 px-2 py-1.5 backdrop-blur-xl">
            {navLinks.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href

              return (
                <Link
                  key={href}
                  href={href}
                  aria-label={t(`header.${label}`)}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    'relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktopNavIndicator"
                      className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon size={18} className="relative z-10" />
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 overflow-hidden whitespace-nowrap text-xs font-semibold"
                      >
                        {t(`header.${label}`)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto z-10 relative">
          <LanguageSwitcher />
          <ModeToggle />

          {!jwt ? (
            <Link
              href="/login"
              className="hidden md:flex h-9.5 items-center gap-1.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <User size={15} />
              <span>{t('header.login')}</span>
            </Link>
          ) : (
            <div className="relative">
              <motion.div
                ref={profileRef}
                onClick={() => setProfileMenuModalOpen((prev) => !prev)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden md:flex h-9.5 items-center gap-2 px-3.5 rounded-xl bg-accent/20 text-foreground text-xs sm:text-sm font-medium cursor-pointer select-none border border-border/40 hover:bg-accent/30 hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/15">
                  <User size={14} className="text-primary" />
                </div>
                <span>{userName}</span>
              </motion.div>

              <ProfileMenuModal
                profileMenuModalOpen={profileMenuModalOpen}
                setProfileMenuModalOpen={setProfileMenuModalOpen}
              />
            </div>
          )}
        </div>
      </motion.header>

      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-2xl bg-background/85 border-t border-border/50 shadow-[0_-2px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-2px_20px_rgba(0,0,0,0.25)]"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around px-1 py-2 safe-area-inset-bottom">
          {mobileNavLinks.map(({ href, icon: Icon, label }) => {
            const isActive =
              pathname === href ||
              (href === '/profile' && pathname === '/profile') ||
              (href === '/login' && pathname === '/login')

            return (
              <Link
                key={label}
                href={href}
                aria-label={t(`header.${label}`)}
                aria-current={isActive ? 'page' : undefined}
                className="flex flex-col items-center justify-center flex-1 min-w-0 group focus-visible:outline-none"
              >
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className={clsx(
                    'relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl transition-all duration-300',
                    'focus-visible:ring-2 focus-visible:ring-primary/50',
                    isActive ? 'bg-primary/12' : 'hover:bg-accent/20 active:bg-accent/30',
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute inset-0 rounded-2xl bg-primary/10 border border-primary/15"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  <Icon
                    size={20}
                    className={clsx(
                      'relative z-10 transition-colors duration-200',
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground group-hover:text-foreground',
                    )}
                  />
                </motion.div>

                <span
                  className={clsx(
                    'text-[10px] sm:text-xs mt-0.5 transition-colors duration-200 text-center px-0.5 line-clamp-1 font-medium',
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
                  )}
                >
                  {t(`header.${label}`)}
                </span>
              </Link>
            )
          })}
        </div>
      </motion.nav>
    </>
  )
}

export default HeaderComponent
