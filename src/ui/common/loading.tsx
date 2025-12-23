"use client"

import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div className="flex min-h-96 items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="h-40 w-40 rounded-full bg-primary/20 blur-3xl animate-pulse-slow" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className="h-24 w-24 rounded-full border-[6px] border-transparent border-t-primary shadow-lg shadow-primary/40"
            style={{ borderTopColor: "rgb(245, 73, 0)" }}
          />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className="h-32 w-32 rounded-full border-[6px] border-transparent border-b-primary-2 shadow-lg shadow-primary-2/40"
            style={{ borderBottomColor: "oklch(0.75 0.20 185)" }}
          />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="h-3 w-3 rounded-full bg-primary shadow-xl" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Loading
