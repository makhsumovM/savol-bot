import { IUpdateProfile } from '@/types/auth'
import { motion } from 'framer-motion'
import FormInput from '@/ui/input/formInput'
import { Image, User } from 'lucide-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfileApi } from '@/api/authApi'
import { Button } from '@/ui/button/button'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

interface IUpdateProfileModalProps {
  fullname: string
  setFullname: React.Dispatch<React.SetStateAction<string>>
  updateProfileModalOpen: boolean
  setUpdateProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateProfileModal = ({
  setUpdateProfileModalOpen,
  fullname,
  setFullname,
  updateProfileModalOpen,
}: IUpdateProfileModalProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { control, handleSubmit, setValue } = useForm<IUpdateProfile>({
    defaultValues: {
      fullName: '',
    },
  })
  useEffect(() => {
    setValue('fullName', fullname)
  }, [fullname, setValue])

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      setUpdateProfileModalOpen(false)
      toast.success(t('updateProfileModal.success'))
    },
    onError: (error) => {
      console.error('Mutation error:', error)
      toast.error(t('errors.updateProfileError'))
    },
  })

  const onSubmit = (data: IUpdateProfile) => {
    const formData = new FormData()

    if (data.fullName?.trim()) {
      formData.append('fullName', data.fullName.trim())
    }

    if (data.profilePicture?.[0]) {
      formData.append('profilePicture', data.profilePicture[0])
    }

    mutate(formData)
  }

  if (!updateProfileModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-card/80 backdrop-blur-xl shadow-2xl"
      >

        <div className="relative p-6 sm:p-8">
          <h2 className="text-2xl font-black text-center mb-6 text-primary-2">
            {t('updateProfileModal.title')}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              control={control}
              label={t('updateProfileModal.fields.fullName.label')}
              name="fullName"
              placeholder={t('updateProfileModal.fields.fullName.placeholder')}
              type="text"
              icon={User}
            />

            <FormInput
              control={control}
              name="profilePicture"
              label={t('updateProfileModal.fields.profilePicture.label')}
              type="file"
              accept="image/*"
              icon={Image}
            />

            <div className="flex gap-3 mt-8 pt-2">
              <Button
                type="button"
                onClick={() => setUpdateProfileModalOpen(false)}
                variant="outline"
                className="flex-1"
              >
                {t('updateProfileModal.buttons.cancel')}
              </Button>

              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-primary text-white border-0 hover:opacity-90 transition-opacity"
              >
                {isPending
                  ? t('updateProfileModal.buttons.updating')
                  : t('updateProfileModal.buttons.update')}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default UpdateProfileModal
