"use client"

import { motion } from "framer-motion"

interface LoadingProps {
  variant?: "small" | "large"
}

const Loading = ({ variant = "large" }: LoadingProps) => {
  const sizeClasses =
    variant === "large"
      ? {
          outer: "h-32 w-32 sm:h-40 sm:w-40 md:h-56 md:w-56",
          ring1: "h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40",
          ring2: "h-28 w-28 sm:h-36 sm:w-36 md:h-48 md:w-48",
          dot: "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6",
        }
      : {
          outer: "h-14 w-14 sm:h-18 sm:w-18 md:h-20 md:w-20",
          ring1: "h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14",
          ring2: "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16",
          dot: "h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5",
        }

  return (
    <div className="flex min-h-32 items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div
          className={`${sizeClasses.outer} rounded-full bg-primary/20 blur-3xl animate-pulse-slow`}
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className={`${sizeClasses.ring1} rounded-full border-4 border-transparent shadow-md shadow-primary/40`}
            style={{ borderTopColor: "rgb(245, 73, 0)" }}
          />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className={`${sizeClasses.ring2} rounded-full border-4 border-transparent shadow-md shadow-primary-2/40`}
            style={{ borderBottomColor: "oklch(0.75 0.20 185)" }}
          />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className={`${sizeClasses.dot} rounded-full bg-primary shadow`} />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Loading