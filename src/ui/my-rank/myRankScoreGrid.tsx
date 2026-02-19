'use client'

import Image, { StaticImageData } from 'next/image'
import { useTranslation } from 'react-i18next'
import { IMyBest } from '@/types/my-best'
import charmIcon from '../../../public/ccharm.png'
import reactIcon from '../../../public/react.png'
import mobileIcon from '../../../public/flutter.png'

type ScoreKey = 'bestFrontendScore' | 'bestBackendScore' | 'bestMobdevScore'

interface ScoreCard {
  alt: string
  icon: StaticImageData
  labelKey: string
  scoreKey: ScoreKey
  iconClassName: string
  glowClassName: string
  delay: number
}

const scoreCards: ScoreCard[] = [
  {
    alt: 'Frontend',
    icon: reactIcon,
    labelKey: 'profile.bestFrontendScore',
    scoreKey: 'bestFrontendScore',
    iconClassName: 'border-primary/20 bg-primary/10',
    glowClassName: 'from-primary/12 via-transparent to-transparent',
    delay: 140,
  },
  {
    alt: 'Backend',
    icon: charmIcon,
    labelKey: 'profile.bestBackendScore',
    scoreKey: 'bestBackendScore',
    iconClassName: 'border-primary-2/20 bg-primary-2/10',
    glowClassName: 'from-primary-2/12 via-transparent to-transparent',
    delay: 200,
  },
  {
    alt: 'Mobile',
    icon: mobileIcon,
    labelKey: 'profile.bestMobdevScore',
    scoreKey: 'bestMobdevScore',
    iconClassName: 'border-primary-2/20 bg-primary-2/10',
    glowClassName: 'from-primary-2/12 via-transparent to-transparent',
    delay: 260,
  },
]

interface MyRankScoreGridProps {
  bestResult: IMyBest
}

export function MyRankScoreGrid({ bestResult }: MyRankScoreGridProps) {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {scoreCards.map((scoreCard) => (
        <div
          key={scoreCard.scoreKey}
          className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/50 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          data-aos="fade-up"
          data-aos-delay={scoreCard.delay}
        >
          <div
            className={`absolute inset-0 bg-linear-to-br ${scoreCard.glowClassName} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
          />
          <div className="relative flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${scoreCard.iconClassName}`}
            >
              <Image
                src={scoreCard.icon}
                alt={scoreCard.alt}
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                {t(scoreCard.labelKey)}
              </p>
              <p className="text-2xl font-black text-foreground">
                {bestResult[scoreCard.scoreKey] ?? 0}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
