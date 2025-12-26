/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useState, useEffect, useRef } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { marathonApi, createMarathonAttempt } from '@/api/marathonApi'
import { MarathonQuestion, ICreateMarathonAttempt } from '@/types/marathon'
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

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [difficultyIndex, setDifficultyIndex] = useState(0)
  const [mode, setMode] = useState<'frontend' | 'backend'>('frontend')
  const [isLose, setIsLose] = useState(false)
  const [bestScore, setBestScore] = useState(0)

  const currentDifficulty = difficulties[difficultyIndex]

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

  const { mutate } = useMutation({
    mutationFn: (data: ICreateMarathonAttempt) => createMarathonAttempt(data),
    onSuccess: (response) => {
      if (mode === 'frontend') setBestScore(response.data.bestFrontendScore)
      else setBestScore(response.data.bestBackendScore)
    },
  })

  useEffect(() => {
    if (isGameOver && isLose) {
      const data: ICreateMarathonAttempt =
        mode === 'frontend'
          ? { frontendScore: currentScore, backendScore: 0 }
          : { frontendScore: 0, backendScore: currentScore }

      mutate(data)
    }
  }, [isGameOver, isLose, currentScore, mode, mutate])

  useEffect(() => {
    setCurrentIndex(0)
    setCurrentScore(0)
    setIsGameOver(false)
    setIsLose(false)
    setDifficultyIndex(0)
    setBestScore(0)
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
      setIsLose(true)
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
    setIsLose(false)
    setDifficultyIndex(0)
    setBestScore(0)

    queryClient.invalidateQueries({
      queryKey: ['marathon', lang, currentDifficulty, mode],
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-80 w-[320px] sm:h-[460px] sm:w-[460px] rounded-full bg-primary/20 blur-[100px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[300px] w-[300px] sm:h-[440px] sm:w-[440px] rounded-full bg-secondary/15 blur-[100px] animate-pulse-slow" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-10 md:py-14 space-y-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            suppressHydrationWarning
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
          >
            <span style={{ color: 'rgb(245, 73, 0)' }}>{t('marathon.title').split(' ')[0]}</span>{' '}
            <span style={{ color: 'oklch(0.75 0.20 185)' }}>
              {t('marathon.title').split(' ').slice(1).join(' ')}
            </span>
          </h1>
        </motion.div>

        <div className="flex justify-center gap-6 mb-10">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('frontend')}
            className={`relative px-6 py-2.5 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden shadow-xl border-4 ${
              mode === 'frontend'
                ? 'bg-primary text-white border-primary shadow-primary/30'
                : 'bg-card border-border text-foreground hover:border-primary/50'
            }`}
          >
            <span className="relative z-10 flex items-center gap-3">
              <Image
                src={reactIcon}
                width={36}
                height={36}
                alt="Frontend"
                className="drop-shadow-md"
              />
              Frontend
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMode('backend')}
            className={`relative px-6 py-2.5 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden shadow-xl border-4 ${
              mode === 'backend'
                ? 'bg-primary-2 text-white border-primary-2 shadow-primary-2/40'
                : 'bg-card border-border text-foreground hover:border-primary-2/50'
            }`}
          >
            <span className="relative z-10 flex items-center gap-3">
              <Image
                src={charmIcon}
                width={36}
                height={36}
                alt="Backend"
                className="drop-shadow-md"
              />
              Backend
            </span>
          </motion.button>
        </div>

        {isGameOver && (
          <motion.div
            ref={gameOverRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GameOver currentScore={currentScore} record={bestScore} onRestart={handleRestart} />
          </motion.div>
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
