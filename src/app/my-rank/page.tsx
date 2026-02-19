import MyRankClient from '@/app/my-rank/myRankClient'
import { Suspense } from 'react'

export default function MyRankPage() {
  return (
    <Suspense>
      <MyRankClient />
    </Suspense>
  )
}