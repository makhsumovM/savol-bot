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

const ProfilePage = () => {
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
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute -top-40 -right-40 h-80 w-[320px] sm:h-[460px] sm:w-[460px] rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 h-[300px] w-[300px] sm:h-[440px] sm:w-[440px] rounded-full bg-secondary/15 blur-[100px]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-10 md:py-12 space-y-7 sm:space-y-8">
        <ProfileHero />
        <ProfileBadges totalScore={totalScore} myRank={myRank} />

        {isLoading && <Loading />}
        {isError && <Error message={t('errors.profileLoadError')} />}

        {data && (
          <ProfileOverviewCard
            profile={data}
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

export default ProfilePage
