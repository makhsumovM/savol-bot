'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { RandomQuestion } from '@/types/random'

interface QuestionCardProps {
  question: RandomQuestion
  index: number
  onAnswered?: (isCorrect: boolean) => void
}

const letters = ['A', 'B', 'C', 'D']

export default function QuestionCardR({
  question,
  index,
  onAnswered,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setSelected(null)
    setAnswered(false)
    setCopied(false)
  }, [question])

  const handleAnswer = (i: number) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    onAnswered?.(i === question.correctIndex)
  }

  const getAnswerClass = (i: number) => {
    if (!answered) {
      return `
        border border-slate-200 dark:border-white/10
        bg-slate-50 dark:bg-white/5
        hover:bg-slate-100 dark:hover:bg-white/10
      `
    }

    if (i === question.correctIndex) {
      return 'border-green-500 bg-green-500/20'
    }

    if (i === selected) {
      return 'border-red-500 bg-red-500/20'
    }

    return 'border-slate-200 dark:border-white/5 opacity-50'
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
        max-w-3xl mx-auto rounded-2xl
        bg-white dark:bg-[#1e1f24]
        border border-slate-200 dark:border-white/10
        p-4 sm:p-6 md:p-8
        space-y-4 sm:space-y-6
        shadow-xl
      "
    >
      <header className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-3 sm:pb-4">
        <div className="flex gap-3 sm:gap-4">
          <div className="w-7 h-7  sm:w-8 sm:h-8 rounded-full bg-orange-500/20 text-orange-500 shrink-0 flex items-center justify-center font-bold text-xs sm:text-sm">
            {index + 1}
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
            {question.question}
          </h2>
        </div>
      </header>

      {question.code && (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '0.75rem',
              background: 'transparent',
              fontSize: '0.75rem',
            }}
            className="sm:text-sm"
          >
            {question.code}
          </SyntaxHighlighter>

          <button
            onClick={() => {
              navigator.clipboard.writeText(question.code!)
              setCopied(true)
              setTimeout(() => setCopied(false), 1200)
            }}
            className="
              absolute top-2 right-2 sm:top-3 sm:right-3
              flex items-center gap-1 px-2 py-1
              text-[10px] sm:text-xs
              rounded bg-black/60 border border-white/10 text-white
            "
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}

      <ul className="space-y-3 sm:space-y-4">
        {question.answers.map((ans, i) => (
          <motion.li
            key={i}
            onClick={() => handleAnswer(i)}
            whileHover={!answered ? { scale: 1.01 } : undefined}
            className={`
              flex items-center gap-3 sm:gap-4
              px-3 py-3 sm:px-4 sm:py-4
              rounded-xl cursor-pointer
              transition
              ${getAnswerClass(i)}
            `}
          >
            <div
              className="
                w-8 h-8 sm:w-10 sm:h-10
                rounded-lg border border-slate-300 dark:border-white/20
                flex items-center justify-center
                font-bold text-xs sm:text-sm
                text-slate-700 dark:text-white/80
              "
            >
              {letters[i]}
            </div>

            <span className="flex-1 text-sm sm:text-base text-slate-800 dark:text-white/90">
              {ans}
            </span>

            {answered && i === question.correctIndex && (
              <Check className="text-green-500" size={18} />
            )}

            {answered && i === selected && selected !== question.correctIndex && (
              <span className="text-red-500 font-bold text-lg">✕</span>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  )
}
