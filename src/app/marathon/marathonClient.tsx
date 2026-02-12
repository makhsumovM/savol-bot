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
import Image, { StaticImageData } from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import aspnetIcon from '../../../public/aspnet.png'
import charmIcon from '../../../public/ccharm.png'
import dapperIcon from '../../../public/dapper.png'
import entityIcon from '../../../public/entity.png'
import grpcIcon from '../../../public/grc.png'
import htmlcssIcon from '../../../public/html&css.png'
import jsIcon from '../../../public/js.png'
import linqIcon from '../../../public/linq.png'
import kotlinIcon from '../../../public/kotlin.png'
import swiftIcon from '../../../public/swift.png'
import javaIcon from '../../../public/java.png'
import pythonIcon from '../../../public/python.png'
import mobileIcon from '../../../public/flutter.png'
import netIcon from '../../../public/net.png'
import nextjsIcon from '../../../public/nextjs.png'
import reactIcon from '../../../public/react.png'
import reactNextjsIcon from '../../../public/nextjs&react.png'
import serilogIcon from '../../../public/serilog.png'
import signalRIcon from '../../../public/signalR.png'
import tsIcon from '../../../public/ts.png'
import xunitIcon from '../../../public/xunit.png'

const difficulties = ['easy', 'medium', 'hard', 'very-hard', 'expert'] as const
type Mode = 'frontend' | 'backend' | 'mobile'


type SpecificTopic =
  | 'js'
  | 'ts'
  | 'htmlcss'
  | 'react'
  | 'nextjs'
  | 'react-nextjs'
  | 'dart-flutter'
  | 'kotlin'
  | 'react-native'
  | 'swift'
  | 'java'
  | 'python'
  | 'csharp'
  | 'dotnet'
  | 'aspnet'
  | 'ef'
  | 'linq'
  | 'dapper'
  | 'grpc'
  | 'signalr'
  | 'serilog'
  | 'xunit'

type TopicValue = 'all' | SpecificTopic

type TopicOption = {
  value: TopicValue
  label: string
  icon?: StaticImageData
}

const frontendTopics: TopicOption[] = [
  { value: 'all', label: 'All', icon: reactIcon },
  { value: 'js', label: 'JavaScript', icon: jsIcon },
  { value: 'ts', label: 'TypeScript', icon: tsIcon },
  { value: 'htmlcss', label: 'HTML + CSS', icon: htmlcssIcon },
  { value: 'react', label: 'React', icon: reactIcon },
  { value: 'nextjs', label: 'Next.js', icon: nextjsIcon },
  { value: 'react-nextjs', label: 'React + Next.js', icon: reactNextjsIcon },
]

const mobileTopics: TopicOption[] = [
  { value: 'all', label: 'All', icon: mobileIcon },
  { value: 'dart-flutter', label: 'Dart / Flutter', icon: mobileIcon },
  { value: 'kotlin', label: 'Kotlin', icon: kotlinIcon },
  { value: 'react-native', label: 'React Native', icon: reactIcon },
  { value: 'swift', label: 'Swift', icon: swiftIcon },
  { value: 'java', label: 'Java', icon: javaIcon },
  { value: 'python', label: 'Python', icon: pythonIcon },
]

const backendTopics: TopicOption[] = [
  { value: 'all', label: 'All', icon: netIcon },
  { value: 'csharp', label: 'C#', icon: charmIcon },
  { value: 'dotnet', label: '.NET', icon: netIcon },
  { value: 'aspnet', label: 'ASP.NET', icon: aspnetIcon },
  { value: 'ef', label: 'Entity Framework Core', icon: entityIcon },
  { value: 'linq', label: 'LINQ', icon: linqIcon },
  { value: 'dapper', label: 'Dapper', icon: dapperIcon },
  { value: 'grpc', label: 'gRPC', icon: grpcIcon },
  { value: 'signalr', label: 'SignalR', icon: signalRIcon },
  { value: 'serilog', label: 'Serilog', icon: serilogIcon },
  { value: 'xunit', label: 'xUnit', icon: xunitIcon },
]

const defaultTopicByMode: Record<Mode, TopicValue> = {
  frontend: 'all',
  backend: 'csharp',
  mobile: 'all',
}

const LOCAL_STORAGE_KEYS = {
  frontend: 'marathon_best_frontend',
  backend: 'marathon_best_backend',
  mobile: 'marathon_best_mobile',
} as const

const topicFilterVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const topicItemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
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
  const initialMode: Mode =
    searchMode === 'backend' ? 'backend' : searchMode === 'mobile' ? 'mobile' : 'frontend'

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [difficultyIndex, setDifficultyIndex] = useState(0)
  const [mode, setMode] = useState<Mode>(initialMode)
  const [topic, setTopic] = useState<TopicValue>(defaultTopicByMode[initialMode])
  const [isLose, setIsLose] = useState(false)
  const [bestScore, setBestScore] = useState(0)

  const currentDifficulty = difficulties[difficultyIndex]
  const isFrontend = mode === 'frontend'
  const isBackend = mode === 'backend'
  const isMobile = mode === 'mobile'

  const topicOptions = (isFrontend ? frontendTopics : isBackend ? backendTopics : mobileTopics).map(
    (option) => ({
      ...option,
      label: option.value === 'all' ? allTopicsLabel : option.label,
    })
  )

  const topicIcon = isFrontend ? reactIcon : isBackend ? charmIcon : reactIcon
  const topicActiveShadow = isBackend
    ? 'shadow-primary-2/30'
    : isFrontend
      ? 'shadow-primary/30'
      : 'shadow-purple-500/40'
  const topicActiveBorder = isBackend
    ? 'border-primary-2/60'
    : isFrontend
      ? 'border-primary/60'
      : 'border-purple-500/70'
  const topicActiveFill = isBackend
    ? 'bg-primary-2'
    : isFrontend
      ? 'bg-primary'
      : 'bg-gradient-to-r from-purple-600 to-purple-500'
  const topicActiveGlow = isBackend
    ? 'bg-linear-to-r from-primary-2/40 via-primary-2/20 to-primary-2/40'
    : isFrontend
      ? 'bg-linear-to-r from-primary/40 via-primary/20 to-primary/40'
      : 'bg-linear-to-r from-purple-500/50 via-purple-400/25 to-purple-500/50'
  const topicHoverGlow = isBackend
    ? 'bg-linear-to-r from-primary-2/10 via-primary-2/5 to-transparent'
    : isFrontend
      ? 'bg-linear-to-r from-primary/10 via-primary/5 to-transparent'
      : 'bg-linear-to-r from-purple-500/15 via-purple-400/8 to-transparent'
  const topicPanelGlow = isBackend
    ? 'bg-primary-2/15'
    : isFrontend
      ? 'bg-primary/15'
      : 'bg-purple-500/20'
  const topicPanelGradient = isBackend
    ? 'from-primary-2/12 via-transparent to-primary-2/5'
    : isFrontend
      ? 'from-primary/12 via-transparent to-primary/5'
      : 'from-purple-500/15 via-transparent to-purple-400/6'
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
          LOCAL_STORAGE_KEYS.frontend,
          response.data.bestFrontendScore.toString(),
        )
      } else if (mode === 'mobile') {
        setBestScore(response.data.bestMobileScore)
        localStorage.setItem(LOCAL_STORAGE_KEYS.mobile, response.data.bestMobileScore.toString())
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
          mode === 'frontend'
            ? myBestData.bestFrontendScore
            : mode === 'backend'
              ? myBestData.bestBackendScore
              : myBestData.bestMobdevScore
        setBestScore(score || 0)
      } else {
        const key =
          mode === 'frontend'
            ? LOCAL_STORAGE_KEYS.frontend
            : mode === 'backend'
              ? LOCAL_STORAGE_KEYS.backend
              : LOCAL_STORAGE_KEYS.mobile
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
            ? LOCAL_STORAGE_KEYS.frontend
            : mode === 'backend'
              ? LOCAL_STORAGE_KEYS.backend
              : LOCAL_STORAGE_KEYS.mobile
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
      queryKey: ['marathon', lang, currentDifficulty, mode, topic],
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleModeChange = (newMode: Mode) => {
    if (newMode !== mode) {
      setMode(newMode)
      setTopic(defaultTopicByMode[newMode])
    }
  }

  const handleTopicChange = (newTopic: TopicValue) => {
    if (newTopic !== topic) {
      setTopic(newTopic)
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden" data-aos="fade">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-80 w-[320px] sm:h-[460px] sm:w-[460px] rounded-full bg-primary/20 blur-[100px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[300px] w-[300px] sm:h-[440px] sm:w-[440px] rounded-full bg-secondary/15 blur-[100px] animate-pulse-slow" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-10 md:py-12 space-y-7 sm:space-y-8">
        <motion.div
          className="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          data-aos="fade-up"
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
          <div
            className="flex sm:flex-row justify-center gap-3 sm:gap-4"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleModeChange('frontend')}
              className={`relative w-full sm:w-auto min-h-11 px-5 sm:px-6 py-2.5 rounded-3xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md border ${
                mode === 'frontend'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-card/80 backdrop-blur-md text-foreground border-border'
              }`}
              data-aos="zoom-in"
              data-aos-delay="100"
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
              data-aos="zoom-in"
              data-aos-delay="140"
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

            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleModeChange('mobile')}
              className={`relative w-full sm:w-auto min-h-11 px-5 sm:px-6 py-2.5 rounded-3xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md border ${
                mode === 'mobile'
                  ? 'bg-violet-500 text-white border-violet-500'
                  : 'bg-card/80 backdrop-blur-md text-foreground border-border'
              }`}
              data-aos="zoom-in"
              data-aos-delay="140"
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5">
                <Image
                  src={mobileIcon}
                  alt="mobile"
                  width={22}
                  height={22}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
                Mobile
              </span>
              {mode === 'mobile' && (
                <motion.div
                  layoutId="modeIndicator"
                  className="absolute inset-0 rounded-3xl bg-violet-500 z-0"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                />
              )}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 backdrop-blur-xl p-3 sm:p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.04 }}
          data-aos="fade-up"
          data-aos-delay="120"
        >
          <div className={`absolute inset-0 bg-linear-to-br ${topicPanelGradient} opacity-80`} />
          <div
            className={`absolute -top-24 right-6 h-40 w-40 rounded-full blur-[90px] ${topicPanelGlow}`}
          />
          <div className="absolute -bottom-20 left-6 h-32 w-32 rounded-full bg-foreground/5 blur-[80px]" />

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              variants={topicFilterVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -6 }}
              className="relative flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:justify-start"
              data-aos="fade-up"
              data-aos-delay="140"
            >
              {topicOptions.map((option) => {
                const isActive = topic === option.value
                return (
                  <motion.button
                    key={option.value}
                    type="button"
                    layout
                    variants={topicItemVariants}
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    onClick={() => handleTopicChange(option.value)}
                    aria-pressed={isActive}
                    className={`group relative overflow-hidden rounded-2xl border bg-card/80 px-3.5 py-2 text-xs sm:text-sm font-semibold backdrop-blur transition-all duration-300 ${
                      isActive
                        ? `text-white ${topicActiveBorder} shadow-xl ${topicActiveShadow} border-opacity-80`
                        : 'text-foreground border-border/60 hover:border-foreground/30 hover:bg-card/95 hover:shadow-lg'
                    }`}
                  >
                    <span
                      className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${topicHoverGlow}`}
                    />
                    {isActive && (
                      <>
                        <motion.span
                          layoutId="topicIndicator"
                          className={`absolute inset-0 rounded-2xl ${topicActiveFill}`}
                          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                        />
                        <motion.span
                          className={`absolute inset-0 rounded-2xl blur-lg ${topicActiveGlow}`}
                          animate={{ opacity: [0.4, 0.8, 0.4] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        {isMobile && (
                          <motion.div
                            className="absolute inset-0 bg-linear-to-r from-purple-400/20 via-transparent to-purple-400/20"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          />
                        )}
                      </>
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <motion.span
                        className={`flex h-7 w-7 items-center justify-center rounded-xl border transition-all duration-300 ${
                          isActive
                            ? 'border-white/40 bg-white/20 shadow-lg'
                            : 'border-border/60 bg-background/90 group-hover:border-foreground/30 group-hover:bg-background group-hover:shadow-md'
                        }`}
                        animate={isActive && isMobile ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                      >
                        <Image
                          src={option.icon ?? topicIcon}
                          alt={option.label}
                          width={18}
                          height={18}
                          className="h-4 w-4 object-contain"
                        />
                      </motion.span>
                      <motion.span
                        className="whitespace-nowrap"
                        animate={isActive && isMobile ? { fontWeight: [600, 700, 600] } : {}}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        {option.label}
                      </motion.span>
                    </span>
                  </motion.button>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:justify-start"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          data-aos="fade-up"
          data-aos-delay="160"
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground"
            whileHover={{ scale: 1.05, y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80"
              animate={mode === 'mobile' ? { rotate: [0, 360] } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5, ease: 'linear' }}
            >
              <Trophy className="w-3.5 h-3.5 text-foreground/70" />
            </motion.span>
            <span className="uppercase tracking-wide">{t('marathon.bestScore')}</span>
            <motion.span
              className="font-semibold text-foreground/80"
              animate={mode === 'mobile' ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              {bestScore}
            </motion.span>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground"
            whileHover={{ scale: 1.05, y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80"
              animate={mode === 'mobile' ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
            >
              <Zap className="w-3.5 h-3.5 text-foreground/70" />
            </motion.span>
            <span className="uppercase tracking-wide">{t('marathon.difficulty')}</span>
            <span className="font-semibold text-foreground/80">
              {t(`marathon.difficulties.${currentDifficulty}`)}
            </span>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground"
            whileHover={{ scale: 1.05, y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="flex items-center justify-center w-5 h-5 rounded-full bg-background/80"
              animate={mode === 'mobile' ? { opacity: [0.7, 1, 0.7] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-foreground/70" />
            </motion.span>
            <span className="uppercase tracking-wide">{t('marathon.currentScore')}</span>
            <motion.span
              className="font-semibold text-foreground/80"
              animate={currentScore > 0 && mode === 'mobile' ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {currentScore}
            </motion.span>
          </motion.div>
        </motion.div>

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
