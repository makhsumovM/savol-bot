/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { createMarathonAttempt, marathonApi } from '@/api/marathonApi'
import { getMyBest } from '@/api/my-bestApi'
import {
  MARATHON_DEFAULT_TOPIC_BY_MODE,
  MARATHON_DIFFICULTIES,
  MARATHON_LOCAL_STORAGE_KEYS,
  MarathonMode,
  MarathonTopicValue,
} from '@/types/marathon-client'
import { ICreateMarathonAttempt, MarathonQuestion } from '@/types/marathon'
import { IMyBest } from '@/types/my-best'
import Error from '@/ui/common/error'
import GameModeSwitcher from '@/ui/common/gameModeSwitcher'
import GameTopicFilter from '@/ui/common/gameTopicFilter'
import GameOver from '@/ui/common/gameOver/gameOver'
import Loading from '@/ui/common/loading'
import QuestionCard from '@/ui/common/questionCards/marathon/questionCard'
import MarathonStatsBadges from '@/ui/marathon/statsBadges'
import {
  getMarathonTopicOptions,
  getMarathonTopicTheme,
  MARATHON_MODE_ICON_BY_MODE,
} from '@/ui/marathon/topicData'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import Cookies from 'js-cookie'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function MarathonClient() {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const lang = i18n.language
  const marathonTitle = t('marathon.title')
  const [marathonFirstWord, ...marathonRestWords] = marathonTitle.split(' ')
  const gameOverRef = useRef<HTMLDivElement>(null)

  const allTopicsLabel = t('common.allTopics')

  const searchMode = searchParams.get('mode')
  const initialMode: MarathonMode =
    searchMode === 'backend' ? 'backend' : searchMode === 'mobile' ? 'mobile' : 'frontend'

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [difficultyIndex, setDifficultyIndex] = useState(0)
  const [mode, setMode] = useState<MarathonMode>(initialMode)
  const [topic, setTopic] = useState<MarathonTopicValue>(MARATHON_DEFAULT_TOPIC_BY_MODE[initialMode])
  const [isLose, setIsLose] = useState(false)
  const [bestScore, setBestScore] = useState(0)

  const currentDifficulty = MARATHON_DIFFICULTIES[difficultyIndex]
  const topicOptions = getMarathonTopicOptions(mode, allTopicsLabel)
  const token = Cookies.get('token')
  const isAuthenticated = !!token

  const {
    data: questions = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery<MarathonQuestion[]>({
    queryKey: ['marathon', lang, currentDifficulty, mode, topic],
    queryFn: () => marathonApi(lang, currentDifficulty, mode, topic),
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
          MARATHON_LOCAL_STORAGE_KEYS.frontend,
          response.data.bestFrontendScore.toString(),
        )
      } else if (mode === 'mobile') {
        setBestScore(response.data.bestMobileScore)
        localStorage.setItem(
          MARATHON_LOCAL_STORAGE_KEYS.mobile,
          response.data.bestMobileScore.toString(),
        )
      } else {
        setBestScore(response.data.bestBackendScore)
        localStorage.setItem(
          MARATHON_LOCAL_STORAGE_KEYS.backend,
          response.data.bestBackendScore.toString(),
        )
      }
    },
  })

  useEffect(() => {
    const loadBestScore = () => {
      if (isAuthenticated && myBestData) {
        const score =
          mode === 'frontend'
            ? myBestData.bestFrontendScore
            : mode === 'backend'
              ? myBestData.bestBackendScore
              : myBestData.bestMobdevScore
        setBestScore(score || 0)
      } else {
        const key =
          mode === 'frontend'
            ? MARATHON_LOCAL_STORAGE_KEYS.frontend
            : mode === 'backend'
              ? MARATHON_LOCAL_STORAGE_KEYS.backend
              : MARATHON_LOCAL_STORAGE_KEYS.mobile
        const saved = localStorage.getItem(key)
        setBestScore(saved ? parseInt(saved, 10) : 0)
      }
    }
    loadBestScore()
  }, [mode, isAuthenticated, myBestData])

  useEffect(() => {
    if (isGameOver && isLose && currentScore > 0) {
      if (isAuthenticated) {
        const data: ICreateMarathonAttempt =
          mode === 'frontend'
            ? {
              frontendScore: currentScore,
              backendScore: 0,
              mobdevScore: 0,
            }
            : mode === 'backend'
              ? {
                frontendScore: 0,
                backendScore: currentScore,
                mobdevScore: 0,
              }
              : {
                frontendScore: 0,
                backendScore: 0,
                mobdevScore: currentScore,
              }

        mutateAttempt(data)
      } else {
        const key =
          mode === 'frontend'
            ? MARATHON_LOCAL_STORAGE_KEYS.frontend
            : mode === 'backend'
              ? MARATHON_LOCAL_STORAGE_KEYS.backend
              : MARATHON_LOCAL_STORAGE_KEYS.mobile
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
  }, [lang, mode, topic])

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
        if (nextDifficultyIndex < MARATHON_DIFFICULTIES.length) {
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
      queryKey: ['marathon', lang, currentDifficulty, mode, topic],
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleModeChange = (newMode: MarathonMode) => {
    if (newMode !== mode) {
      setMode(newMode)
      setTopic(MARATHON_DEFAULT_TOPIC_BY_MODE[newMode])
    }
  }

  const handleTopicChange = (newTopic: MarathonTopicValue) => {
    if (newTopic !== topic) {
      setTopic(newTopic)
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-10 md:py-12 space-y-7 sm:space-y-8">
        <motion.div
          className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between mb-4 sm:mb-6"
          initial="hidden"
          animate="show"
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <div className="space-y-6">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-2 backdrop-blur-xl"
            >
              <motion.div
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="text-xs font-semibold tracking-wide text-primary sm:text-sm">
                {t('marathon.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              suppressHydrationWarning
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
            >
              <span className="text-[#ec6216]">{marathonFirstWord}</span>
              {marathonRestWords.length > 0 && (
                <span className="text-[#13aeac]"> {marathonRestWords.join(' ')}</span>
              )}
            </motion.h1>
          </div>
          <motion.div variants={fadeUp}>
            <GameModeSwitcher
              mode={mode}
              onModeChange={handleModeChange}
              modeIcons={MARATHON_MODE_ICON_BY_MODE}
            />
          </motion.div>
        </motion.div>

        <GameTopicFilter
          mode={mode}
          topic={topic}
          topicOptions={topicOptions}
          onTopicChange={handleTopicChange}
          theme={getMarathonTopicTheme(mode)}
        />

        <MarathonStatsBadges
          mode={mode}
          bestScore={bestScore}
          currentScore={currentScore}
          difficultyLabel={t(`marathon.difficulties.${currentDifficulty}`)}
          bestScoreText={t('marathon.bestScore')}
          difficultyText={t('marathon.difficulty')}
          currentScoreText={t('marathon.currentScore')}
        />

        {isGameOver && (
          <motion.div
            ref={gameOverRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            data-aos="zoom-in"
            data-aos-delay="120"
          >
            <GameOver currentScore={currentScore} record={bestScore} onRestart={handleRestart} />
          </motion.div>
        )}

        {(isLoading || isFetching) && (
          <div data-aos="fade-up">
            <Loading />
          </div>
        )}
        {isError && <Error message={t('marathon.errorLoading')} />}
        {!questions.length && !isLoading && !isFetching && !isError && (
          <Error message={t('marathon.noQuestions')} />
        )}

        {currentQuestion && !isLoading && !isFetching && !isError && (!isGameOver || isLose) && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${lang}-${currentDifficulty}-${currentIndex}-${mode}-${topic}`}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{
                duration: mode === 'mobile' ? 0.5 : 0.4,
                type: 'spring',
                stiffness: mode === 'mobile' ? 200 : 300,
                damping: 25,
              }}
              data-aos="fade-up"
              data-aos-delay="120"
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
