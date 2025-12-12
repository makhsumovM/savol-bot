import { MarathonQuestion } from '@/types/marathon'
import { Code, Star, Copy, Verified } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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
      className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-primary/10 bg-card/80 p-6 text-primary shadow-[0_10px_60px_-45px_rgba(0,0,0,0.4)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/0" />

      <div className="flex items-center gap-2">
        <h2 className="flex-1 text-lg font-semibold md:text-xl">
          {index + 1}. {question.question}
        </h2>
        {question.code && <Code className="h-5 w-5 text-muted-foreground" />}
      </div>

      {question.code && (
        <div className="relative rounded-xl border border-primary/10 bg-muted/40">
          <SyntaxHighlighter language="javascript" style={oneDark} className="rounded-xl !bg-transparent !p-4">
            {question.code}
          </SyntaxHighlighter>

          <button
            onClick={handleCopy}
            className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm transition hover:text-primary"
          >
            {copied ? <Verified className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Скопировано' : 'Скопировать'}
          </button>
        </div>
      )}

      <motion.ul
        className="flex flex-col gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {question.answers.map((ans, i) => (
          <motion.li
            key={i}
            onClick={() => handleClick(i)}
            className="group/answer flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            variants={answerVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="h-2 w-2 rounded-full bg-primary/30 transition group-hover/answer:bg-primary" />
            {ans}
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-1 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Star className="h-4 w-4 text-yellow-400" />
        {question.difficulty}
      </div>
    </motion.div>
  )
}

export default QuestionCard
