import { AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface IErrorProps {
  message: string
}

const Error = ({ message }: IErrorProps) => {
  return (
    <motion.div
      className="flex items-center gap-3 bg-destructive/10 text-destructive border border-destructive/30 rounded-lg p-4 max-w-md mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <AlertCircle className="w-6 h-6" />
      </motion.div>
      <motion.p
        className="text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {message}
      </motion.p>
    </motion.div>
  )
}

export default Error
