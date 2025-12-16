/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { marathonApi } from '@/api/marathonApi'
import { MarathonQuestion } from '@/types/marathon'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import QuestionCard from '@/ui/common/questionCard/questionCard'
import GameOver from '@/ui/common/gameOver/gameOver'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const MarathonPage = () => {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const lang = i18n.language

  const [record, setRecord] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    const saved = Number(localStorage.getItem('marathonRecord') || 0)
    setRecord(saved)
  }, [])

  const {
    data: questions = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery<MarathonQuestion[]>({
    queryKey: ['marathon', lang],
    queryFn: () => marathonApi(lang),
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
  })

  useEffect(() => {
    if (isGameOver && record !== null) {
      setRecord((prev) => {
        if (currentScore > (prev || 0)) {
          localStorage.setItem('marathonRecord', currentScore.toString())
          return currentScore
        }
        return prev
      })
    }
  }, [isGameOver, currentScore, record])

  useEffect(() => {
    setCurrentIndex(0)
    setCurrentScore(0)
    setIsGameOver(false)
  }, [lang])

  const currentQuestion = questions[currentIndex]

  const handleAnswer = (isCorrect: boolean) => {
    if (!isCorrect) {
      setIsGameOver(true)
      return
    }

    setCurrentScore((prev) => prev + 1)

    const nextIndex = currentIndex + 1
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex)
    } else {
      refetch().then(() => setCurrentIndex(0))
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setCurrentScore(0)
    setIsGameOver(false)
    queryClient.invalidateQueries({ queryKey: ['marathon', lang] })
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] sm:h-[560px] sm:w-[560px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[380px] w-[380px] sm:h-[520px] sm:w-[520px] rounded-full bg-secondary/15 blur-[120px] animate-pulse-slow" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14 md:py-20 space-y-8">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('marathon.title')}
        </motion.h1>

        {isGameOver && record !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GameOver currentScore={currentScore} record={record} onRestart={handleRestart} />
          </motion.div>
        )}

        {record !== null && (
          <motion.p
            className="text-sm sm:text-base text-primary text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            suppressHydrationWarning
          >
            {t('marathon.score.current')}: <span className="font-bold">{currentScore}</span> |{' '}
            {t('marathon.score.record')}: <span className="font-bold">{record}</span>
          </motion.p>
        )}

        {(isLoading || isFetching) && <Loading />}
        {isError && <Error message={t('marathon.errorLoading')} />}

        {!questions.length && !isLoading && !isFetching && (
          <Error message={t('marathon.noQuestions')} />
        )}

        {currentQuestion && !isLoading && !isFetching && !isError && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${lang}-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <QuestionCard
                question={currentQuestion}
                index={currentIndex}
                onAnswered={handleAnswer}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}

export default MarathonPage
