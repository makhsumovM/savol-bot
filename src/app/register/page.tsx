'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { toast } from 'sonner'

import { RegisterSchema } from '@/schemas/auth'
import { IRegister } from '@/types/auth'
import { registerApi } from '@/api/authApi'

import FormInput from '@/ui/input/formInput'
import { Button } from '@/ui/button/button'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success('Account created successfully')
      router.push('/login')
    },
    onError: () => {
      toast.error('Account creation failed')
    },
  })

  const { control, handleSubmit } = useForm<IRegister>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: IRegister) => {
    mutate(data)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* анимированные фоны */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary-2/15 blur-[120px] animate-pulse-slow" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="
          relative z-10
          w-full max-w-md
          rounded-3xl
          border border-border/50
          bg-card/90 backdrop-blur-xl
          shadow-xl
          p-6 sm:p-8
        "
      >
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-center"
        >
          <h1 suppressHydrationWarning className="text-4xl sm:text-5xl font-black tracking-tight">
            <span className="text-primary">Skill</span>
            <span className="text-primary-2">Check</span>
          </h1>
        </motion.div>

        <div className="mb-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Create your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            name="fullName"
            control={control}
            label="Full name"
            placeholder="Full Name"
            type="text"
          />

          <FormInput
            name="email"
            control={control}
            label="Email"
            placeholder="you@example.com"
            type="email"
          />

          <FormInput
            name="password"
            control={control}
            label="Password"
            placeholder="••••••••"
            type="password"
          />

          <Button type="submit" disabled={isPending} className="w-full h-11 rounded-xl text-base">
            {isPending ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Already have an account?</span>{' '}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

export default RegisterPage
