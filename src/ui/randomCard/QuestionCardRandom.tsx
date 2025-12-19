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
      return 'border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 cursor-pointer'
    if (i === question.correctIndex)
      return 'border border-green-500 bg-green-500/20'
    if (i === selected)
      return 'border border-red-500 bg-red-500/20'
    return 'border border-white/5 opacity-50'
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-3xl mx-auto rounded-2xl bg-[#1e1f24] border border-white/10 p-8 space-y-6 shadow-xl"
    >
      <header className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
            {index + 1}
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-white leading-snug">
            {question.question}
          </h2>
        </div>

        <span
          className={`px-3 py-1 rounded-md text-xs font-semibold border ${difficultyClass}`}
        >
          {question.difficulty}
        </span>
      </header>

      {question.code && (
        <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              fontSize: '0.85rem',
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
            className="absolute top-3 right-3 text-xs flex items-center gap-1 px-2 py-1 rounded bg-black/60 border border-white/10 text-white/70 hover:text-white"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}

      <ul className="space-y-4">
        {question.answers.map((ans, i) => (
          <motion.li
            key={i}
            onClick={() => handleAnswer(i)}
            whileHover={!answered ? { scale: 1.01 } : undefined}
            className={`flex items-center gap-4 px-4 py-4 rounded-xl transition ${answerStyle(
              i
            )}`}
          >
            <div className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center font-bold text-white/80">
              {letters[i]}
            </div>

            <span className="text-white/90 flex-1">{ans}</span>

            {answered && i === question.correctIndex && (
              <Check className="text-green-400" />
            )}
          </motion.li>
        ))}
      </ul>

      {answered && (
        <footer className="pt-4 border-t border-white/10 text-right">
          <span
            className={`inline-block px-4 py-1 rounded-md font-semibold text-sm ${
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
