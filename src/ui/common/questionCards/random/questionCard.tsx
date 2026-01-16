'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { RandomQuestion } from '@/types/random'
import CodeBlock from '@/ui/common/questionCards/marathon/codeBlock'

interface QuestionCardProps {
  question: RandomQuestion
  index: number
  onAnswered?: (isCorrect: boolean) => void
}

const letters = ['A', 'B', 'C', 'D']

const QuestionCard = ({ question, index, onAnswered }: QuestionCardProps) => {
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  useEffect(() => {
    setSelected(null)
    setAnswered(false)
  }, [question])
  const handleAnswer = (i: number) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    onAnswered?.(i === question.correctIndex)
  }

  const answerClasses = (i: number) => {
    if (!answered) return 'cursor-pointer bg-card hover:bg-accent/20 border border-border/60'

    if (i === question.correctIndex) return 'bg-green-500/20 border-green-500 text-green-400'

    if (i === selected) return 'bg-red-500/20 border-red-500 text-red-400'

    return 'opacity-50'
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-3xl mx-auto rounded-2xl bg-card border border-border/60 p-4 sm:p-5 space-y-4"
    >
      <header className="flex gap-3 border-b border-border/60 pb-3">
        <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">
          {index + 1}
        </div>
        <h2 className="text-sm sm:text-base font-semibold leading-snug">{question.question}</h2>
      </header>

      {question.code && (
        <CodeBlock code={question.code} language={question.codeLanguage || 'javascript'} />
      )}

      <ul className="space-y-2">
        {question.answers.map((ans, i) => (
          <motion.li
            key={i}
            whileHover={!answered ? { scale: 1.01 } : undefined}
            onClick={() => handleAnswer(i)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${answerClasses(
              i,
            )}`}
          >
            <div className="w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold">
              {letters[i]}
            </div>

            <span className="flex-1">{ans}</span>

            {answered && i === question.correctIndex && (
              <Check className="w-4 h-4 text-green-400 shrink-0" />
            )}
          </motion.li>
        ))}
      </ul>

      {answered && (
        <footer className="pt-3 border-t border-border/60 text-right">
          <span
            className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${
              selected === question.correctIndex
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {selected === question.correctIndex ? '✓ Correct' : '✗ Incorrect'}
          </span>
        </footer>
      )}
    </motion.article>
  )
}

export default QuestionCard
