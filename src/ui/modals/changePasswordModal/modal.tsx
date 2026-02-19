import { changePasswordApi } from '@/api/authApi'
import { IChangePassword } from '@/types/auth'
import FormInput from '@/ui/input/formInput'
import { Button } from '@/ui/button/button'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-card/80 backdrop-blur-xl shadow-2xl"
      >

        <div className="relative p-6 sm:p-8">
          <h2 className="text-2xl font-black text-center mb-6 text-primary-2  ">
            {t('changePasswordModal.title')}
          </h2>

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

            <div className="flex gap-3 mt-8 pt-2">
              <Button
                type="button"
                onClick={() => setChangePasswordModalOpen(false)}
                variant="outline"
                className="flex-1"
              >
                {t('changePasswordModal.buttons.cancel')}
              </Button>

              <Button
                type="submit"

                className="flex-1 bg-primary text-white border-0 hover:opacity-90 transition-opacity"
              >
                {t('changePasswordModal.buttons.change')}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default ChangePasswordModal