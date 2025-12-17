import {RandomQuestion} from '@/types/random'
import {motion} from 'framer-motion'
import {Code, Copy, Star, Verified} from 'lucide-react'
import {useState} from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneDark} from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface QuestionCardProps {
  question: RandomQuestion
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
  hidden: {opacity: 0, x: 20},
  show: {opacity: 1, x: 0},
}

const optionLabels = ['A', 'B', 'C', 'D']

const QuestionCardR = ({question, index, onAnswered}: QuestionCardProps) => {
  const [copied, setCopied] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  const handleClick = (ansIndex: number) => {
    if (answered) return
    setSelectedIndex(ansIndex)
    setAnswered(true)
    onAnswered?.(ansIndex === question.correctIndex)
  }

  const handleCopy = () => {
    if (question.code) {
      navigator.clipboard.writeText(question.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const getAnswerStyle = (i: number) => {
    if (!answered) return 'bg-card hover:bg-gray-100'
    if (i === question.correctIndex)
      return 'bg-green-500/20 text-green-600'
    if (i === selectedIndex)
      return 'bg-red-500/20 text-red-600'
    return 'opacity-60'
  }

  return (
    <motion.div
      className="border rounded-lg p-6 bg-card text-primary shadow-md flex flex-col gap-4"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -20}}
      transition={{duration: 0.4}}
    >
      <div className="flex items-center gap-2">
        <h2 className="text-lg md:text-xl font-semibold flex-1">
          {index + 1}. {question.question}
        </h2>
        {question.code && <Code className="w-5 h-5 text-muted-foreground" />}
      </div>

      {question.code && (
        <div className="relative">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            className="rounded-md"
          >
            {question.code}
          </SyntaxHighlighter>
          <button
            onClick={handleCopy}
            className={`absolute top-2 right-2 flex items-center gap-1 text-sm px-2 py-1 rounded ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 bg-opacity-50 text-white hover:bg-opacity-80'
            }`}
          >
            {copied ? <Verified className="w-4 h-4" /> :
              <Copy className="w-4 h-4" />}
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
            className={`cursor-pointer rounded-md px-3 py-2 flex items-center gap-3 transition-colors ${getAnswerStyle(i)}`}
            variants={answerVariants}
          >
            <span className="font-semibold text-muted-foreground">
              {optionLabels[i]})
            </span>
            <span>{ans}</span>
          </motion.li>
        ))}
      </motion.ul>

      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Star className="w-4 h-4 text-yellow-400" />
        {question.difficulty}
      </div>
    </motion.div>
  )
}

export default QuestionCardR
