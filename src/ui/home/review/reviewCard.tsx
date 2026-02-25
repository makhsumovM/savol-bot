import { IReview } from '@/types/review'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils/shadUtils'

const ReviewCard = ({ createdAt, rating, text, userFullName, userProfilePicture }: IReview) => {
  const date = new Date(createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.015 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="group relative flex flex-col h-full p-9 rounded-3xl bg-linear-to-br from-card/70 to-card/40 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/10 hover:border-primary/50 hover:shadow-primary/10 transition-all duration-700 overflow-hidden"
    >
      <div className="absolute -top-1 -right-1 text-primary/5 group-hover:text-primary/10 transition-all duration-700">
        <Quote size={92} strokeWidth={0.6} fill="currentColor" />
      </div>

      <div className="flex items-center gap-5 mb-8 relative z-10">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-linear-to-br from-primary/20 to-primary-3/20 p-0.5 shadow-inner">
          <div className="h-full w-full rounded-[14px] overflow-hidden bg-card/90 backdrop-blur-md ring-1 ring-white/10">
            {userProfilePicture ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_SITE_URL}${userProfilePicture}`}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                alt={userFullName}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-primary text-3xl font-black tracking-tighter">
                {userFullName?.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-black text-2xl tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
            {userFullName}
          </span>
          <span className="text-sm font-medium text-muted-foreground/70 uppercase tracking-[2px]">
            {date}
          </span>
        </div>
      </div>

      <div className="flex gap-1 mb-8 relative z-10">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={22}
            className={cn(
              'transition-all duration-500',
              i < rating
                ? 'text-primary fill-primary drop-shadow-sm group-hover:drop-shadow-[0_0_12px_rgba(245,73,0,0.6)]'
                : 'text-muted-foreground/30',
            )}
          />
        ))}
      </div>

      <div className="grow relative z-10">
        <p className="text-[17px] leading-relaxed text-foreground/90 font-medium italic tracking-[-0.2px]">
          &quot;{text}&quot;
        </p>
      </div>

      <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mt-10" />
    </motion.div>
  )
}

export default ReviewCard
