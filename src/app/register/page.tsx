import RegisterClient from '@/app/register/registerClient'
import { Suspense } from 'react'

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterClient />
    </Suspense>
  )
}