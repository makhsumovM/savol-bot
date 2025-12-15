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

  // Текущий язык приложения (реальный активный язык)
  const lang = i18n.language

  const [record, setRecord] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  // Рекорд можно оставить в localStorage (не относится к языку)
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

  // Обновление рекорда
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

  // При смене языка начинаем игру заново
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
    <div className="p-6 space-y-8 max-w-3xl mx-auto">
      <motion.h1
        className="text-3xl font-bold text-primary"
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
          <GameOver
            currentScore={currentScore}
            record={record}
            onRestart={handleRestart}
          />
        </motion.div>
      )}

      {record !== null && (
        <motion.p
          className="text-sm text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          suppressHydrationWarning
        >
          {t('marathon.score.current')}:{' '}
          <span className="font-bold">{currentScore}</span> |{' '}
          {t('marathon.score.record')}:{' '}
          <span className="font-bold">{record}</span>
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
  )
}

export default MarathonPage
