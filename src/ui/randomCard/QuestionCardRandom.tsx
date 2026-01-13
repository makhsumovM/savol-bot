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

const QuestionCardR = ({ question, index, onAnswered }: QuestionCardProps) => {
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

  const difficultyClass = {
    easy: 'bg-green-500/15 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    hard: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    'very-hard': 'bg-red-500/15 text-red-400 border-red-500/30',
    expert: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  }[question.difficulty]

  const answerStyle = (i: number) => {
    if (!answered)
      return 'border border-border/60 bg-card hover:bg-accent/20 hover:border-primary/30 cursor-pointer transition-colors'
    if (i === question.correctIndex)
      return 'border border-green-500 bg-green-500/15'
    if (i === selected)
      return 'border border-red-500 bg-red-500/15'
    return 'border border-border/40 opacity-50'
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-3xl mx-auto rounded-xl bg-card border border-border/60 ring-1 ring-primary/10 p-4 sm:p-5 space-y-4 shadow-lg"
    >
      <header className="flex items-start justify-between gap-3 border-b border-border/60 pb-3">
        <div className="flex gap-3">
          <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-semibold text-xs">
            {index + 1}
          </div>
          <h2 className="text-sm sm:text-sm font-semibold text-foreground leading-snug">
            {question.question}
          </h2>
        </div>

        <span
          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${difficultyClass}`}
        >
          {question.difficulty}
        </span>
      </header>

      {question.code && (
        <div className="relative rounded-xl overflow-hidden border border-border/60 bg-muted/40">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '0.85rem',
              background: 'transparent',
              fontSize: '0.8rem',
            }}
          >
            {question.code}
          </SyntaxHighlighter>

          <button
            onClick={() => {
              navigator.clipboard.writeText(question.code!)
              setCopied(true)
              setTimeout(() => setCopied(false), 1200)
            }}
            className="absolute top-3 right-3 text-[11px] flex items-center gap-1 px-2 py-1 rounded bg-card/90 border border-border text-muted-foreground hover:text-foreground"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}

      <ul className="space-y-2">
        {question.answers.map((ans, i) => (
          <motion.li
            key={i}
            onClick={() => handleAnswer(i)}
            whileHover={!answered ? { scale: 1.01 } : undefined}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-[12px] sm:text-sm font-medium ${answerStyle(
              i
            )}`}
          >
            <div className="w-7 h-7 rounded-lg border border-border flex items-center justify-center font-bold text-foreground/80 text-xs">
              {letters[i]}
            </div>

            <span className="text-foreground flex-1">{ans}</span>

            {answered && i === question.correctIndex && (
              <Check className="text-green-400" />
            )}
          </motion.li>
        ))}
      </ul>

      {answered && (
        <footer className="pt-3 border-t border-border/60 text-right">
          <span
            className={`inline-block px-3 py-1 rounded-md font-semibold text-xs ${
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

export default QuestionCardR
