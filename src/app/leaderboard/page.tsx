
import LeaderboardClient from '@/app/leaderboard/leaderBoardClient'
import { Suspense } from 'react'

export default function LeaderBoardPage() {
  return (
    <Suspense>
      <LeaderboardClient/>
    </Suspense>
  )
}
