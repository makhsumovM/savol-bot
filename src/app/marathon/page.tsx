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
import { ModeToggle } from '@/ui/common/modeToggle/modeToggle'

const MarathonPage = () => {
  const queryClient = useQueryClient()

  const {
    data: questions = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery<MarathonQuestion[]>({
    queryKey: ['marathon'],
    queryFn: marathonApi,
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [currentScore, setCurrentScore] = useState(0)
  const [record, setRecord] = useState<number | null>(null)

  useEffect(() => {
    const saved = Number(localStorage.getItem('marathonRecord') || 0)
    setRecord(saved)
  }, [])

  useEffect(() => {
    if (isGameOver && record !== null) {
      setRecord((prevRecord) => {
        if (currentScore > (prevRecord || 0)) {
          localStorage.setItem('marathonRecord', currentScore.toString())
          return currentScore
        }
        return prevRecord
      })
    }
  }, [isGameOver, currentScore, record])

  const currentQuestion = questions[currentIndex]

  const handleAnswer = (isCorrect: boolean) => {
    if (!isCorrect) {
      setIsGameOver(true)
    } else {
      setCurrentScore((prev) => prev + 1)
      const nextIndex = currentIndex + 1
      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex)
      } else {
        refetch().then(() => setCurrentIndex(0))
      }
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setCurrentScore(0)
    setIsGameOver(false)
    queryClient.setQueryData(['marathon'], [])
    refetch()
  }

  

  return (
    <div className="p-6 space-y-8 max-w-3xl mx-auto">
      <motion.h1
        className="text-3xl font-bold text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Marathon Questions
      </motion.h1>
      <ModeToggle />

      {isGameOver && record !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <GameOver currentScore={currentScore} record={record} onRestart={handleRestart} />
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
          Текущий счет: <span className="font-bold">{currentScore}</span> | Рекорд:{' '}
          <span className="font-bold">{record}</span>
        </motion.p>
      )}

      {(isLoading || isFetching) && <Loading />}
      {isError && <Error message="Ошибка при загрузке вопросов." />}
      {!questions.length && !isLoading && !isFetching && <Error message="Вопросы не найдены." />}

      {currentQuestion && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
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
