'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import type { MarathonQuestion } from '@/types/marathon'
import CodeBlock from '@/ui/common/questionCard/codeBlock'

interface QuestionCardProps {
  question: MarathonQuestion
  index: number
  onAnswered?: (isCorrect: boolean) => void
}

const letters = ['A', 'B', 'C', 'D']

const difficultyShadows: Record<string, string> = {
  easy: 'shadow-[0_0_20px_rgba(34,197,94,0.5)]',
  medium: 'shadow-[0_0_20px_rgba(234,179,8,0.5)]',
  hard: 'shadow-[0_0_25px_rgba(249,115,22,0.6)]',
  'very-hard': 'shadow-[0_0_30px_rgba(239,68,68,0.7)]',
  expert: 'shadow-[0_0_35px_rgba(139,92,246,0.7)]',
}

const QuestionCard = ({ question, index, onAnswered }: QuestionCardProps) => {
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleAnswer = (i: number) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    onAnswered?.(i === question.correctIndex)
  }

  const handleCopy = () => {
    if (!question.code) return
    navigator.clipboard.writeText(question.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  const getAnswerClasses = (i: number) => {
    if (!answered) {
      return `
        bg-card
        hover:bg-accent/20
        hover:ring-2 hover:ring-primary/30
        transition-all duration-200
        cursor-pointer
      `
    }

    if (i === question.correctIndex) {
      return `
        bg-green-100 dark:bg-green-800
        ring-2 ring-green-400
        transition-colors duration-500
      `
    }

    if (i === selected) {
      return `
        bg-red-100 dark:bg-red-800
        ring-2 ring-red-400
        transition-colors duration-500
      `
    }

    return `
      opacity-50
      cursor-not-allowed
    `
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full rounded-xl border bg-card ring-1 ring-primary/10 ${
        difficultyShadows[question.difficulty] || 'shadow-lg'
      } p-4 sm:p-4 lg:p-5`}
    >
      <header className="flex items-start justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 ring-1 ring-primary/20 shrink-0">
            <span className="text-xs font-semibold text-primary">{index + 1}</span>
          </div>

          <h2 className="text-sm sm:text-sm font-semibold leading-snug">
            {question.question}
          </h2>
        </div>
      </header>

      {question.code && (
        <div className="relative rounded-xl overflow-hidden border border-border shadow-inner my-4">
          <CodeBlock code={question.code} language={question.codeLanguage || 'javascript'} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-card/90 border border-border shadow hover:ring-2 hover:ring-primary/30 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Copy</span>
              </>
            )}
          </motion.button>
        </div>
      )}

      <ul className="space-y-2 mt-4">
        {question.answers.map((ans, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleAnswer(i)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-[12px] sm:text-sm font-medium leading-snug ${getAnswerClasses(
              i,
            )}`}
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg border-2 text-xs font-bold shrink-0">
              {letters[i]}
            </span>

            <span className="flex-1 min-w-0 wrap-break-word hyphens-auto">
              {ans}
            </span>

            {answered && i === question.correctIndex && (
              <Check className="w-4 h-4 text-green-500 shrink-0" />
            )}
          </motion.li>
        ))}
      </ul>

      <footer className="flex justify-end pt-3 border-t border-border/60">
        {answered && (
          <span
            className={`px-2.5 py-1 rounded-lg font-semibold text-xs ${
              selected === question.correctIndex
                ? 'bg-green-900 text-green-100'
                : 'bg-red-800 text-red-100'
            }`}
          >
            {selected === question.correctIndex ? '✓ Correct' : '✗ Incorrect'}
          </span>
        )}
      </footer>
    </motion.article>
  )
}

export default QuestionCard
