import { useState } from 'react'
import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Code, Star, Copy, Verified, Sparkles } from 'lucide-react'
import { MarathonQuestion } from '@/types/marathon'

interface QuestionCardProps {
  question: MarathonQuestion
  index: number
  onAnswered?: (isCorrect: boolean) => void
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const answerVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
}

const QuestionCard = ({ question, index, onAnswered }: QuestionCardProps) => {
  const [copied, setCopied] = useState(false)

  const handleClick = (ansIndex: number) => {
    onAnswered?.(ansIndex === question.correctIndex)
  }

  const handleCopy = () => {
    if (question.code) {
      navigator.clipboard.writeText(question.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <motion.div
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-6 shadow-lg shadow-black/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 via-card to-background/90 opacity-70" />
      <div className="relative flex items-start gap-3">
        <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex-1 space-y-2">
          <h2 className="text-lg md:text-xl font-semibold text-primary">
            {index + 1}. {question.question}
          </h2>
          <p className="text-sm text-muted-foreground">Сфокусируйся на сути — минимум визуального шума, максимум темпа.</p>
        </div>
        {question.code && <Code className="h-5 w-5 text-muted-foreground" />}
      </div>

      {question.code && (
        <div className="relative overflow-hidden rounded-xl border border-border/60 bg-background/80 shadow-inner">
          <div className="flex items-center justify-between border-b border-border/70 bg-gradient-to-r from-background/80 via-card to-background/60 px-3 py-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2 text-primary">
              <Code className="h-4 w-4" />
              Кодовый блок
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/20"
            >
              {copied ? <Verified className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Скопировано' : 'Копировать'}
            </button>
          </div>
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            customStyle={{ margin: 0, borderRadius: 0 }}
            className="!bg-transparent !p-4"
          >
            {question.code}
          </SyntaxHighlighter>
        </div>
      )}

      <motion.ul
        className="relative flex flex-col gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="pointer-events-none absolute inset-x-0 -top-2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        {question.answers.map((ans, i) => (
          <motion.li
            key={i}
            onClick={() => handleClick(i)}
            className="group/answer relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-xl border border-border/60 bg-background/70 px-3 py-2 text-primary transition-all duration-200 hover:-translate-y-[1px] hover:border-primary/50 hover:shadow-md"
            variants={answerVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-primary/0 via-primary/60 to-primary/0 opacity-0 transition-opacity duration-200 group-hover/answer:opacity-100" />
            <span className="flex-1 font-medium leading-tight">{ans}</span>
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground/80">tap</span>
          </motion.li>
        ))}
      </motion.ul>

      <div className="relative mt-1 flex items-center gap-2 text-sm text-muted-foreground">
        <Star className="h-4 w-4 text-yellow-400" />
        <span className="font-medium text-primary">{question.difficulty}</span>
        <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
        <span className="text-xs text-muted-foreground/80">Focus mode · минимализм</span>
      </div>
    </motion.div>
  )
}

export default QuestionCard
