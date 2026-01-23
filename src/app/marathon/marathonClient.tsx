/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { createMarathonAttempt, marathonApi } from '@/api/marathonApi'
import { getMyBest } from '@/api/my-bestApi'
import { ICreateMarathonAttempt, MarathonQuestion } from '@/types/marathon'
import { IMyBest } from '@/types/my-best'
import Error from '@/ui/common/error'
import GameOver from '@/ui/common/gameOver/gameOver'
import Loading from '@/ui/common/loading'
import QuestionCard from '@/ui/common/questionCards/marathon/questionCard'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import Cookies from 'js-cookie'
import { CheckCircle2, Trophy, Zap } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import charmIcon from '../../../public/ccharm.png'
import reactIcon from '../../../public/react.png'

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
  const marathonTitle = t('marathon.title')
  const [marathonFirstWord, ...marathonRestWords] = marathonTitle.split(' ')
  const gameOverRef = useRef<HTMLDivElement>(null)

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
        const score =
          mode === 'frontend' ? myBestData.bestFrontendScore : myBestData.bestBackendScore
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
      setTimeout(() => {
        setIsGameOver(true)
      }, 1500)
      return
    }
    setCurrentScore((prev) => prev + 1)
    setTimeout(() => {
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
    }, 1000)
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

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-10 md:py-12 space-y-7 sm:space-y-8">
        <motion.div
          className="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            suppressHydrationWarning
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
          >
            <span className="text-[#ec6216]">{marathonFirstWord}</span>
            {marathonRestWords.length > 0 && (
              <span className="text-[#13aeac]"> {marathonRestWords.join(' ')}</span>
            )}
          </h1>
          <div className="flex sm:flex-row justify-center gap-3 sm:gap-4">
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleModeChange('frontend')}
              className={`relative w-full sm:w-auto min-h-11 px-5 sm:px-6 py-2.5 rounded-3xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md border ${
                mode === 'frontend'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-card/80 backdrop-blur-md text-foreground border-border'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5">
                <Image
                  src={reactIcon}
                  alt="Frontend"
                  width={22}
                  height={22}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
                Frontend
              </span>
              {mode === 'frontend' && (
                <motion.div
                  layoutId="modeIndicator"
                  className="absolute inset-0 rounded-3xl bg-primary z-0"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                />
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleModeChange('backend')}
              className={`relative w-full sm:w-auto min-h-11 px-5 sm:px-6 py-2.5 rounded-3xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md border ${
                mode === 'backend'
                  ? 'bg-primary-2 text-white border-primary-2'
                  : 'bg-card/80 backdrop-blur-md text-foreground border-border'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5">
                <Image
                  src={charmIcon}
                  alt="Backend"
                  width={22}
                  height={22}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
                Backend
              </span>
              {mode === 'backend' && (
                <motion.div
                  layoutId="modeIndicator"
                  className="absolute inset-0 rounded-3xl bg-primary-2 z-0"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                />
              )}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:justify-start"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80">
              <Trophy className="w-3.5 h-3.5 text-foreground/70" />
            </span>
            <span className="uppercase tracking-wide">{t('marathon.bestScore')}</span>
            <span className="font-semibold text-foreground/80">{bestScore}</span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80">
              <Zap className="w-3.5 h-3.5 text-foreground/70" />
            </span>
            <span className="uppercase tracking-wide">{t('marathon.difficulty')}</span>
            <span className="font-semibold text-foreground/80">
              {t(`marathon.difficulties.${currentDifficulty}`)}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-foreground/70" />
            </span>
            <span className="uppercase tracking-wide">{t('marathon.currentScore')}</span>
            <span className="font-semibold text-foreground/80">{currentScore}</span>
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
        {!questions.length && !isLoading && !isFetching && !isError && (
          <Error message={t('marathon.noQuestions')} />
        )}

        {currentQuestion && !isLoading && !isFetching && !isError && (!isGameOver || isLose) && (
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
