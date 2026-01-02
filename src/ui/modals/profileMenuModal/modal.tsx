'use client'

import React, { useEffect, useRef } from 'react'
import { User, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { logoutApi } from '@/api/authApi'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { getCookie, removeCookie } from '@/lib/utils/cookies'
import { Button } from '@/ui/button/button'

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
  const { mutate } = useMutation({
    mutationFn: logoutApi,
  })
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

  return (
    <AnimatePresence>
      {profileMenuModalOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className={
            'absolute mt-10 right-0 w-fit md:right-0 z-50 px-1 rounded-xl border border-border backdrop-blur-xl bg-card/90'
          }
        >
          <button
            onClick={() => {
              setProfileMenuModalOpen(false)
              router.push('/profile')
            }}
            className="flex w-full items-center gap-2 px-6 py-2.5 text-sm text-foreground hover:bg-accent/40 transition-colors"
          >
            <User size={16} />
            {t('profileMenu.profile')}
          </button>

          <div className="h-px bg-border my-1" />

          <button
            onClick={() => {
              const token = getCookie('refreshToken')
              if (token) {
                mutate({ refreshToken: token })
              }

              removeCookie('refreshToken')
              removeCookie('token')
              setProfileMenuModalOpen(false)
              setTimeout(() => {
                window.location.href = '/'
              }, 500)
              toast.success(t('profileMenu.logoutSuccess'))
            }}
            className="flex w-full items-center gap-2 px-6 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            {t('profileMenu.logout')}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProfileMenuModal
