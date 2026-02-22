'use client'

import { IProfile } from '@/types/auth'
import LevelScore from '@/ui/profile/levelScore'
import { ProfileScoreGrid } from '@/ui/profile/profileScoreGrid'
import { Calendar, Edit2, Lock, Mail, Trophy, User, Zap } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

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
      <div
        className="relative rounded-3xl border border-white/10 bg-card/30 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-10"
        data-aos="zoom-in"
        data-aos-delay="60"
      >

        <div className="mb-6 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
          <div className="group relative transition-transform hover:scale-105">
            <div className="relative h-32 w-32 overflow-hidden rounded-3xl border-2 border-white/20 shadow-2xl ring-1 ring-white/10 transition-all duration-500 sm:h-40 sm:w-40">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt={profile.fullName}
                  fill
                  sizes="(max-width: 640px) 128px, 160px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/60 text-4xl font-black text-foreground">
                  {profileInitial}
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-card/80 backdrop-blur-md shadow-lg text-primary">
              <Trophy className="h-5 w-5" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="mb-2 text-2xl font-black text-foreground sm:text-3xl md:text-4xl">
              {profile.fullName}
            </h2>

            <div className="space-y-3 rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3 text-foreground/90 sm:justify-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium sm:text-base">{profile.email}</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-muted-foreground/60 sm:justify-start">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                  <Calendar className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium sm:text-sm">
                  {t('profile.joined')}: {new Date(profile.createdAt).toLocaleDateString()}
                </span>
              </div>
              <LevelScore
                bestBackendScore={profile.bestResult.bestBackendScore ?? 0}
                bestFrontendScore={profile.bestResult.bestFrontendScore ?? 0}
                bestMobdevScore={profile.bestResult.bestMobdevScore ?? 0}
              />
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

        <div className="mt-8 flex flex-wrap justify-center gap-4 sm:justify-start">
          <button
            onClick={onOpenChangePassword}
            className="group relative flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-xl active:scale-95 sm:text-base"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <Lock className="h-5 w-5 text-primary-2" />
            {t('profile.changePassword')}
          </button>

          <button
            onClick={() => onOpenUpdateProfile(profile.fullName)}
            className="group relative flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 px-6 py-3 text-sm font-bold text-primary backdrop-blur-md transition-all duration-300 hover:bg-primary/20 hover:shadow-xl active:scale-95 sm:text-base"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <Edit2 className="h-5 w-5" />
            {t('profile.updateProfile')}
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
              <User className="h-3 w-3" />
              {t('profile.member')}
            </div>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-sm font-black tracking-tight text-foreground">
                {t('profile.total')}: <span className="text-primary">{totalScore}</span> pts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
