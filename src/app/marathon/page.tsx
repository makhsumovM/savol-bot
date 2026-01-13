import MarathonClient from '@/app/marathon/marathonClient.tsx'
import { Suspense } from 'react'

export default function MarathonPage() {
  return (
    <Suspense>
      <MarathonClient />
    </Suspense>
  )
}
