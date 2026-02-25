'use client'

import { getReviewApi } from '@/api/reviewApi'
import { getCookie } from '@/lib/utils/cookies'
import { IReviewResponse } from '@/types/review'
import { Button } from '@/ui/button/button'
import ReviewCard from '@/ui/home/review/reviewCard'
import CreateReviewModal from '@/ui/modals/createReviewModal/modal'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, Variants } from 'framer-motion'
import { MessageCircle, Sparkles, Star } from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const ReviewSection = () => {
  const { t } = useTranslation()

  const { data: reviewsData, isPending } = useQuery<IReviewResponse>({
    queryKey: ['reviews'],
    queryFn: getReviewApi,
  })

  const name = t('home.reviews.title')
  const normalizedName = name.replace(/([a-z])([A-Z])/g, '$1 $2')
  const brandWords = normalizedName.split(/\s+/).filter(Boolean)

  const jwt = getCookie('token')
  const router = useRouter()
  const [createReviewModalOpen, setCreateReviewModalOpen] = useState(false)

  const reviews = reviewsData?.data || []

  return (
    <section className="relative py-12 overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 items-center justify-items-center gap-10 mb-20 text-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-2 backdrop-blur-xl"
          >
            <motion.div
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.div>

            <span className="text-xs font-semibold tracking-wide text-primary sm:text-sm">
              {t('home.reviews.badge')}
            </span>
          </motion.div>

          <div className="max-w-3xl space-y-6">
            <motion.h1
              variants={fadeUp}
              className="text-5xl font-black tracking-tight flex flex-wrap justify-center gap-x-3 gap-y-2 sm:text-6xl lg:text-7xl"
            >
              {brandWords.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={index % 2 === 0 ? 'text-primary' : 'text-primary-2'}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl font-semibold text-foreground/55 sm:text-xl"
            >
              {t('home.reviews.subtitle')}
            </motion.p>
          </div>
        </motion.div>

        {isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-3xl bg-card/20 animate-pulse border border-white/5"
              />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {reviews.map((element) => (
              <ReviewCard key={element.id} {...element} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 rounded-3xl border-2 border-dashed border-white/5 bg-card/5"
          >
            <div className="p-4 rounded-full bg-primary/5 text-primary/40 mb-4">
              <Star size={48} />
            </div>
            <p className="text-muted-foreground text-lg">{t('home.reviews.empty')}</p>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex justify-center mt-12"
      >
        <Button
          onClick={() => {
            if (!jwt) {
              router.push('/login')
            } else {
              setCreateReviewModalOpen(true)
            }
          }}
          size="lg"
          className="rounded-2xl px-8 h-14 bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          {t('home.reviews.addReview')}
        </Button>
      </motion.div>

      <CreateReviewModal
        createReviewModalOpen={createReviewModalOpen}
        setCreateReviewModalOpen={setCreateReviewModalOpen}
      />
    </section >
  )
}

export default ReviewSection
