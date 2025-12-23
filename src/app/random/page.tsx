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
import clsx from 'clsx'

const RandomPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  const [type, setType] = useState<'frontend' | 'backend'>('frontend')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)

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
    if (isCorrect) setScore((s) => s + 1)
    setTimeout(() => {
      setCurrentIndex((i) => i + 1)
    }, 1500)
  }

  return (
    <section className="min-h-screen p-8">
      <motion.h1
        suppressHydrationWarning
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {t('random.title')}
      </motion.h1>
      <div className="flex justify-center gap-4 my-6">
        <button
          onClick={() => setType('frontend')}
          disabled={isLoading}
          className={clsx(
            'flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300',
            ' text-orange-400 hover:bg-[#242424]',
            'shadow-md hover:shadow-orange-500/20',
            type === 'frontend' && 'ring-1 ring-orange-500/40',
            isLoading && 'opacity-50 cursor-not-allowed'
          )}
        >
          Frontend
        </button>

        <button
          onClick={() => setType('backend')}
          disabled={isLoading}
          className={clsx(
            'flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300',
            ' text-orange-400 hover:bg-[#242424]',
            'shadow-md hover:shadow-orange-500/20',
            type === 'backend' && 'ring-1 ring-orange-500/40',
            isLoading && 'opacity-50 cursor-not-allowed'
          )}
        >
        Backend
        </button>
      </div>


      {isLoading && <Loading />}

      {!isLoading && (
        <>
          {isError && <Error message={t('random.errorLoading')} />}

          {!isError && !questions.length && (
            <Error message={t('random.noQuestions')} />
          )}

          <AnimatePresence mode="wait">
            {currentQuestion ? (
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
            ) : (
              <div className="text-center text-xl font-bold mt-10">
                🎉 Finished! Score: {score} / {questions.length}
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  )
}

export default RandomPage
