'use client'

import { Edit2, Lock, Trophy, Calendar, Mail, User, Zap } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { IProfile } from '@/types/auth'
import { ProfileScoreGrid } from '@/ui/profile/profileScoreGrid'

interface ProfileOverviewCardProps {
  profile: IProfile
  totalScore: number
  onOpenChangePassword: () => void
  onOpenUpdateProfile: (fullName: string) => void
}

export function ProfileOverviewCard({
  profile,
  totalScore,
  onOpenChangePassword,
  onOpenUpdateProfile,
}: ProfileOverviewCardProps) {
  const { t } = useTranslation()
  const profileImageUrl = profile.profilePicture
    ? `${process.env.NEXT_PUBLIC_API_URL}/${profile.profilePicture}`
    : null
  const profileInitial = profile.fullName.charAt(0).toUpperCase()

  return (
    <div className="relative">
      <div className="absolute -top-20 -right-20 h-40 w-40 animate-pulse rounded-full bg-primary/25 blur-[80px]" />
      <div
        className="absolute -bottom-20 -left-20 h-40 w-40 animate-pulse rounded-full bg-primary-2/20 blur-[80px]"
        style={{ animationDelay: '1s' }}
      />
      <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/8 via-transparent to-primary-2/8 blur-xl" />

      <div
        className="relative rounded-2xl border border-border bg-card/80 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:rounded-3xl sm:p-8"
        data-aos="zoom-in"
        data-aos-delay="60"
      >
        <div className="mb-6 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
          <div className="group relative transition-transform hover:scale-102">
            <div className="absolute inset-0 scale-110 rounded-full bg-linear-to-r from-primary to-primary-2 opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-70" />
            <div
              className="absolute inset-0 animate-pulse rounded-full bg-linear-to-br from-primary/30 to-primary-2/30"
              style={{ animationDuration: '3s' }}
            />
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-background shadow-2xl ring-4 ring-primary/30 transition-all duration-500 group-hover:ring-primary/50 sm:h-36 sm:w-36">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt={profile.fullName}
                  fill
                  sizes="(max-width: 640px) 112px, 144px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-3xl font-bold text-primary">
                  {profileInitial}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="mb-2 text-2xl font-black text-foreground sm:text-3xl md:text-4xl">
              {profile.fullName}
            </h2>

            <div className="space-y-2 rounded-xl border border-border/50 bg-muted/10 p-4">
              <div className="mb-2 flex items-center justify-center gap-2 border-b border-border/20 pb-2 text-muted-foreground sm:justify-start">
                <Mail className="h-4 w-4" />
                <span className="text-sm sm:text-base">{profile.email}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground/70 sm:justify-start">
                <Calendar className="h-4 w-4" />
                <span className="text-xs sm:text-sm">
                  {t('profile.joined')}: {new Date(profile.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 py-4">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-border/50 to-transparent" />
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            <Zap className="h-3 w-3" />
            {t('profile.scores')}
          </span>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-border/50 to-transparent" />
        </div>

        <ProfileScoreGrid
          frontendScore={profile.bestResult.bestFrontendScore ?? 0}
          backendScore={profile.bestResult.bestBackendScore ?? 0}
          mobileScore={profile.bestResult.bestMobdevScore ?? 0}
        />

        <div className="mt-6 flex flex-wrap justify-center gap-4 rounded-xl border border-border/30 bg-muted/5 p-4 sm:justify-start">
          <button
            onClick={onOpenChangePassword}
            className="relative min-h-11 rounded-3xl border border-primary-2 bg-primary-2 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-102 hover:shadow-primary-2/40 active:scale-98 sm:px-6 sm:text-base"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <Lock className="h-5 w-5 sm:h-5 sm:w-5" />
              {t('profile.changePassword')}
            </span>
          </button>

          <button
            onClick={() => onOpenUpdateProfile(profile.fullName)}
            className="relative min-h-11 rounded-3xl border border-primary bg-linear-to-r from-primary to-primary/90 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-102 hover:shadow-primary/40 active:scale-98 sm:px-6 sm:text-base"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <Edit2 className="h-5 w-5" />
              {t('profile.updateProfile')}
            </span>
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-border/30 bg-muted/5 p-3 pt-4">
          <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground/80">
            <span className="flex items-center gap-1.5">
              <User className="h-3 w-3" />
              {t('profile.member')}
            </span>
            <span className="flex items-center gap-1.5">
              <Trophy className="h-3 w-3" />
              {t('profile.total')}: {totalScore} pts
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}