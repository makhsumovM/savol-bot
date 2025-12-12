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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/40 text-primary">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <motion.p
              className="text-xs uppercase tracking-[0.25em] text-muted-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              marathon mode
            </motion.p>
            <motion.h1
              className="text-3xl font-semibold sm:text-4xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Минималистичный марафон вопросов
            </motion.h1>
            <motion.p
              className="max-w-2xl text-sm text-muted-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Оставайся в «потоке» как на monkeytype: чистый интерфейс, тихая палитра, акцент на контенте.
              Выбирай ответы, не отвлекаясь.
            </motion.p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-primary/10 bg-card/60 px-4 py-2 backdrop-blur">
            <span className="text-xs font-medium text-muted-foreground">Тема</span>
            <ModeToggle />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <motion.div
            className="rounded-xl border border-primary/10 bg-card/70 p-4 backdrop-blur"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs uppercase text-muted-foreground">Вопрос</p>
            <p className="text-2xl font-semibold">{currentIndex + 1}</p>
          </motion.div>
          <motion.div
            className="rounded-xl border border-primary/10 bg-card/70 p-4 backdrop-blur"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.3 }}
          >
            <p className="text-xs uppercase text-muted-foreground">Текущий счет</p>
            <p className="text-2xl font-semibold">{currentScore}</p>
          </motion.div>
          <motion.div
            className="rounded-xl border border-primary/10 bg-card/70 p-4 backdrop-blur"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            suppressHydrationWarning
          >
            <p className="text-xs uppercase text-muted-foreground">Рекорд</p>
            <p className="text-2xl font-semibold">{record ?? '—'}</p>
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-primary/10 bg-card/80 p-4 text-sm text-muted-foreground backdrop-blur">
          <span className="rounded-lg bg-primary/5 px-3 py-1 font-medium text-primary">Без лишнего шума</span>
          <span>Всегда один вопрос на экране.</span>
          <span>Мгновенная перезагрузка раунда по кнопке ниже.</span>
        </div>

        {(isLoading || isFetching) && <Loading />}
        {isError && <Error message="Ошибка при загрузке вопросов." />}
        {!questions.length && !isLoading && !isFetching && <Error message="Вопросы не найдены." />}

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

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-primary/15"
          >
            Начать заново
          </button>
          <p className="text-xs text-muted-foreground">Новый сет вопросов загрузится автоматически после конца серии.</p>
        </div>

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
    </div>
  )
}

export default MarathonPage
