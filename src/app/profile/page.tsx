import ProfileClient from '@/app/profile/profileClient'
import { Suspense } from 'react'

export default function ProfilePage() {
  return (
    <Suspense>
      <ProfileClient />
    </Suspense>
  )
}