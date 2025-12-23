"use client"

import { motion } from "framer-motion"

interface FocusRowProps {
  label: string
  delay: number
}

export function FocusRow({ label, delay }: FocusRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-3 group"
    >
      <motion.div
        className="h-2 w-2 rounded-full bg-primary"
        whileHover={{ scale: 1.5 }}
        transition={{ type: "spring", stiffness: 400 }}
      />
      <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </motion.div>
  )
}
