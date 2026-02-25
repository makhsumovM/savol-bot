import { Button } from '@/ui/button/button'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, X, MessageSquare, Send, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { ICreateReview } from '@/types/review'
import { createReviewApi } from '@/api/reviewApi'
import { cn } from '@/lib/utils/shadUtils'

interface ICreateReviewModalResponse {
  createReviewModalOpen: boolean
  setCreateReviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateReviewModal = ({
  createReviewModalOpen,
  setCreateReviewModalOpen,
}: ICreateReviewModalResponse) => {
  const queryClient = useQueryClient()
  const [hoveredRating, setHoveredRating] = useState(0)

  const { control, handleSubmit, reset, setValue, watch } = useForm<ICreateReview>({
    defaultValues: {
      text: '',
      rating: 5,
    },
  })

  const rating = watch('rating')
  const { t } = useTranslation()

  const { mutate, isPending } = useMutation({
    mutationFn: createReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      setCreateReviewModalOpen(false)
      toast.success(t('createReview.success'))
      reset()
    },
    onError: (error) => {
      console.error('Mutation error:', error)
      toast.error(t('errors.updateProfileError'))
    },
  })

  const onSubmit = (data: ICreateReview) => {
    if (!data.text.trim()) {
      toast.error(t('createReview.errors.textRequired'))
      return
    }
    mutate(data)
  }

  return (
    <AnimatePresence>
      {createReviewModalOpen && (
        <div className="fixed inset-0 z-52220 top-20 flex items-center justify-center p-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCreateReviewModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-card/80 backdrop-blur-xl shadow-2xl"
          >
            <div className="relative p-6 sm:p-7">
              <button
                onClick={() => setCreateReviewModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all"
              >
                <X size={18} />
              </button>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-black tracking-tight text-foreground">
                  {t('createReview.title')}
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">{t('createReview.subtitle')}</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/70 block text-center">
                    {t('createReview.fields.rating.label')}
                  </label>

                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setValue('rating', star)}
                        className="p-1"
                      >
                        <Star
                          size={34}
                          className={cn(
                            'transition-all duration-300',
                            (hoveredRating || rating) >= star
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground/20',
                          )}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-primary/70 block">
                    {t('createReview.fields.text.label')}
                  </label>

                  <Controller
                    name="text"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        placeholder={t('createReview.fields.text.placeholder')}
                        className="w-full h-24 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none text-foreground placeholder:text-muted-foreground/40 text-sm"
                      />
                    )}
                  />
                </div>

                <div className="flex gap-3 ">
                  <Button
                    type="button"
                    onClick={() => setCreateReviewModalOpen(false)}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                  >
                    {t('createReview.buttons.cancel')}
                  </Button>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 h-12 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-sm">{t('createReview.buttons.updating')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send size={16} />
                        <span className="text-sm">{t('createReview.buttons.update')}</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CreateReviewModal
