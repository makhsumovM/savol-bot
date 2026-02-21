'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { IMyBest } from '@/types/my-best'
import { MyRankScoreGrid } from '@/ui/my-rank/myRankScoreGrid'

interface MyRankProfileCardProps {
  rank: number
  fullName: string
  profilePicture?: string
  bestResult: IMyBest
  rankTone: string
  apiUrl?: string
}

export function MyRankProfileCard({
  rank,
  fullName,
  profilePicture,
  bestResult,
  rankTone,
  apiUrl,
}: MyRankProfileCardProps) {
  const { t } = useTranslation()
  const firstLetter = fullName.charAt(0).toUpperCase()
  const profileImageUrl = profilePicture
    ? apiUrl
      ? `${apiUrl}/${profilePicture}`
      : profilePicture
    : null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
    >
      <div
        className="relative overflow-hidden rounded-4xl border border-border/60  backdrop-blur-xl shadow-[0_30px_120px_-70px_rgba(0,0,0,0.7)]"
        data-aos="fade-up"
        data-aos-delay="60"
      >
        <div className="absolute inset-0  pointer-events-none "  />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full  blur-[120px] pointer-events-none " />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full  blur-[120px] pointer-events-none" />

        <div className="relative p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="relative">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-[3px]  shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-background bg-muted">
                  {profileImageUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={profileImageUrl}
                        alt={fullName}
                        fill
                        sizes="(max-width: 768px) 128px, 160px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-5xl">
                      {firstLetter}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 w-full space-y-6 text-center lg:text-left">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                    {fullName}
                  </h2>
                  <div className="mt-2 flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {t('myRank.currentPosition')}
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-1">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Rank
                  </span>
                  <span className={`text-5xl sm:text-6xl font-black ${rankTone}`}>#{rank}</span>
                </div>
              </div>

              <MyRankScoreGrid bestResult={bestResult} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
