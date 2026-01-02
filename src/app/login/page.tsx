'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { LoginSchema } from '@/schemas/auth'
import { ILogin } from '@/types/auth'
import { loginApi } from '@/api/authApi'
import FormInput from '@/ui/input/formInput'
import { Button } from '@/ui/button/button'
import { setCookie } from '@/lib/utils/cookies'

const LoginPage = () => {
  const { t } = useTranslation()
  const { mutate, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setCookie({ token: data.data.accessToken })
      setCookie({ token: data.data.refreshToken, key: 'refreshToken' })
      toast.success(t('login.loginSuccess'))
      setTimeout(() => {
        window.location.href = '/'
      }, 500)
    },
    onError: () => {
      toast.error(t('login.loginFailed'))
    },
  })

  const { control, handleSubmit } = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (data: ILogin) => mutate(data)

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
            {t('login.title')}
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight bg-linear-to-r from-primary to-primary-2 bg-clip-text text-transparent">
            {t('app.name')}
          </h1>
        </motion.div>

        <div className="mb-6 text-center text-sm sm:text-base text-muted-foreground">
          {t('login.subtitle')}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="email"
            control={control}
            label={t('login.emailLabel')}
            placeholder={t('login.emailPlaceholder')}
            type="email"
          />
          <FormInput
            name="password"
            control={control}
            label={t('login.passwordLabel')}
            placeholder={t('login.passwordPlaceholder')}
            type="password"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 rounded-xl text-base sm:text-lg font-semibold"
          >
            {isPending ? t('login.signingIn') : t('login.loginButton')}
          </Button>
        </form>

        <div className="mt-4 text-sm sm:text-base text-muted-foreground text-center">
          <Link href="/register" className="text-primary hover:underline">
            {t('login.createAccount')}
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

export default LoginPage
