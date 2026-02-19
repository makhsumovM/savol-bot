import MarathonClient from '@/app/marathon/marathonClient'
import { Suspense } from 'react'

export default function MarathonPage() {
  return (
    <Suspense>
      <MarathonClient />
    </Suspense>
  )
}