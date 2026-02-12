'use client'

import React, { useEffect, useRef } from 'react'
import { User, LogOut, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { getCookie, removeCookie } from '@/lib/utils/cookies'

interface IProfileMenuModalProps {
  profileMenuModalOpen: boolean
  setProfileMenuModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileMenuModal = ({
  profileMenuModalOpen,
  setProfileMenuModalOpen,
}: IProfileMenuModalProps) => {
  const { t } = useTranslation()
  const router = useRouter()

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setProfileMenuModalOpen(false)
      }
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProfileMenuModalOpen(false)
    }

    if (profileMenuModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEsc)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [profileMenuModalOpen, setProfileMenuModalOpen])

  const handleLogout = () => {
    removeCookie('token')
    setProfileMenuModalOpen(false)
    setTimeout(() => {
      window.location.href = '/'
    }, 500)
    toast.success(t('profileMenu.logoutSuccess'))
  }

  return (
    <AnimatePresence>
      {profileMenuModalOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -8 }}
          transition={{ duration: 0.15, type: 'spring', stiffness: 350, damping: 25 }}
          className="absolute mt-7 right-0 z-50 min-w-[160px] overflow-hidden rounded-xl border border-border/50 backdrop-blur-xl bg-card/95 shadow-xl shadow-black/15"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-2/5 pointer-events-none" />

          <div className="relative p-1">
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0, duration: 0.15 }}
              onClick={() => {
                setProfileMenuModalOpen(false)
                router.push('/profile')
              }}
              className="group flex w-full items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <User size={12} />
                </div>
                <span>{t('profileMenu.profile')}</span>
              </div>
              <ChevronRight
                size={12}
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
              />
            </motion.button>

            <div className="my-1 mx-2 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08, duration: 0.15 }}
              onClick={handleLogout}
              className="group flex w-full items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-red-500/10 text-red-500 group-hover:bg-red-500/20 transition-colors">
                  <LogOut size={12} />
                </div>
                <span>{t('profileMenu.logout')}</span>
              </div>
              <ChevronRight
                size={12}
                className="text-red-400 group-hover:translate-x-0.5 transition-all"
              />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProfileMenuModal
