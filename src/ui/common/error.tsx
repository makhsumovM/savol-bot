"use client"

import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface IErrorProps {
  message: string
}

const Error = ({ message }: IErrorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
      className="relative mx-auto max-w-md overflow-hidden rounded-3xl border-2 border-destructive/40 bg-gradient-to-br from-destructive/10 via-destructive/5 to-transparent backdrop-blur-xl shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-orange-500/10 to-transparent blur-2xl animate-pulse-slow" />

      <div className="relative flex items-center gap-5 p-8">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-destructive/20 ring-4 ring-destructive/30"
        >
          <AlertCircle className="h-9 w-9 text-destructive drop-shadow-lg" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-black text-foreground tracking-tight leading-relaxed"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default Error
