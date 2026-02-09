'use client'

import { getJwtFromCookie } from '@/lib/utils/jwt'
import LanguageSwitcher from '@/ui/common/languageSwitcher/languageSwitcher'
import { ModeToggle } from '@/ui/common/modeToggle/modeToggle'
import ProfileMenuModal from '@/ui/modals/profileMenuModal/modal'
import clsx from 'clsx'
import { motion } from 'framer-motion'
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
    ...(jwt ? [{ href: '/my-rank', icon: Badge, label: 'myRank' }] : []),
    { href: '/leaderboard', icon: ChartBar, label: 'leaderboard' },
  ]

  const mobileNavLinks = [
    { href: '/', icon: Home, label: 'home' },
    ...navLinks,
    { href: jwt ? '/profile' : '/login', icon: User, label: jwt ? 'profile' : 'login' },
  ]

  return (
    <>
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-3 py-2 backdrop-blur-lg bg-background/80 border-b border-border/70 shadow-sm"
      >
        <Link href="/" className="shrink-0 z-10">
          <Image
            src={logo}
            alt="Logo"
            className="w-30 sm:w-25 md:w-32 h-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-6">
          {navLinks.map(({ href, icon: Icon }) => {
            const isActive = pathname === href

            return (
              <motion.div
                key={href}
                whileHover={{ scale: 1.04, y: -1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                <Link
                  href={href}
                  className={clsx(
                    'flex items-center justify-center p-2.5 rounded-lg transition-colors duration-200',
                    isActive
                      ? 'text-primary bg-accent/20'
                      : 'text-foreground hover:text-primary hover:bg-accent/30',
                  )}
                >
                  <Icon size={22} />
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
              className="hidden md:flex h-9.5 items-center gap-1 sm:gap-2 px-2.5 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium shadow-sm hover:bg-primary/90 transition-all duration-200"
            >
              <User size={16} />
              <span>{t('header.login')}</span>
            </Link>
          ) : (
            <div className="relative">
              <div
                ref={profileRef}
                onClick={() => setProfileMenuModalOpen((prev) => !prev)}
                className="hidden md:flex h-9.5 items-center gap-2 px-3 rounded-lg bg-accent/20 text-foreground text-xs sm:text-sm font-medium cursor-pointer select-none hover:bg-accent/30 transition-colors"
              >
                <User size={16} />
                <span>{userName}</span>
              </div>

              <ProfileMenuModal
                profileMenuModalOpen={profileMenuModalOpen}
                setProfileMenuModalOpen={setProfileMenuModalOpen}
              />
            </div>
          )}
        </div>
      </header>

      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/90 border-t border-border/70 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
      >
     <div className="flex items-center justify-around px-1 py-2 safe-area-inset-bottom">
  {mobileNavLinks.map(({ href, icon: Icon, label }) => {
    const isActive =
      pathname === href ||
      (href === '/profile' && pathname === '/profile') ||
      (href === '/login' && pathname === '/login')

    return (
      <Link
        key={href}
        href={href}
        className="flex flex-col items-center justify-center flex-1 min-w-0 group"
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          className={clsx(
            'relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl transition-all duration-300',
            isActive ? 'bg-primary/15 dark:bg-primary/20' : 'hover:bg-accent/30',
          )}
        >
          {isActive && (
            <motion.div
              layoutId="bottomNavIndicator"
              className="absolute inset-0 rounded-2xl bg-primary/10 dark:bg-primary/15"
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
            'text-[10px] sm:text-xs mt-1 transition-colors duration-200 text-center px-1 line-clamp-1',
            isActive
              ? 'text-primary font-medium'
              : 'text-muted-foreground group-hover:text-foreground',
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
