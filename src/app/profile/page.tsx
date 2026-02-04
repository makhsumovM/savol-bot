'use client'

import { useQuery } from '@tanstack/react-query'
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
import { Edit2, Lock, Trophy, Sparkles, Calendar, Mail, User, Zap, Award } from 'lucide-react'
import Image from 'next/image'
import charmIcon from '../../../public/ccharm.png'
import reactIcon from '../../../public/react.png'

const ProfilePage = () => {
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false)
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false)
  const [fullname, setFullname] = useState<string>('')
  const { t } = useTranslation()
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
  const profileImageUrl = data?.profilePicture
    ? `${process.env.NEXT_PUBLIC_API_URL}/${data.profilePicture}`
    : null
  const profileInitial = data?.fullName?.charAt(0).toUpperCase()

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-80 w-[320px] sm:h-[460px] sm:w-[460px] rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 h-[300px] w-[300px] sm:h-[440px] sm:w-[440px] rounded-full bg-secondary/15 blur-[100px]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-10 md:py-12 space-y-7 sm:space-y-8">
        <div className="flex flex-col items-center gap-4 text-center mb-4 sm:mb-6">
          <h1
            suppressHydrationWarning
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
          >
            <span className="text-[#ec6216]">{profileFirstWord}</span>
            {profileRestWords.length > 0 && (
              <span className="text-[#13aeac]"> {profileRestWords.join(' ')}</span>
            )}
          </h1>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground hover:scale-105 transition-transform">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80">
              <Trophy className="w-3.5 h-3.5 text-foreground/70" />
            </span>
            <span className="uppercase tracking-wide">{t('profile.totalScore')}</span>
            <span className="font-semibold text-foreground/80">{totalScore}</span>
          </div>

          {myRank && (
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground hover:scale-105 transition-transform">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80">
                <Award className="w-3.5 h-3.5 text-foreground/70" />
              </span>
              <span className="uppercase tracking-wide">{t('profile.rank')}</span>
              <span className="font-semibold text-foreground/80">#{myRank}</span>
            </div>
          )}

          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground hover:scale-105 transition-transform">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80">
              <Sparkles className="w-3.5 h-3.5 text-foreground/70" />
            </span>
            <span className="uppercase tracking-wide">{t('profile.status')}</span>
            <span className="font-semibold text-primary">{t('profile.active')}</span>
          </div>
        </div>

        {isLoading && <Loading />}
        {isError && <Error message={t('errors.profileLoadError')} />}

        {data && (
          <div className="relative">
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/25 blur-[80px] animate-pulse" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primary-2/20 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-primary-2/8 rounded-3xl blur-xl" />
            <div className="relative rounded-2xl sm:rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-5 sm:p-8 shadow-2xl shadow-black/10">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-6">
                <div className="relative group hover:scale-102 transition-transform">
                  <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary to-primary-2 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-110" />
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/30 to-primary-2/30 animate-pulse" style={{ animationDuration: '3s' }} />
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-background shadow-2xl ring-4 ring-primary/30 group-hover:ring-primary/50 transition-all duration-500">
                    {profileImageUrl ? (
                      <Image
                        src={profileImageUrl}
                        alt={data.fullName}
                        fill
                        sizes="(max-width: 640px) 112px, 144px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-3xl font-bold">
                        {profileInitial}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-2">
                    {data.fullName}
                  </h2>

                  <div className="space-y-2 border border-border/50 rounded-xl p-4 bg-muted/10">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground border-b border-border/20 pb-2 mb-2">
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

              <div className="flex items-center gap-2 py-4">
                <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3 h-3" />
                  {t('profile.scores')}
                </span>
                <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-background/40 rounded-2xl p-4 border border-border flex items-center gap-4 transition-transform hover:scale-[1.02]">
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/30 shadow-inner">
                        <Image
                          src={reactIcon}
                          alt="Frontend"
                          width={28}
                          height={28}
                          className="object-contain"
                        />
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
                </div>

                <div className="bg-background/40 rounded-2xl p-4 border border-border flex items-center gap-4 transition-transform hover:scale-[1.02]">
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-2/30 shadow-inner">
                        <Image
                          src={charmIcon}
                          alt="Backend"
                          width={28}
                          height={28}
                          className="object-contain"
                        />
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
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-4 border border-border/30 rounded-xl p-4 bg-muted/5">
                <button
                  onClick={() => setChangePasswordModalOpen(true)}
                  className="relative min-h-11 px-5 sm:px-6 py-2.5 rounded-3xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md border bg-primary-2 text-white border-primary-2 hover:shadow-primary-2/40 hover:scale-102 active:scale-98"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2.5">
                    <Lock className="w-5 h-5 sm:w-5 sm:h-5" />
                    {t('profile.changePassword')}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setUpdateProfileModalOpen(true)
                    setFullname(data?.fullName ?? '')
                  }}
                  className="relative min-h-11 px-5 sm:px-6 py-2.5 rounded-3xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md border bg-linear-to-r from-primary to-primary/90 text-white border-primary hover:shadow-primary/40 hover:scale-102 active:scale-98"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2.5">
                    <Edit2 className="w-5 h-5" />
                    {t('profile.updateProfile')}
                  </span>
                </button>
              </div>

              <div className="mt-6 pt-4 border border-border/30 rounded-xl p-3 bg-muted/5">
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
          </div>
        )}
      </div>

      <ChangePasswordModal
        changePasswordModalOpen={changePasswordModalOpen}
        setChangePasswordModalOpen={setChangePasswordModalOpen}
      />
      <UpdateProfileModal
        fullname={fullname}
        updateProfileModalOpen={updateProfileModalOpen}
        setUpdateProfileModalOpen={setUpdateProfileModalOpen}
      />
    </section>
  )
}

export default ProfilePage
