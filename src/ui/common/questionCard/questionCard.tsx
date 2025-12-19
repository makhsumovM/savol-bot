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
      className={`w-full rounded-2xl border p-6 sm:p-8 bg-card ${
        difficultyShadows[question.difficulty] || 'shadow-lg'
      }`}
    >
      <header className="flex items-start justify-between gap-3 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 ring-1 ring-primary/20">
            <span className="text-sm font-bold text-primary">{index + 1}</span>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold leading-relaxed flex-1">
            {question.question}
          </h2>
        </div>
      </header>

      {question.code && (
        <div className="relative rounded-xl  overflow-hidden border border-border  shadow-inner">
          <CodeBlock code={question.code} language={question.codeLanguage || 'javascript'} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-card/90 border border-border shadow hover:ring-2 hover:ring-primary/30 transition"
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

      <ul className="space-y-3 pt-2">
        {question.answers.map((ans, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleAnswer(i)}
            className={`flex items-center gap-4 px-4 py-4 rounded-xl border text-sm sm:text-base font-medium ${getAnswerClasses(
              i,
            )}`}
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-lg border-2 text-sm font-bold">
              {letters[i]}
            </span>
            {question.correctIndex == i && <span className="text-primary">✔</span>}

            <span className="flex-1 leading-relaxed">{ans}</span>

            {answered && i === question.correctIndex && (
              <Check className="w-5 h-5 text-green-500" />
            )}
          </motion.li>
        ))}
      </ul>

      <footer className="flex justify-end pt-4 border-t border-border text-sm">
        {answered && (
          <span
            className={`px-3 py-1 rounded-md font-semibold ${
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
