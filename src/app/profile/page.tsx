'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import { getProfileApi } from '@/api/authApi'
import { IProfile } from '@/types/auth'
import UpdateProfileModal from '@/ui/updateProfileModal/modal'
import { useState } from 'react'

const ProfilePage = () => {
  const { t } = useTranslation()
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false)
  const { data, isLoading, isError } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: getProfileApi,
    refetchOnWindowFocus: false,
  })

  if (isLoading || !data) {
    return <Loading />
  }

  if (isError) {
    return <Error message={t('errors.profileLoadError')} />
  }

  const { fullName, email, profilePicture, createdAt, bestResult } = data.data

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-background via-background to-primary/10">
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary-2/15 blur-[120px] animate-pulse-slow" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 py-16 space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl font-black text-center mb-12
             bg-linear-to-r from-primary to-primary-2
             bg-clip-text text-transparent"
        >
          {t('profile.title')}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-3xl border border-border/30 shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col md:flex-row items-center gap-6"
        >
          <img
            src={process.env.NEXT_PUBLIC_API_URL + '/' + profilePicture}
            alt={fullName}
            className="w-32 h-32 rounded-full object-cover border-2 border-primary"
          />
          <div className="flex-1 space-y-2">
            <p className="text-lg font-semibold">{fullName}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
            <p className="text-sm text-muted-foreground">
              {t('profile.joined')}: {new Date(createdAt).toLocaleDateString()}
            </p>
            <div className="mt-4 space-y-1">
              <p>
                {t('profile.bestFrontendScore')}: {bestResult.bestFrontendScore}
              </p>
              <p>
                {t('profile.bestBackendScore')}: {bestResult.bestBackendScore}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <button
        onClick={() => setUpdateProfileModalOpen(true)}
        className="absolute top-8 right-8 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-2 transition-colors duration-300"
      >
        {t('profile.updateProfile')}
      </button>
      <UpdateProfileModal
        updateProfileModalOpen={updateProfileModalOpen}
        setUpdateProfileModalOpen={setUpdateProfileModalOpen}
      />
    </section>
  )
}

export default ProfilePage
