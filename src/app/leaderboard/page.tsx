

import LeaderboardClient from '@/app/leaderboard/leaderboardClient'
import { Suspense } from 'react'

export default function LeaderBoardPage() {
  return (
    <Suspense>
      <LeaderboardClient/>
    </Suspense>
  )
}
