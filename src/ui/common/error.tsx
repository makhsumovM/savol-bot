"use client"

import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface IErrorProps {
  message: string
}

const Error = ({ message }: IErrorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 180 }}
      className="relative mx-auto max-w-sm overflow-hidden rounded-2xl border border-destructive/30 bg-linear-to-br from-destructive/10 via-destructive/5 to-transparent backdrop-blur-md shadow-lg"
    >
      <div className="absolute inset-0 bg-linear-to-br from-red-500/15 via-orange-500/5 to-transparent blur-xl animate-pulse-slow" />

      <div className="relative flex items-center gap-4 p-4">
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, 4, -4, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/20 ring-2 ring-destructive/30"
        >
          <AlertCircle className="h-6 w-6 text-destructive drop-shadow-md" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="text-base font-bold text-foreground tracking-tight leading-snug"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default Error
