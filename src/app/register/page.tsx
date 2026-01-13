'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { RegisterSchema } from '@/schemas/auth'
import { IRegister } from '@/types/auth'
import { registerApi } from '@/api/authApi'
import FormInput from '@/ui/input/formInput'
import { Button } from '@/ui/button/button'
import { useRouter } from 'next/navigation'
import { Lock, Mail, User } from 'lucide-react'

const RegisterPage = () => {
  const { t } = useTranslation()
  const appName = t('app.name')
  const [appFirstWord, ...appRestWords] = appName.split(' ')
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success(t('register.toasts.success'))
      router.push('/login')
    },
    onError: () => {
      toast.error(t('register.toasts.error'))
    },
  })

  const { control, handleSubmit } = useForm<IRegister>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  })

  const onSubmit = (data: IRegister) => mutate(data)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary-2/15 blur-[120px] animate-pulse-slow" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-border/50 bg-card/90 backdrop-blur-xl shadow-xl p-6 sm:p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-center flex flex-col items-center gap-2"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-primary">
            {t('register.title')}
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
            <span className="text-[#ec6216]">{appFirstWord}</span>
            {appRestWords.length > 0 && (
              <span className="text-[#13aeac]"> {appRestWords.join(' ')}</span>
            )}
          </h1>
        </motion.div>

        <div className="mb-6 text-center text-sm sm:text-base text-muted-foreground">
          {t('register.subtitle')}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            icon={User}
            name="fullName"
            control={control}
            label={t('register.form.fields.fullName.label')}
            placeholder={t('register.form.fields.fullName.placeholder')}
            type="text"
          />
          <FormInput
            icon={Mail}
            name="email"
            control={control}
            label={t('register.form.fields.email.label')}
            placeholder={t('register.form.fields.email.placeholder')}
            type="email"
          />
          <FormInput
            icon={Lock}
            name="password"
            control={control}
            label={t('register.form.fields.password.label')}
            placeholder={t('register.form.fields.password.placeholder')}
            type="password"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 rounded-xl text-base sm:text-lg font-semibold"
          >
            {isPending
              ? t('register.form.submitButton.loading')
              : t('register.form.submitButton.default')}
          </Button>
        </form>

        <div className="mt-4 text-sm sm:text-base text-muted-foreground text-center">
          <Link href="/login" className="text-primary hover:underline">
            {t('register.footer.linkText')}
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

export default RegisterPage
