'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import { getProfileApi } from '@/api/authApi'
import { getMyRank } from '@/api/my-rankApi'
import { IProfile } from '@/types/auth'
import { IMyRank } from '@/types/my-rank'
import UpdateProfileModal from '@/ui/modals/updateProfileModal/modal'
import { useState } from 'react'
import ChangePasswordModal from '@/ui/modals/changePasswordModal/modal'
import {
  Edit2,
  Lock,
  Trophy,
  Sparkles,
  Calendar,
  Mail,
  User,
  Zap,
  Target,
  Award,
  Settings,
  Languages,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react'
import { useTheme } from 'next-themes'

const ProfilePage = () => {
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false)
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false)
  const [fullname, setFullname] = useState<string>('')
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()
  const profileTitle = t('profile.title')
  const [profileFirstWord, ...profileRestWords] = profileTitle.split(' ')

  const { data, isLoading, isError } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: getProfileApi,
    refetchOnWindowFocus: false,
  })

  const { data: myRankData } = useQuery<IMyRank>({
    queryKey: ['my-rank'],
    queryFn: getMyRank,
    refetchOnWindowFocus: false,
  })

  const totalScore =
    (data?.bestResult?.bestFrontendScore ?? 0) + (data?.bestResult?.bestBackendScore ?? 0)
  const myRank = myRankData?.statusCode === 200 ? myRankData.data : null

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-80 w-[320px] sm:h-[460px] sm:w-[460px] rounded-full bg-primary/20 blur-[100px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[300px] w-[300px] sm:h-[440px] sm:w-[440px] rounded-full bg-secondary/15 blur-[100px] animate-pulse-slow" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-10 md:py-12 space-y-7 sm:space-y-8">
        <motion.div
          className="flex flex-col items-center gap-4 text-center mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            suppressHydrationWarning
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
          >
            <span className="text-[#ec6216]">{profileFirstWord}</span>
            {profileRestWords.length > 0 && (
              <span className="text-[#13aeac]"> {profileRestWords.join(' ')}</span>
            )}
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80">
              <Trophy className="w-3.5 h-3.5 text-foreground/70" />
            </span>
            <span className="uppercase tracking-wide">{t('profile.totalScore')}</span>
            <span className="font-semibold text-foreground/80">{totalScore}</span>
          </div>

          {myRank && (
            <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80">
                <Award className="w-3.5 h-3.5 text-foreground/70" />
              </span>
              <span className="uppercase tracking-wide">{t('profile.rank')}</span>
              <span className="font-semibold text-foreground/80">#{myRank}</span>
            </div>
          )}

          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80">
              <Sparkles className="w-3.5 h-3.5 text-foreground/70" />
            </span>
            <span className="uppercase tracking-wide">{t('profile.status')}</span>
            <span className="font-semibold text-primary">{t('profile.active')}</span>
          </div>
        </motion.div>

        {isLoading && <Loading />}
        {isError && <Error message={t('errors.profileLoadError')} />}

        {data && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/25 blur-[80px] animate-pulse" />
            <div
              className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primary-2/20 blur-[80px] animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-primary-2/8 rounded-3xl blur-xl" />
            <div className="relative rounded-2xl sm:rounded-3xl border border-border/40 bg-card/80 backdrop-blur-xl p-5 sm:p-8 shadow-2xl shadow-black/10">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-6">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-2 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-110" />
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary-2/30 animate-pulse"
                    style={{ animationDuration: '3s' }}
                  />
                  <img
                    src={process.env.NEXT_PUBLIC_API_URL + '/' + data.profilePicture}
                    alt={data.fullName}
                    className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-background shadow-2xl ring-4 ring-primary/30 group-hover:ring-primary/50 transition-all duration-500"
                  />
                </motion.div>

                <div className="flex-1 text-center sm:text-left">
                  <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {data.fullName}
                  </motion.h2>

                  <div className="space-y-2">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm sm:text-base">{data.email}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground/70">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs sm:text-sm">
                        {t('profile.joined')}: {new Date(data.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-2 py-4">
                <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3 h-3" />
                  {t('profile.scores')}
                </span>
                <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
              </div>

              {/* Score Cards - Enhanced like Leaderboard */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="relative rounded-xl px-4 py-5 backdrop-blur-md border-2 border-primary/40 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 shadow-lg shadow-primary/20 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                    animate={{ translateX: ['100%', '-100%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/30 shadow-inner">
                        <Target className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {t('profile.bestFrontendScore')}
                        </p>
                        <p className="text-2xl sm:text-3xl font-black text-primary">
                          {data.bestResult?.bestFrontendScore ?? 0}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-primary/70">pts</span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="relative rounded-xl px-4 py-5 backdrop-blur-md border-2 border-primary-2/40 bg-gradient-to-br from-primary-2/20 via-primary-2/10 to-primary-2/5 shadow-lg shadow-primary-2/20 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                    animate={{ translateX: ['100%', '-100%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2.5 }}
                  />
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-2/30 shadow-inner">
                        <Zap className="w-6 h-6 text-primary-2" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                          {t('profile.bestBackendScore')}
                        </p>
                        <p className="text-2xl sm:text-3xl font-black text-primary-2">
                          {data.bestResult?.bestBackendScore ?? 0}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-primary-2/70">pts</span>
                  </div>
                </motion.div>
              </div>

              {/* Action Button */}
              <div className="mt-6 flex justify-center sm:justify-start">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setChangePasswordModalOpen(true)}
                  className="relative min-h-11 px-5 sm:px-6 py-2.5 rounded-3xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md border bg-primary-2 text-white border-primary-2 hover:shadow-primary-2/40"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2.5">
                    <Lock className="w-5 h-5 sm:w-5 sm:h-5" />
                    {t('profile.changePassword')}
                  </span>
                </motion.button>
              </div>

              {/* Footer Stats */}
              <div className="mt-6 pt-4 border-t border-border/20">
                <div className="flex justify-between text-[10px] text-muted-foreground/80 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    {t('profile.member')}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Trophy className="w-3 h-3" />
                    {t('profile.total')}: {totalScore} pts
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Floating Edit Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setUpdateProfileModalOpen(true)
            setFullname(data?.fullName ?? '')
          }}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-primary to-primary/80 text-white font-bold text-sm rounded-full shadow-xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:shadow-primary/50"
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
