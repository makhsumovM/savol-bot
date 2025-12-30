'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Error from '@/ui/common/error'
import Link from 'next/link'
import { Trophy } from 'lucide-react'
import { IMybest } from '@/types/my-best'
import Loading from '@/ui/common/loading'
import { getMyBest } from '@/api/my-bestApi'

const MyBestPage = () => {
  const { t } = useTranslation()

  const { data, isLoading, isError } = useQuery<IMybest>({
    queryKey: ['my-best-scores'],
    queryFn: getMyBest,
    refetchOnWindowFocus: false,
  })

  if (isLoading || !data) {
    return <Loading />
  }

  if (isError) {
    return <Error message={t('errors.myBestLoadError')} />
  }

  const { bestFrontendScore, bestBackendScore, frontendAchievedAt, backendAchievedAt } = data.data

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-background via-background to-primary/10">
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary-2/15 blur-[120px] animate-pulse-slow" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 py-16 space-y-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black text-center mb-12
             bg-linear-to-r from-primary to-primary-2
             bg-clip-text text-transparent"
        >
          {t('myBest.title')}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl border border-border/30 shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <Trophy size={28} className="text-primary" />
              <h2 className="text-2xl font-semibold text-primary">
                {t('myBest.sections.frontend.title')}
              </h2>
            </div>
            <p className="text-lg font-medium mb-1">
              {t('myBest.sections.frontend.bestScore')}: {bestFrontendScore}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('myBest.sections.frontend.achievedAt')}:{' '}
              {new Date(frontendAchievedAt).toLocaleString()}
            </p>
            <Link
              href="/marathon"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              {t('myBest.sections.frontend.retry')}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-3xl border border-border/30 shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <Trophy size={28} className="text-primary-2" />
              <h2 className="text-2xl font-semibold text-primary-2">
                {t('myBest.sections.backend.title')}
              </h2>
            </div>
            <p className="text-lg font-medium mb-1">
              {t('myBest.sections.backend.bestScore')}: {bestBackendScore}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('myBest.sections.backend.achievedAt')}:{' '}
              {new Date(backendAchievedAt).toLocaleString()}
            </p>
            <Link
              href="/marathon"
              className="mt-4 inline-block text-sm font-medium text-primary-2 hover:underline"
            >
              {t('myBest.sections.backend.retry')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MyBestPage
