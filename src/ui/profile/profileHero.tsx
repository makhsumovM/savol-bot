'use client'

import { useTranslation } from 'react-i18next'

export function ProfileHero() {
  const { t } = useTranslation()
  const profileTitle = t('profile.title')
  const [profileFirstWord, ...profileRestWords] = profileTitle.split(' ')

  return (
    <div className="mb-4 flex flex-col items-center gap-4 text-center sm:mb-6">
      <h1 suppressHydrationWarning className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
        <span className="text-[#ec6216]">{profileFirstWord}</span>
        {profileRestWords.length > 0 && (
          <span className="text-[#13aeac]"> {profileRestWords.join(' ')}</span>
        )}
      </h1>
    </div>
  )
}
