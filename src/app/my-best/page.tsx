'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Error from '@/ui/common/error'
import Link from 'next/link'
import { Trophy, Calendar, Repeat } from 'lucide-react'
import Loading from '@/ui/common/loading'
import { getMyBest } from '@/api/my-bestApi'
import { IMyBest } from '@/types/my-best'

const MyBestPage = () => {
  const { t } = useTranslation()

  const { data, isLoading, isError } = useQuery<IMyBest>({
    queryKey: ['my-best-scores'],
    queryFn: getMyBest,
    refetchOnWindowFocus: false,
  })

  if (isLoading || !data) return <Loading />
  if (isError) return <Error message={t('errors.myBestLoadError')} />

  const { bestFrontendScore, bestBackendScore, frontendAchievedAt, backendAchievedAt } = data.data

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/10">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/30 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary-2/25 blur-3xl animate-pulse-slow" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-6xl md:text-8xl font-black text-center bg-gradient-to-r from-primary via-primary-2 to-primary bg-clip-text text-transparent tracking-tight mb-20"
        >
          {t('myBest.title')}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-700" />

            <div className="relative bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:-translate-y-3 transition-all duration-700">
              <div className="p-10 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-primary-2 shadow-xl">
                    <Trophy size={40} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-2 bg-clip-text text-transparent">
                    {t('myBest.sections.frontend.title')}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-6xl md:text-7xl font-black bg-gradient-to-r from-primary to-primary-2 bg-clip-text text-transparent">
                      {bestFrontendScore.toLocaleString()}
                    </p>
                    <p className="text-xl text-foreground/80 mt-2">
                      {t('myBest.sections.frontend.bestScore')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar size={20} />
                    <span className="text-lg">
                      {t('myBest.sections.frontend.achievedAt')}: {new Date(frontendAchievedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                <Link
                  href="/marathon?mode=frontend"
                  className="mt-10 inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-2 text-white font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <Repeat size={24} />
                  {t('myBest.sections.frontend.retry')}
                </Link>
              </div>

              <div className="h-3 bg-gradient-to-r from-primary to-primary-2" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-2/20 to-primary-2/5 blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-700" />

            <div className="relative bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:-translate-y-3 transition-all duration-700">
              <div className="p-10 md:p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-2 to-primary shadow-xl">
                    <Trophy size={40} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-2 to-primary bg-clip-text text-transparent">
                    {t('myBest.sections.backend.title')}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-6xl md:text-7xl font-black bg-gradient-to-r from-primary-2 to-primary bg-clip-text text-transparent">
                      {bestBackendScore.toLocaleString()}
                    </p>
                    <p className="text-xl text-foreground/80 mt-2">
                      {t('myBest.sections.backend.bestScore')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar size={20} />
                    <span className="text-lg">
                      {t('myBest.sections.backend.achievedAt')}: {new Date(backendAchievedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>

                <Link
                  href="/marathon?mode=backend"
                  className="mt-10 inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary-2 to-primary text-white font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <Repeat size={24} />
                  {t('myBest.sections.backend.retry')}
                </Link>
              </div>

              <div className="h-3 bg-gradient-to-r from-primary-2 to-primary" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MyBestPage
