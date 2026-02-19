import RandomClient from '@/app/random/randomClient'
import { Suspense } from 'react'

export default function RandomPage() {
  return (
    <Suspense>
      <RandomClient />
    </Suspense>
  )
}