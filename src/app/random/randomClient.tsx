/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { randomApi } from '@/api/randomAPi'
import { RANDOM_DEFAULT_TOPIC_BY_MODE, RandomMode, RandomTopicValue } from '@/types/random-client'
import { RandomQuestion } from '@/types/random'
import Error from '@/ui/common/error'
import GameModeSwitcher from '@/ui/common/gameModeSwitcher'
import GameTopicFilter from '@/ui/common/gameTopicFilter'
import Loading from '@/ui/common/loading'
import QuestionCard from '@/ui/common/questionCards/random/questionCard'
import {
  getRandomTopicOptions,
  getRandomTopicTheme,
  RANDOM_MODE_ICON_BY_MODE,
} from '@/ui/random/topicData'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function RandomClient() {
  const { t, i18n } = useTranslation()
  const searchParams = useSearchParams()
  const lang = i18n.language
  const randomTitle = t('random.title')
  const [randomFirstWord, ...randomRestWords] = randomTitle.split(' ')
  const allTopicsLabel = t('common.allTopics')

  const searchMode = searchParams.get('mode')
  const initialMode: RandomMode =
    searchMode === 'backend' ? 'backend' : searchMode === 'mobile' ? 'mobile' : 'frontend'

  const [currentIndex, setCurrentIndex] = useState(0)
  const [blockNumber, setBlockNumber] = useState(1)
  const [mode, setMode] = useState<RandomMode>(initialMode)
  const [topic, setTopic] = useState<RandomTopicValue>(RANDOM_DEFAULT_TOPIC_BY_MODE[initialMode])
  const topicOptions = getRandomTopicOptions(mode, allTopicsLabel)

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

  const handleModeChange = (newMode: RandomMode) => {
    if (newMode !== mode) {
      setMode(newMode)
      setTopic(RANDOM_DEFAULT_TOPIC_BY_MODE[newMode])
    }
  }

  const handleTopicChange = (newTopic: RandomTopicValue) => {
    if (newTopic !== topic) {
      setTopic(newTopic)
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 space-y-7 sm:space-y-8">
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
                {t('random.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              suppressHydrationWarning
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
            >
              <span className="text-[#ec6216]">{randomFirstWord}</span>
              {randomRestWords.length > 0 && (
                <span className="text-[#13aeac]"> {randomRestWords.join(' ')}</span>
              )}
            </motion.h1>
          </div>
          <motion.div variants={fadeUp}>
            <GameModeSwitcher
              mode={mode}
              onModeChange={handleModeChange}
              modeIcons={RANDOM_MODE_ICON_BY_MODE}
            />
          </motion.div>
        </motion.div>

        <GameTopicFilter
          mode={mode}
          topic={topic}
          topicOptions={topicOptions}
          onTopicChange={handleTopicChange}
          theme={getRandomTopicTheme(mode)}
        />

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
