

import { Suspense } from 'react'
import LeaderboardClient from "@/app/leaderboard/leaderBoardClient";

export default function LeaderBoardPage() {
  return (
    <Suspense>
      <LeaderboardClient/>
    </Suspense>
  )
}
