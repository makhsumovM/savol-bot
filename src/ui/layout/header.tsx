'use client'

import { ModeToggle } from '@/ui/common/modeToggle/modeToggle'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Gamepad, PlayCircle } from 'lucide-react'

const navLinks = [
  {
    href: '/marathon',
    icon: PlayCircle,
    label: 'Начать марафон',
  },
  {
    href: '/random',
    icon: Gamepad,
    label: 'Случайная игра',
  },
]

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-background/80 border-b border-border shadow-md"
    >
      <Link href="/">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary hover:text-primary/80 transition-colors duration-300">
          Savol-bot
        </h1>
      </Link>

      <nav className="flex gap-3 md:gap-4">
        {navLinks.map(({ href, icon: Icon, label }) => (
          <motion.div
            key={href}
            whileHover={{ scale: 1.05, y: -1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              href={href}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm md:text-base font-medium
                         bg-primary/5 hover:bg-primary/20 text-primary transition-all duration-300"
            >
              <Icon size={20} />
              {label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <ModeToggle />
    </motion.header>
  )
}

export default Header
