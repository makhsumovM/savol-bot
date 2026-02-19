'use client'

import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import { getMyRank } from '@/api/my-rankApi'
import { getProfileApi } from '@/api/authApi'
import { IMyRank } from '@/types/my-rank'
import { IProfile } from '@/types/auth'
import { MyRankHeader } from '@/ui/my-rank/myRankHeader'
import { MyRankPageLayout } from '@/ui/my-rank/myRankPageLayout'
import { MyRankProfileCard } from '@/ui/my-rank/myRankProfileCard'

const MyRankClient = () => {
  const { t } = useTranslation()

  const {
    data: rankResponse,
    isPending: rankPending,
    isError: rankError,
  } = useQuery<IMyRank>({
    queryKey: ['my-rank'],
    queryFn: getMyRank,
    refetchOnWindowFocus: false,
  })

  const {
    data: profileData,
    isPending: profilePending,
    isError: profileError,
  } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: getProfileApi,
    refetchOnWindowFocus: false,
  })

  const isLoading = rankPending || profilePending
  const hasError = rankError || profileError || (rankResponse && rankResponse.statusCode !== 200)
  const hasData = rankResponse && profileData && rankResponse.statusCode === 200

  const rank = rankResponse?.data

  const rankNumber = Number(rank)
  const rankTone =
    rankNumber === 1
      ? 'text-yellow-400'
      : rankNumber === 2
        ? 'text-gray-300'
        : rankNumber === 3
          ? 'text-amber-500'
          : 'text-primary'

  return (
    <MyRankPageLayout>
      <MyRankHeader title={t('myRank.title')} />

      {isLoading && <Loading />}
      {hasError && <Error message={t('errors.leaderboardLoadError')} />}

      {hasData && rank !== undefined && profileData && (
        <MyRankProfileCard
          rank={rank}
          fullName={profileData.fullName}
          profilePicture={profileData.profilePicture}
          bestResult={profileData.bestResult}
          rankTone={rankTone}
          apiUrl={process.env.NEXT_PUBLIC_API_URL}
        />
      )}
    </MyRankPageLayout>
  )
}

export default MyRankClient