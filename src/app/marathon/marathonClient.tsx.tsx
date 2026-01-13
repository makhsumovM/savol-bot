/* eslint-disable react-hooks/set-state-in-effect */
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
import { Trophy, Zap, CheckCircle2 } from 'lucide-react'

const difficulties = ['easy', 'medium', 'hard', 'very-hard', 'expert'] as const

const LOCAL_STORAGE_KEYS = {
  frontend: 'marathon_best_frontend',
  backend: 'marathon_best_backend',
} as const

export default function MarathonClient() {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const lang = i18n.language
  const gameOverRef = useRef<HTMLDivElement>(null)

  const initialMode = (searchParams.get('mode') === 'backend' ? 'backend' : 'frontend') as 'frontend' | 'backend'

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
        localStorage.setItem(LOCAL_STORAGE_KEYS.frontend, response.data.bestFrontendScore.toString())
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
      } else {
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
      gameOverRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
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

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-10 md:py-12 space-y-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            suppressHydrationWarning
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight bg-linear-to-r from-primary to-primary-2 bg-clip-text text-transparent"
          >
            {t('marathon.title')}
          </h1>
        </motion.div>

        <div className="flex justify-center mb-5">
          <div className="relative inline-flex items-center rounded-full border border-border/70 bg-card/70 p-1 shadow-sm">
            <motion.span
              layoutId="mode-pill"
              className="absolute inset-y-1 rounded-full bg-foreground/5 ring-1 ring-border/50"
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              style={{
                width: 'calc(50% - 4px)',
                left: mode === 'frontend' ? '4px' : 'calc(50% + 0px)',
              }}
            />
            <button
              type="button"
              onClick={() => handleModeChange('frontend')}
              className="relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold text-foreground transition hover:text-foreground/80"
            >
              <div className="p-1 rounded-full bg-muted/60">
                <Image src={reactIcon} width={22} height={22} alt="Frontend" />
              </div>
              Frontend
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('backend')}
              className="relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold text-foreground transition hover:text-foreground/80"
            >
              <div className="p-1 rounded-full bg-muted/60">
                <Image src={charmIcon} width={22} height={22} alt="Backend" />
              </div>
              Backend
            </button>
          </div>
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
        {!questions.length && !isLoading && !isFetching && !isError && (
          <Error message={t('marathon.noQuestions')} />
        )}

        {currentQuestion && !isLoading && !isFetching && !isError && !isGameOver && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${lang}-${currentDifficulty}-${currentIndex}-${mode}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <QuestionCard question={currentQuestion} index={currentIndex} onAnswered={handleAnswer} />
            </motion.div>
          </AnimatePresence>
        )}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
        >
          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-3 py-2.5 text-muted-foreground shadow-sm">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/70">
              <Trophy className="w-4 h-4 text-foreground/70" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wide">{t('marathon.bestScore')}</span>
              <span className="text-base font-semibold text-foreground/80">{bestScore}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-3 py-2.5 text-muted-foreground shadow-sm">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/70">
              <Zap className="w-4 h-4 text-foreground/70" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wide">{t('marathon.difficulty')}</span>
              <span className="text-base font-semibold text-foreground/80">
                {t(`marathon.difficulties.${currentDifficulty}`)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-3 py-2.5 text-muted-foreground shadow-sm">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/70">
              <CheckCircle2 className="w-4 h-4 text-foreground/70" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wide">{t('marathon.currentScore')}</span>
              <span className="text-base font-semibold text-foreground/80">{currentScore}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
