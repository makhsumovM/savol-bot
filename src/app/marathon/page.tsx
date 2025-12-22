/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useState, useEffect, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { marathonApi } from '@/api/marathonApi'
import { MarathonQuestion } from '@/types/marathon'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import QuestionCard from '@/ui/common/questionCard/questionCard'
import GameOver from '@/ui/common/gameOver/gameOver'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import reactIcon from '../../../public/react.png'
import charmIcon from '../../../public/ccharm.png'
const difficulties = ['easy', 'medium', 'hard', 'very-hard', 'expert']

const MarathonPage = () => {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const lang = i18n.language
  const gameOverRef = useRef<HTMLDivElement | null>(null)

  const [record, setRecord] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [difficultyIndex, setDifficultyIndex] = useState(0)
  const [mode, setMode] = useState<'frontend' | 'backend'>('frontend')

  const currentDifficulty = difficulties[difficultyIndex]

  useEffect(() => {
    const saved = Number(localStorage.getItem(`marathonRecord_${mode}`) || 0)
    setRecord(saved)
  }, [mode])

  const {
    data: questions = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery<MarathonQuestion[]>({
    queryKey: ['marathon', lang, currentDifficulty, mode],
    queryFn: () => marathonApi(lang, currentDifficulty, mode),
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
  })

  useEffect(() => {
    if (isGameOver && record !== null) {
      setRecord((prev) => {
        const newRecord = Math.max(currentScore, prev || 0)
        if (currentScore > (prev || 0)) {
          localStorage.setItem(`marathonRecord_${mode}`, currentScore.toString())
        }
        return newRecord
      })
    }
  }, [isGameOver, currentScore, record, mode])

  useEffect(() => {
    setCurrentIndex(0)
    setCurrentScore(0)
    setIsGameOver(false)
    setDifficultyIndex(0)
  }, [lang, mode])

  useEffect(() => {
    if (isGameOver && gameOverRef.current) {
      gameOverRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [isGameOver])

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
      const nextDifficultyIndex = difficultyIndex + 1
      if (nextDifficultyIndex < difficulties.length) {
        setDifficultyIndex(nextDifficultyIndex)
        setCurrentIndex(0)
      } else {
        setIsGameOver(true)
      }
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setCurrentScore(0)
    setIsGameOver(false)
    setDifficultyIndex(0)
    queryClient.invalidateQueries({ queryKey: ['marathon', lang, currentDifficulty, mode] })
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] sm:h-[560px] sm:w-[560px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[380px] w-[380px] sm:h-[520px] sm:w-[520px] rounded-full bg-secondary/15 blur-[120px] animate-pulse-slow" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14 md:py-20 space-y-8">
        <motion.h1
          suppressHydrationWarning
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('marathon.title')}
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <motion.button
            animate={mode === 'frontend' ? 'active' : 'inactive'}
            whileHover={{ scale: mode === 'frontend' ? 1.08 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('frontend')}
            className={`
          group flex items-center  px-2  rounded-xl font-medium transition-all
          ${
            mode === 'frontend'
              ? 'bg-primary text-white'
              : 'bg-card text-muted-foreground hover:bg-accent hover:text-foreground'
          }
        `}
          >
            <Image
              src={reactIcon}
              width={60}
              alt="React"
              className="group-hover:rotate-12 transition-transform duration-300"
            />
            Frontend
          </motion.button>

          <motion.button
            animate={mode === 'backend' ? 'active' : 'inactive'}
            whileHover={{ scale: mode === 'backend' ? 1.08 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('backend')}
            className={`
          group flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all
          ${
            mode === 'backend'
              ? 'bg-primary text-white'
              : 'bg-card text-muted-foreground hover:bg-accent hover:text-foreground'
          }
        `}
          >
            <Image
              src={charmIcon}
              width={60}
              alt="Backend"
              className="group-hover:rotate-12 transition-transform duration-300"
            />
            Backend
          </motion.button>
        </div>

        {isGameOver && record !== null && (
          <motion.div
            ref={gameOverRef}
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
            {t('marathon.score.record')} ({mode === 'frontend' ? 'Frontend' : 'Backend'}):{' '}
            <span className="font-bold">{record}</span> | {t('marathon.score.difficulty')}:{' '}
            <span className="font-bold">{currentDifficulty}</span>
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
              key={`${lang}-${currentDifficulty}-${currentIndex}-${mode}`}
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
