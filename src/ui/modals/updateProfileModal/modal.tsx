import { IUpdateProfile } from '@/types/auth'
import FormInput from '@/ui/input/formInput'
import { Image, User } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfileApi } from '@/api/authApi'
import { Button } from '@/ui/button/button'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

interface IUpdateProfileModalProps {
  updateProfileModalOpen: boolean
  setUpdateProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateProfileModal = ({
  setUpdateProfileModalOpen,
  updateProfileModalOpen,
}: IUpdateProfileModalProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { control, handleSubmit } = useForm<IUpdateProfile>({
    defaultValues: {
      fullName: '',
    },
  })

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          {t('updateProfileModal.title')}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="flex gap-2 mt-6 justify-end">
            <Button
              type="button"
              onClick={() => setUpdateProfileModalOpen(false)}
              variant="outline"
            >
              {t('updateProfileModal.buttons.cancel')}
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending
                ? t('updateProfileModal.buttons.updating')
                : t('updateProfileModal.buttons.update')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfileModal
