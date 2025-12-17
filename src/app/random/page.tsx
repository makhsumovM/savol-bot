'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { Randonapi } from '@/api/randomAPi'
import { RandomQuestion } from '@/types/random'
import QuestionCardR from '@/ui/randomCard/QuestionCardRandom'
import Loading from '@/ui/common/loading'
import Error from '@/ui/common/error'

const RandomPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentScore, setCurrentScore] = useState(0)

  const {
    data: questions = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery<RandomQuestion[]>({
    queryKey: ['random', lang],
    queryFn: () => Randonapi(lang),
    refetchOnWindowFocus: false,
    refetchOnMount: 'always',
  })

  useEffect(() => {
    setCurrentIndex(0)
    setCurrentScore(0)
  }, [lang])

  const currentQuestion = questions[currentIndex]

  const goToNextQuestion = () => {
    const nextIndex = currentIndex + 1
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex)
    } else {
      refetch().then(() => setCurrentIndex(0))
    }
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setCurrentScore((prev) => prev + 1)
    setTimeout(goToNextQuestion, 1500)
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 h-[380px] w-[380px] rounded-full bg-secondary/15 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-4 py-10 space-y-8">
        <div className="flex  gap-4 mb-4">
          <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/20 text-primary hover:text-primary/80 transition-colors duration-200"
          >Frontend</button>
          <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/20 text-primary hover:text-primary/80 transition-colors duration-200">Backend</button>
        </div>
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('random.title')}
        </motion.h1>

        {(isLoading || isFetching) && <Loading />}
        {isError && <Error message={t('marathon.errorLoading')} />}
        {!questions.length && !isLoading && !isFetching && <Error message={t('marathon.noQuestions')} />}

        {currentQuestion && !isLoading && !isFetching && !isError && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${lang}-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <QuestionCardR
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

export default RandomPage
