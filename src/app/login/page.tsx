import LoginClient from '@/app/login/loginClient'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <Suspense>
      <LoginClient />
    </Suspense>
  )
}