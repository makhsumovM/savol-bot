'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Typewriter } from '@/ui/home/typewriterText'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] rounded-full bg-primary/20 blur-[120px] " />
      <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] rounded-full bg-secondary/15 blur-[120px] " />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-28 md:py-32 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-8 sm:space-y-10"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-8xl sm:text-9xl md:text-[160px] font-black tracking-tighter leading-none"
          >
            <span style={{ color: 'rgb(245, 73, 0)' }}>4</span>
            <span className="text-foreground/20">0</span>
            <span style={{ color: 'oklch(0.75 0.20 185)' }}>4</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              {t('notfound.title')}
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              <Typewriter text={t('notfound.description')} delay={0.8} speed={0.03} />
            </p>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="
                  flex items-center justify-center gap-3
                  px-8 py-4
                  rounded-xl
                  text-base sm:text-lg font-semibold
                  bg-primary text-white
                  shadow-lg shadow-primary/30
                  hover:bg-primary/90
                  transition-all duration-300
                "
              >
                <Home size={24} />
                <span>{t('notfound.home')}</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => window.history.back()}
                className="
                  flex items-center justify-center gap-2
                  px-6 py-4
                  rounded-xl
                  text-base sm:text-lg font-medium
                  bg-card border border-border/80
                  text-foreground
                  hover:border-primary/60 hover:bg-primary/5
                  transition-all duration-300
                "
              >
                <ArrowLeft size={20} />
                <span>{t('notfound.back')}</span>
              </button>
            </motion.div>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0 }}
            transition={{ delay: 1.8 }}
            className="text-sm text-muted-foreground/70 mt-12"
          >
            <Typewriter text={t('notfound.hint')} delay={1.8} speed={0.03} />
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
