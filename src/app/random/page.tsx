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
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setType('frontend')}
          className={`px-4 py-2 rounded ${
            type === 'frontend' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
          }`}
        >
          Frontend
        </button>

        <button
          onClick={() => setType('backend')}
          className={`px-4 py-2 rounded ${
            type === 'backend' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
          }`}
        >
          Backend
        </button>
      </div>

      {isLoading && <Loading />}
      {isError && <Error message={t('random.errorLoading')} />}

      {!isLoading && !questions.length && <Error message={t('random.noQuestions')} />}

      <AnimatePresence mode="wait">
        {currentQuestion && (
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
        )}
      </AnimatePresence>

      {!currentQuestion && questions.length > 0 && (
        <div className="text-center text-xl font-bold mt-10">
          🎉 Finished! Score: {score} / {questions.length}
        </div>
      )}
    </section>
  )
}

export default RandomPage
