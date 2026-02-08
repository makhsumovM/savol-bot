/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { randomApi } from '@/api/randomAPi'
import { RandomQuestion } from '@/types/random'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import QuestionCard from '@/ui/common/questionCards/random/questionCard'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import aspnetIcon from '../../../public/aspnet.png'
import charmIcon from '../../../public/ccharm.png'
import dapperIcon from '../../../public/dapper.png'
import entityIcon from '../../../public/entity.png'
import grpcIcon from '../../../public/grc.png'
import htmlcssIcon from '../../../public/html&css.png'
import jsIcon from '../../../public/js.png'
import linqIcon from '../../../public/linq.png'
import netIcon from '../../../public/net.png'
import nextjsIcon from '../../../public/nextjs.png'
import reactIcon from '../../../public/react.png'
import reactNextjsIcon from '../../../public/nextjs&react.png'
import serilogIcon from '../../../public/serilog.png'
import signalRIcon from '../../../public/signalR.png'
import tsIcon from '../../../public/ts.png'
import xunitIcon from '../../../public/xunit.png'

type TopicValue =
  | 'all'
  | 'js'
  | 'ts'
  | 'htmlcss'
  | 'react'
  | 'nextjs'
  | 'react-nextjs'
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

const defaultTopicByMode: Record<'frontend' | 'backend', TopicValue> = {
  frontend: 'all',
  backend: 'csharp',
}

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

export default function RandomClient() {
  const { t, i18n } = useTranslation()
  const searchParams = useSearchParams()
  const lang = i18n.language
  const randomTitle = t('random.title')
  const [randomFirstWord, ...randomRestWords] = randomTitle.split(' ')

  const initialMode = (searchParams.get('mode') === 'backend' ? 'backend' : 'frontend') as
    | 'frontend'
    | 'backend'

  const [currentIndex, setCurrentIndex] = useState(0)
  const [blockNumber, setBlockNumber] = useState(1)
  const [mode, setMode] = useState<'frontend' | 'backend'>(initialMode)
  const [topic, setTopic] = useState<TopicValue>(defaultTopicByMode[initialMode])

  const isFrontend = mode === 'frontend'
  const topicOptions = isFrontend ? frontendTopics : backendTopics
  const topicIcon = isFrontend ? reactIcon : charmIcon
  const topicActiveShadow = isFrontend ? 'shadow-primary/30' : 'shadow-primary-2/30'
  const topicActiveBorder = isFrontend ? 'border-primary/60' : 'border-primary-2/60'
  const topicActiveFill = isFrontend ? 'bg-primary' : 'bg-primary-2'
  const topicActiveGlow = isFrontend
    ? 'bg-linear-to-r from-primary/40 via-primary/20 to-primary/40'
    : 'bg-linear-to-r from-primary-2/40 via-primary-2/20 to-primary-2/40'
  const topicHoverGlow = isFrontend
    ? 'bg-linear-to-r from-primary/10 via-primary/5 to-transparent'
    : 'bg-linear-to-r from-primary-2/10 via-primary-2/5 to-transparent'
  const topicPanelGlow = isFrontend ? 'bg-primary/15' : 'bg-primary-2/15'
  const topicPanelGradient = isFrontend
    ? 'from-primary/12 via-transparent to-primary/5'
    : 'from-primary-2/12 via-transparent to-primary-2/5'

  const {
    data: questions = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery<RandomQuestion[]>({
    queryKey: ['random', lang, mode, topic, blockNumber],
    queryFn: () => randomApi(lang, mode, topic),
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
  })

  useEffect(() => {
    setCurrentIndex(0)
    setBlockNumber(1)
  }, [lang, mode, topic])

  const currentQuestion = questions[currentIndex]

  const handleAnswer = (isCorrect: boolean) => {
    void isCorrect
    setTimeout(() => {
      const nextIndex = currentIndex + 1
      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex)
      } else {
        setBlockNumber((prev) => prev + 1)
        setCurrentIndex(0)
      }
    }, 1000)
  }

  const handleModeChange = (newMode: 'frontend' | 'backend') => {
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
            <span className="text-[#ec6216]">{randomFirstWord}</span>
            {randomRestWords.length > 0 && (
              <span className="text-[#13aeac]"> {randomRestWords.join(' ')}</span>
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
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.03, y: -1 }}
                    onClick={() => handleTopicChange(option.value)}
                    aria-pressed={isActive}
                    className={`group relative overflow-hidden rounded-2xl border bg-card/80 px-3.5 py-2 text-xs sm:text-sm font-semibold backdrop-blur transition-all duration-300 ${
                      isActive
                        ? `text-white ${topicActiveBorder} shadow-lg ${topicActiveShadow}`
                        : 'text-foreground border-border/60 hover:border-foreground/20 hover:bg-card/95'
                    }`}
                  >
                    <span
                      className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${topicHoverGlow}`}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="topicIndicator"
                        className={`absolute inset-0 rounded-2xl ${topicActiveFill}`}
                        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        className={`absolute inset-0 rounded-2xl blur-md ${topicActiveGlow}`}
                        animate={{ opacity: [0.35, 0.7, 0.35] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-xl border transition-colors ${
                          isActive
                            ? 'border-white/30 bg-white/10'
                            : 'border-border/50 bg-background/80 group-hover:bg-background'
                        }`}
                      >
                        <Image
                          src={option.icon ?? topicIcon}
                          alt={option.label}
                          width={18}
                          height={18}
                          className="h-4 w-4 object-contain"
                        />
                      </span>
                      <span className="whitespace-nowrap">{option.label}</span>
                    </span>
                  </motion.button>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {(isLoading || isFetching) && (
          <div data-aos="fade-up">
            <Loading />
          </div>
        )}
        {isError && <Error message={t('errors.loadFailed')} />}
        {!questions.length && !isLoading && !isFetching && !isError && (
          <Error message={t('random.noQuestions')} />
        )}

        {currentQuestion && !isLoading && !isFetching && !isError && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${lang}-${currentIndex}-${mode}-${topic}-${blockNumber}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
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
