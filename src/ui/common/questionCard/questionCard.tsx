"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code2, Copy, Check, Sparkles } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import type { MarathonQuestion } from "@/types/marathon"

interface QuestionCardProps {
  question: MarathonQuestion
  index: number
  onAnswered?: (isCorrect: boolean) => void
}

const letters = ["A", "B", "C", "D"]

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
        hover:bg-accent/40
        hover:ring-2 hover:ring-primary/30
        hover:shadow-[0_0_20px_-8px_var(--color-primary)]
        active:scale-[0.98]
        transition-all duration-200
      `
    }

    if (i === question.correctIndex) {
      return `
        bg-primary/10
        ring-2 ring-primary
        shadow-[0_0_24px_-4px_var(--color-primary)]
        text-foreground
      `
    }

    if (i === selected) {
      return `
        bg-destructive/10
        ring-2 ring-destructive/40
        opacity-70
      `
    }

    return "opacity-40 bg-muted/30"
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        w-full
        rounded-2xl
        border border-border/60
        bg-card/80
        backdrop-blur-xl
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        p-6 sm:p-8
        space-y-6
      "
    >
      {/* Question Header */}
      <header className="flex items-start gap-3 pb-4 border-b border-border/40">
        <div
          className="
          flex items-center justify-center
          w-8 h-8
          rounded-full
          bg-primary/10
          ring-1 ring-primary/20
          shrink-0
        "
        >
          <span className="text-sm font-bold text-primary">{index + 1}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold leading-relaxed text-foreground flex-1 text-balance">
          {question.question}
        </h2>
        {question.code && <Code2 className="w-5 h-5 text-primary/60 shrink-0 mt-1" />}
      </header>

      {/* Code Block */}
      {question.code && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="
            relative
            rounded-xl
            overflow-hidden
            border border-border/40
            bg-gradient-to-br from-muted/30 to-muted/10
            backdrop-blur-sm
            shadow-inner
          "
        >
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1.25rem",
              fontSize: "0.875rem",
              lineHeight: "1.6",
              background: "transparent",
            }}
          >
            {question.code}
          </SyntaxHighlighter>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="
              absolute top-3 right-3
              flex items-center gap-1.5
              px-3 py-1.5
              text-xs font-medium
              rounded-lg
              bg-card/90
              backdrop-blur-md
              border border-border/60
              shadow-lg
              hover:bg-card
              hover:ring-2 hover:ring-primary/30
              transition-all duration-200
            "
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Copy</span>
              </>
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Answer Options */}
      <ul className="space-y-3">
        {question.answers.map((ans, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.15 + i * 0.05,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={!answered ? { x: 4 } : undefined}
            whileTap={!answered ? { scale: 0.98 } : undefined}
            onClick={() => handleAnswer(i)}
            className={`
              flex items-center gap-4
              px-4 py-4
              rounded-xl
              border
              text-sm sm:text-base
              font-medium
              cursor-pointer
              ${getAnswerClasses(i)}
            `}
          >
            <span
              className={`
                flex items-center justify-center
                w-9 h-9
                rounded-lg
                border-2
                text-sm font-bold
                shrink-0
                transition-all duration-200
                ${
                  answered && i === question.correctIndex
                    ? "border-primary bg-primary text-primary-foreground"
                    : answered && i === selected
                      ? "border-destructive/40 bg-destructive/10 text-destructive"
                      : "border-border bg-background text-foreground"
                }
              `}
            >
              {letters[i]}
            </span>

            <span className="flex-1 leading-relaxed text-foreground">{ans}</span>

            {answered && i === question.correctIndex && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
            )}
          </motion.li>
        ))}
      </ul>

      {/* Footer Metadata */}
      <footer
        className="
        flex items-center justify-between
        pt-4
        border-t border-border/40
        text-xs sm:text-sm
      "
      >
        <div className="flex items-center gap-2">
          <div
            className="
            px-2.5 py-1
            rounded-md
            bg-muted/50
            border border-border/30
            text-muted-foreground
            font-medium
          "
          >
            {question.difficulty}
          </div>
        </div>
        {answered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`
              px-3 py-1
              rounded-md
              font-semibold
              ${
                selected === question.correctIndex
                  ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                  : "bg-destructive/10 text-destructive ring-1 ring-destructive/20"
              }
            `}
          >
            {selected === question.correctIndex ? "✓ Correct" : "✗ Incorrect"}
          </motion.div>
        )}
      </footer>
    </motion.article>
  )
}

export default QuestionCard
