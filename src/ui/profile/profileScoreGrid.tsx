'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import charmIcon from '../../../public/ccharm.png'
import mobileIcon from '../../../public/flutter.png'
import reactIcon from '../../../public/react.png'

interface ProfileScoreGridProps {
  frontendScore: number
  backendScore: number
  mobileScore: number
}

export function ProfileScoreGrid({
  frontendScore,
  backendScore,
  mobileScore,
}: ProfileScoreGridProps) {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div
        className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay="80"
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/12 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
            <Image src={reactIcon} alt="Frontend" width={28} height={28} className="object-contain" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('profile.bestFrontendScore')}
            </p>
            <p className="text-2xl font-black text-foreground">{frontendScore}</p>
          </div>
        </div>
      </div>

      <div
        className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay="140"
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary-2/12 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary-2/20 bg-primary-2/10">
            <Image src={charmIcon} alt="Backend" width={28} height={28} className="object-contain" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('profile.bestBackendScore')}
            </p>
            <p className="text-2xl font-black text-foreground">{backendScore}</p>
          </div>
        </div>
      </div>

      <div
        className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary-2/12 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary-2/20 bg-primary-2/10">
            <Image src={mobileIcon} alt="Mobile" width={28} height={28} className="object-contain" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t('profile.bestMobdevScore')}
            </p>
            <p className="text-2xl font-black text-foreground">{mobileScore}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
