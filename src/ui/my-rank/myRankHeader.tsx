'use client'

import { motion } from 'framer-motion'

interface MyRankHeaderProps {
  title: string
}

export function MyRankHeader({ title }: MyRankHeaderProps) {
  const [firstWord = '', ...restWords] = title.split(' ')

  return (
    <motion.div
      className="flex flex-col items-center gap-3 text-center md:items-start md:text-left"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      data-aos="fade-up"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05]">
        <span className="text-primary">{firstWord}</span>
        {restWords.length > 0 && <span className="text-primary-2"> {restWords.join(' ')}</span>}
      </h1>
    </motion.div>
  )
}
