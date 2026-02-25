'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getProfileApi } from '@/api/authApi'
import { getMyRank } from '@/api/my-rankApi'
import { IProfile } from '@/types/auth'
import { IMyRank } from '@/types/my-rank'
import Error from '@/ui/common/error'
import Loading from '@/ui/common/loading'
import ChangePasswordModal from '@/ui/modals/changePasswordModal/modal'
import UpdateProfileModal from '@/ui/modals/updateProfileModal/modal'
import { ProfileBadges } from '@/ui/profile/profileBadges'
import { ProfileHero } from '@/ui/profile/profileHero'
import { ProfileOverviewCard } from '@/ui/profile/profileOverviewCard'

const ProfileClient = () => {
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false)
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false)
  const [fullname, setFullname] = useState<string>('')
  const { t } = useTranslation()

  const { data, isLoading, isError } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: getProfileApi,
    refetchOnWindowFocus: false,
  })

  const { data: myRankData } = useQuery<IMyRank>({
    queryKey: ['my-rank'],
    queryFn: getMyRank,
    refetchOnWindowFocus: false,
  })

  const totalScore =
    (data?.bestResult?.bestFrontendScore ?? 0) + (data?.bestResult?.bestBackendScore ?? 0)
  const myRank = myRankData?.statusCode === 200 ? myRankData.data : null
  const handleOpenUpdateProfile = (fullName: string) => {
    setFullname(fullName)
    setUpdateProfileModalOpen(true)
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative mx-auto max-w-[999px] px-4 sm:px-6 py-8 sm:py-10 md:py-12 space-y-7 sm:space-y-8">
        <ProfileHero />
        <ProfileBadges totalScore={totalScore} myRank={myRank} />

        {isLoading && <Loading />}
        {isError && <Error message={t('errors.profileLoadError')} />}

        {data && (
          <ProfileOverviewCard
            profile={data}
            rank={myRank}
            totalScore={totalScore}
            onOpenChangePassword={() => setChangePasswordModalOpen(true)}
            onOpenUpdateProfile={handleOpenUpdateProfile}
          />
        )}
      </div>

      <ChangePasswordModal
        changePasswordModalOpen={changePasswordModalOpen}
        setChangePasswordModalOpen={setChangePasswordModalOpen}
      />
      <UpdateProfileModal
        fullname={fullname}
        updateProfileModalOpen={updateProfileModalOpen}
        setUpdateProfileModalOpen={setUpdateProfileModalOpen}
      />
    </section>
  )
}

export default ProfileClient
