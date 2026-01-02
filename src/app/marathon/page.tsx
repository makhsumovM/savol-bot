'use client'

import { useState, useEffect, useRef } from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { marathonApi, createMarathonAttempt } from '@/api/marathonApi'
import { getMyBest } from '@/api/my-bestApi'
import { MarathonQuestion, ICreateMarathonAttempt } from '@/types/marathon'
import { IMyBest } from '@/types/my-best'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import QuestionCard from '@/ui/common/questionCard/questionCard'
import GameOver from '@/ui/common/gameOver/gameOver'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import reactIcon from '../../../public/react.png'
import charmIcon from '../../../public/ccharm.png'
import Cookies from 'js-cookie'
import { useSearchParams } from 'next/navigation'

const difficulties = ['easy', 'medium', 'hard', 'very-hard', 'expert']

const LOCAL_STORAGE_KEYS = {
  frontend: 'marathon_best_frontend',
  backend: 'marathon_best_backend',
} as const

const MarathonPage = () => {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const lang = i18n.language
  const gameOverRef = useRef<HTMLDivElement | null>(null)

  const initialMode = (searchParams.get('mode') === 'backend' ? 'backend' : 'frontend') as
    | 'frontend'
    | 'backend'

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [difficultyIndex, setDifficultyIndex] = useState(0)
  const [mode, setMode] = useState<'frontend' | 'backend'>(initialMode)
  const [isLose, setIsLose] = useState(false)
  const [bestScore, setBestScore] = useState(0)

  const currentDifficulty = difficulties[difficultyIndex]

  const token = Cookies.get('token')
  const isAuthenticated = !!token

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

  const { data: myBestData } = useQuery<IMyBest>({
    queryKey: ['my-best'],
    queryFn: getMyBest,
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  })

  const { mutate: mutateAttempt } = useMutation({
    mutationFn: (data: ICreateMarathonAttempt) => createMarathonAttempt(data),
    onSuccess: (response) => {
      if (mode === 'frontend') {
        setBestScore(response.data.bestFrontendScore)
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.frontend,
          response.data.bestFrontendScore.toString(),
        )
      } else {
        setBestScore(response.data.bestBackendScore)
        localStorage.setItem(LOCAL_STORAGE_KEYS.backend, response.data.bestBackendScore.toString())
      }
    },
  })

  useEffect(() => {
    const loadBestScore = () => {
      if (isAuthenticated && myBestData) {
        const score = mode === 'frontend' ? myBestData.bestFrontendScore : myBestData.bestBackendScore
        setBestScore(score || 0)
      } else if (!isAuthenticated) {
        const key = mode === 'frontend' ? LOCAL_STORAGE_KEYS.frontend : LOCAL_STORAGE_KEYS.backend
        const saved = localStorage.getItem(key)
        setBestScore(saved ? parseInt(saved, 10) : 0)
      }
    }
    loadBestScore()
  }, [mode, lang, isAuthenticated, myBestData])

  useEffect(() => {
    if (isGameOver && isLose && currentScore > 0) {
      if (isAuthenticated) {
        const data: ICreateMarathonAttempt =
          mode === 'frontend'
            ? { frontendScore: currentScore, backendScore: 0 }
            : { frontendScore: 0, backendScore: currentScore }
        mutateAttempt(data)
      } else {
        const key = mode === 'frontend' ? LOCAL_STORAGE_KEYS.frontend : LOCAL_STORAGE_KEYS.backend
        const currentBest = parseInt(localStorage.getItem(key) || '0', 10)
        if (currentScore > currentBest) {
          localStorage.setItem(key, currentScore.toString())
          setBestScore(currentScore)
        }
      }
    }
  }, [isGameOver, isLose, currentScore, mode, isAuthenticated, mutateAttempt])

  useEffect(() => {
    setCurrentIndex(0)
    setCurrentScore(0)
    setIsGameOver(false)
    setIsLose(false)
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

    queryClient.invalidateQueries({
      queryKey: ['marathon', lang, currentDifficulty, mode],
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleModeChange = (newMode: 'frontend' | 'backend') => {
    if (newMode !== mode) {
      setMode(newMode)
    }
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
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight bg-linear-to-r from-primary to-primary-2 bg-clip-text text-transparent"
          >
            {t('marathon.title')}
          </h1>
        </motion.div>

        <div className="flex justify-center gap-6 mb-10">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleModeChange('frontend')}
            className={`relative px-6 py-2.5 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden shadow-xl border-4 ${mode === 'frontend'
              ? 'bg-primary text-white border-primary shadow-primary/30'
              : 'bg-card border-border text-foreground hover:border-primary/50'
              }`}
          >
            <span className="relative z-10 flex items-center gap-3">
              <div className="p-1 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Image src={reactIcon} width={48} height={48} alt="Frontend" />
              </div>
              Frontend
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleModeChange('backend')}
            className={`relative px-6 py-2.5 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden shadow-xl border-4 ${mode === 'backend'
              ? 'bg-primary-2 text-white border-primary-2 shadow-primary-2/40'
              : 'bg-card border-border text-foreground hover:border-primary-2/50'
              }`}
          >
            <span className="relative z-10 flex items-center gap-3">
              <div className="p-1 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Image src={charmIcon} width={48} height={48} alt="Backend" />
              </div>
              Backend
            </span>
          </motion.button>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-3 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl px-6 py-4 shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-medium">{t('marathon.bestScore')}</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {bestScore}
              </span>
            </div>
          </div>

          {/* Current Difficulty */}
          <div className="flex items-center justify-center gap-3 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl px-6 py-4 shadow-lg">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-lg ${difficultyIndex === 0 ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-500/30' :
              difficultyIndex === 1 ? 'bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-500/30' :
                difficultyIndex === 2 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-yellow-500/30' :
                  difficultyIndex === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/30' :
                    'bg-gradient-to-br from-red-500 to-red-700 shadow-red-500/30'
              }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-medium">{t('marathon.difficulty')}</span>
              <span className={`text-xl font-bold capitalize ${difficultyIndex === 0 ? 'text-green-500' :
                difficultyIndex === 1 ? 'text-blue-500' :
                  difficultyIndex === 2 ? 'text-yellow-500' :
                    difficultyIndex === 3 ? 'text-orange-500' :
                      'text-red-500'
                }`}>
                {t(`marathon.difficulties.${currentDifficulty}`)}
              </span>
            </div>
          </div>

          {/* Current Score */}
          <div className="flex items-center justify-center gap-3 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl px-6 py-4 shadow-lg">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-2 shadow-lg shadow-primary/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-medium">{t('marathon.currentScore')}</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-2 bg-clip-text text-transparent">
                {currentScore}
              </span>
            </div>
          </div>
        </motion.div>

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
