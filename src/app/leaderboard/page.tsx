'use client'

import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import { getLeaderboard } from '@/api/leaderboardApi'
import { ILeaderboard } from '@/types/leaderboard'
import { LeaderboardPageLayout } from '@/ui/leaderboard/leaderboardPageLayout'
import { LeaderboardHeader } from '@/ui/leaderboard/leaderboardHeader'
import { LeaderboardTopCards } from '@/ui/leaderboard/leaderboardTopCards'
import { LeaderboardTable } from '@/ui/leaderboard/leaderboardTable'
import { LeaderboardEmptyState } from '@/ui/leaderboard/leaderboardEmptyState'
import { getLatestDate, getTopByScore } from '@/ui/leaderboard/leaderboardUtils'

const LeaderboardPage = () => {
  const { t } = useTranslation()

  const { data, isLoading, isError } = useQuery<ILeaderboard[]>({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    refetchOnWindowFocus: false,
  })

  const topFrontend = getTopByScore(data, 'frontendScore')
  const topBackend = getTopByScore(data, 'backendScore')
  const topMobile = getTopByScore(data, 'mobdevScore')
  const latestDate = getLatestDate(data)

  return (
    <LeaderboardPageLayout>
      <LeaderboardHeader />

      {isLoading && <Loading />}
      {isError && <Error message={t('errors.leaderboardLoadError')} />}

      {data && (
        <div className="space-y-6 sm:space-y-7">
          <LeaderboardTopCards
            topFrontend={topFrontend}
            topBackend={topBackend}
            topMobile={topMobile}
            latestDate={latestDate}
          />
          <LeaderboardTable players={data} />
          {data.length === 0 && <LeaderboardEmptyState />}
        </div>
      )}
    </LeaderboardPageLayout>
  )
}

export default LeaderboardPage
