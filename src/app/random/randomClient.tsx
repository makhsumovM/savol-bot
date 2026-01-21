'use client'

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Loading from '@/ui/common/loading'
import Error from '@/ui/common/error'
import { RandomQuestion } from '@/types/random'
import Image from 'next/image'
import react from '../../../public/react.png'
import QuestionCard from '@/ui/common/questionCards/random/questionCard'
import { randomApi } from '@/api/randomApi'

const QUESTIONS_PER_BLOCK = 10

export default function RandomClient() {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const lang = i18n.language
  const randomTitle = t('random.title')
  const [randomFirstWord, ...randomRestWords] = randomTitle.split(' ')

  const [type, setType] = useState<'frontend' | 'backend'>('frontend')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [blockNumber, setBlockNumber] = useState(1)

  const {
    data: questions = [],
    isLoading,
    isError,
  } = useQuery<RandomQuestion[]>({
    queryKey: ['random', lang, type, blockNumber],
    queryFn: () => randomApi(lang, type),
    refetchOnWindowFocus: false,
  })

  const handleAnswer = (isCorrect: boolean) => {
    setTimeout(() => {
      const nextIndex = currentIndex + 1
      if (nextIndex < QUESTIONS_PER_BLOCK) {
        setCurrentIndex(nextIndex)
      } else {
        setBlockNumber((prev) => prev + 1)
        setCurrentIndex(0)
        queryClient.invalidateQueries({ queryKey: ['random', lang, type] })
      }
    }, 1500)
  }

  const currentQuestion = questions[currentIndex]

  return (
    <section className="min-h-screen px-4 sm:px-6 py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-4xl space-y-7 sm:space-y-8">
        <motion.div
          className="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-[#ec6216]">{randomFirstWord}</span>
            {randomRestWords.length > 0 && (
              <span className="text-[#13aeac]"> {randomRestWords.join(' ')}</span>
            )}
          </h1>

          <div className="flex gap-3 sm:gap-4">
            {['frontend', 'backend'].map((mode) => (
              <motion.button
                key={mode}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setType(mode as 'frontend' | 'backend')}
                className={`relative w-full sm:w-auto min-h-11 px-5 sm:px-6 py-2.5 rounded-3xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md border ${
                  type === mode
                    ? mode === 'frontend'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-primary-2 text-white border-primary-2'
                    : 'bg-card/80 backdrop-blur-md text-foreground border-border'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <Image
                    src={mode === 'frontend' ? react : '/ccharm.png'}
                    alt={mode}
                    width={22}
                    height={22}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </span>
                {type === mode && (
                  <motion.div
                    layoutId="modeIndicator"
                    className={`absolute inset-0 rounded-3xl z-0 ${
                      mode === 'frontend' ? 'bg-primary' : 'bg-primary-2'
                    }`}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {isLoading && <Loading />}
        {!isLoading && isError && <Error message={t('random.errorLoading')} />}
        {!isLoading && !isError && !questions.length && <Error message={t('random.noQuestions')} />}

        {currentQuestion && !isLoading && !isError && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${lang}-${type}-${currentIndex}-${blockNumber}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
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
