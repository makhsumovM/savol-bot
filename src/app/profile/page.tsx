'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import { getProfileApi } from '@/api/authApi'
import { IProfile } from '@/types/auth'
import UpdateProfileModal from '@/ui/modals/updateProfileModal/modal'
import { useState } from 'react'
import ChangePasswordModal from '@/ui/modals/changePasswordModal/modal'
import { Edit2, Lock } from 'lucide-react'

const ProfilePage = () => {
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false)
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false)
  const [fullname, setFullname] = useState<string>('')
  const { t } = useTranslation()
  const { data, isLoading, isError } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: getProfileApi,
    refetchOnWindowFocus: false,
  })

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/20 blur-xl animate-pulse" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-primary-2/20 blur-xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-8 sm:py-10">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-primary via-primary-2 to-primary bg-clip-text text-transparent mb-6"
        >
          {t('profile.title')}
        </motion.h1>

        {isLoading && <Loading />}
        {isError && <Error message={t('errors.profileLoadError')} />}

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto"
          >
            <div className="relative bg-card/80 backdrop-blur-lg rounded-xl shadow-md border border-border/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-2/5 pointer-events-none" />
              <div className="relative p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="relative group">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-2 blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300 scale-105" />
                    <img
                      src={process.env.NEXT_PUBLIC_API_URL + '/' + data.profilePicture}
                      alt={data.fullName}
                      className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-background shadow ring-2 ring-primary/25 group-hover:ring-primary/40 transition-all duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-2 sm:space-y-3">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                        {data.fullName}
                      </h2>
                      <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                        {data.email}
                      </p>
                      <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground/70">
                        {t('profile.joined')}: {new Date(data.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto sm:mx-0">
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-2 border border-primary/20 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {t('profile.bestFrontendScore')}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-primary">
                          {data.bestResult?.bestFrontendScore ?? 0}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-primary-2/10 to-primary-2/5 rounded-lg p-2 border border-primary-2/20 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {t('profile.bestBackendScore')}
                        </p>
                        <p className="mt-1 text-2xl font-bold text-primary-2">
                          {data.bestResult?.bestBackendScore ?? 0}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center sm:justify-start">
                      <button
                        onClick={() => setChangePasswordModalOpen(true)}
                        className="flex items-center px-2 py-3 bg-primary-2 hover:bg-primary-2/90 text-white font-bold rounded-xl shadow-sm hover:shadow-primary-2/30 transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base"
                      >
                        <Lock className="inline w-4 h-4 mr-1 -mt-0.5" />
                        {t('profile.changePassword')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setUpdateProfileModalOpen(true)
            setFullname(data?.fullName ?? '')
          }}
          className="fixed bottom-3 right-3 z-50 flex items-center gap-2 px-4 py-3 bg-primary text-white font-bold text-sm rounded-full shadow-md backdrop-blur-md border border-white/20 transition-all duration-200 hover:shadow-primary/40"
        >
          <Edit2 className="w-5 h-5" />
          <span className="hidden sm:inline">{t('profile.updateProfile')}</span>
        </motion.button>
      </div>

      <ChangePasswordModal
        changePasswordModalOpen={changePasswordModalOpen}
        setChangePasswordModalOpen={setChangePasswordModalOpen}
      />
      <UpdateProfileModal
        fullname={fullname}
        setFullname={setFullname}
        updateProfileModalOpen={updateProfileModalOpen}
        setUpdateProfileModalOpen={setUpdateProfileModalOpen}
      />
    </section>
  )
}

export default ProfilePage
