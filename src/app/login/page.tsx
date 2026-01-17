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
import { Lock, User, LogIn } from 'lucide-react'

const LoginPage = () => {
  const { t } = useTranslation()
  const { mutate, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setCookie({ token: data.data.accessToken })
      setCookie({
        token: data.data.refreshToken,
        key: 'refreshToken',
      })
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-12 px-4">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

      <div className="absolute -top-40 -right-40 h-80 w-80 sm:h-[500px] sm:w-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
      <div
        className="absolute -bottom-40 -left-40 h-72 w-72 sm:h-[450px] sm:w-[450px] rounded-full bg-primary-2/20 blur-[120px] animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px] animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <LogIn className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('login.title')}</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4">
            <span className="text-primary">Skill</span>
            <span className="text-primary-2">Check</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto"
          >
            {t('login.subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border/40 bg-card/50 backdrop-blur-xl shadow-2xl p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              icon={User}
              name="email"
              control={control}
              label={t('login.emailLabel')}
              placeholder={t('login.emailPlaceholder')}
              type="email"
            />
            <FormInput
              icon={Lock}
              name="password"
              control={control}
              label={t('login.passwordLabel')}
              placeholder={t('login.passwordPlaceholder')}
              type="password"
            />
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-2xl text-base sm:text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 active:scale-[0.98]"
            >
              {isPending ? t('login.signingIn') : t('login.loginButton')}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/40 text-center">
            <p className="text-sm text-muted-foreground">
              {t('login.footer.text')}{' '}
              <Link
                href="/register"
                className="text-primary-2 font-semibold hover:text-primary-2/80 transition-colors"
              >
                {t('login.footer.linkText')}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LoginPage
