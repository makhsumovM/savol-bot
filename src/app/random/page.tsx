'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import QuestionCardR from '@/ui/randomCard/QuestionCardRandom'
import Loading from '@/ui/common/loading'
import Error from '@/ui/common/error'
import { Randonapi } from '@/api/randomAPi'
import { RandomQuestion } from '@/types/random'
import Image from 'next/image'
import react from '../../../public/react.png'

const RandomPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const randomTitle = t('random.title')
  const [randomFirstWord, ...randomRestWords] = randomTitle.split(' ')

  const [type, setType] = useState<'frontend' | 'backend'>('frontend')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [isAnswering, setIsAnswering] = useState(false)

  const {
    data: questions = [],
    isLoading,
    isError,
  } = useQuery<RandomQuestion[]>({
    queryKey: ['random', lang, type],
    queryFn: () => Randonapi(lang, type),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    setCurrentIndex(0)
    setScore(0)
  }, [lang, type])

  const currentQuestion = questions[currentIndex]

  const handleAnswer = (isCorrect: boolean) => {
    if (isAnswering) return
    setIsAnswering(true)
    if (isCorrect) setScore((s) => s + 1)
    setTimeout(() => {
      setCurrentIndex((i) => i + 1)
      setIsAnswering(false)
    }, 1500)
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setScore(0)
  }

  return (
    <section className="min-h-screen px-4 sm:px-6 py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-4xl space-y-7 sm:space-y-8">
        <motion.div
          className="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1
            suppressHydrationWarning
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#ec6216]">{randomFirstWord}</span>
            {randomRestWords.length > 0 && (
              <span className="text-[#13aeac]"> {randomRestWords.join(' ')}</span>
            )}
          </motion.h1>
          <div className="flex sm:flex-row justify-center gap-3 sm:gap-4">
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setType('frontend')}
              className={`relative w-full sm:w-auto min-h-[44px] px-5 sm:px-6 py-2.5 rounded-3xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md border ${
                type === 'frontend'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-card/80 backdrop-blur-md text-foreground border-border'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5">
                <Image
                  src={react}
                  alt="Frontend"
                  width={22}
                  height={22}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
                Frontend
              </span>

              {type === 'frontend' && (
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
              onClick={() => setType('backend')}
              className={`relative w-full sm:w-auto min-h-[44px] px-5 sm:px-6 py-2.5 rounded-3xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md border ${
                type === 'backend'
                  ? 'bg-primary-2 text-white border-primary-2'
                  : 'bg-card/80 backdrop-blur-md text-foreground border-border'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5">
                <Image
                  src="/ccharm.png"
                  alt="Backend"
                  width={22}
                  height={22}
                  className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                />
                Backend
              </span>
              {type === 'backend' && (
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


      {isLoading && <Loading />}

      {!isLoading && (
        <>
          {isError && <Error message={t('random.errorLoading')} />}
          {!isError && !questions.length && (
            <Error message={t('random.noQuestions')} />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`${lang}-${type}-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <QuestionCardR
                question={currentQuestion}
                index={currentIndex}
                onAnswered={handleAnswer}
              />
            </motion.div>
          </AnimatePresence>
        </>
      )}
      </div>
    </section>
  )
}

export default RandomPage
