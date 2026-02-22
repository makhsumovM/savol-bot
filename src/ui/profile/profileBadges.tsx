'use client'

import { Award, Sparkles, Trophy } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ProfileBadgesProps {
  totalScore: number
  myRank: number | null
}

export function ProfileBadges({ totalScore, myRank }: ProfileBadgesProps) {
  const { t } = useTranslation()

  return (
    <div
      suppressHydrationWarning
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      data-aos="fade-up"
    >
      <div
        suppressHydrationWarning // <-- Added here
        className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-[11px] text-muted-foreground transition-transform hover:scale-105 sm:text-xs"
        data-aos="zoom-in"
        data-aos-delay="40"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-background/80">
          <Trophy className="h-3.5 w-3.5 text-foreground/70" />
        </span>
        <span className="uppercase tracking-wide">{t('profile.totalScore')}</span>
        <span className="font-semibold text-foreground/80">{totalScore}</span>
      </div>

      {myRank && (
        <div
          suppressHydrationWarning // <-- Added here
          className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-[11px] text-muted-foreground transition-transform hover:scale-105 sm:text-xs"
          data-aos="zoom-in"
          data-aos-delay="80"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-background/80">
            <Award className="h-3.5 w-3.5 text-foreground/70" />
          </span>
          <span className="uppercase tracking-wide">{t('profile.rank')}</span>
          <span className="font-semibold text-foreground/80">#{myRank}</span>
        </div>
      )}

      <div
        suppressHydrationWarning // <-- Added here
        className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1.5 text-[11px] text-muted-foreground transition-transform hover:scale-105 sm:text-xs"
        data-aos="zoom-in"
        data-aos-delay="120"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-background/80">
          <Sparkles className="h-3.5 w-3.5 text-foreground/70" />
        </span>
        <span className="uppercase tracking-wide">{t('profile.status')}</span>
        <span className="font-semibold text-primary">{t('profile.active')}</span>
      </div>
    </div>
  )
} 
