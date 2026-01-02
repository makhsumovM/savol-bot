import { changePasswordApi } from '@/api/authApi'
import { IChangePassword } from '@/types/auth'
import FormInput from '@/ui/input/formInput'
import { Button } from '@/ui/button/button'
import { useMutation } from '@tanstack/react-query'
import { Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

interface IChangePasswordModalProps {
  changePasswordModalOpen: boolean
  setChangePasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePasswordModal = ({
  changePasswordModalOpen,
  setChangePasswordModalOpen,
}: IChangePasswordModalProps) => {
  const { t } = useTranslation()

  const { mutate } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      setChangePasswordModalOpen(false)
      toast.success(t('changePasswordModal.success'))
    },
    onError: () => {
      toast.error(t('errors.changePasswordError'))
    },
  })

  const { control, handleSubmit } = useForm<IChangePassword>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: IChangePassword) => {
    mutate(data)
  }

  if (!changePasswordModalOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">{t('changePasswordModal.title')}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormInput
            name="currentPassword"
            control={control}
            label={t('changePasswordModal.fields.currentPassword.label')}
            placeholder={t('changePasswordModal.fields.currentPassword.placeholder')}
            type="password"
            icon={Lock}
          />

          <FormInput
            name="newPassword"
            control={control}
            label={t('changePasswordModal.fields.newPassword.label')}
            placeholder={t('changePasswordModal.fields.newPassword.placeholder')}
            type="password"
            icon={Lock}
          />

          <FormInput
            name="confirmPassword"
            control={control}
            label={t('changePasswordModal.fields.confirmPassword.label')}
            placeholder={t('changePasswordModal.fields.confirmPassword.placeholder')}
            type="password"
            icon={Lock}
          />

          <div className="flex gap-3 mt-8 justify-end">
            <Button
              type="button"
              onClick={() => setChangePasswordModalOpen(false)}
              variant="outline"
            >
              {t('changePasswordModal.buttons.cancel')}
            </Button>

            <Button type="submit">{t('changePasswordModal.buttons.change')}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordModal
