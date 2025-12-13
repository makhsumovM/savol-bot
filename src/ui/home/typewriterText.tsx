'use client'

import { motion } from 'framer-motion'

type TypewriterProps = {
  text: string
  delay?: number
  speed?: number
  className?: string
}

export function Typewriter({ text, delay = 0, speed = 0.05, className }: TypewriterProps) {
  const characters = Array.from(text)

  return (
    <motion.span
      className={`inline-block overflow-hidden whitespace-pre-wrap ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: speed,
            delayChildren: delay,
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 1.2,
          },
        },
      }}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}
