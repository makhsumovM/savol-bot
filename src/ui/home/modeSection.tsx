import { ModeCards } from '@/ui/home/modeCards'
import { useTranslation } from 'react-i18next'

const ModeSection = () => {
  const { t } = useTranslation()
  const modes = [
    {
      id: 'marathon',
      title: t('modes.marathon.title'),
      badge: t('modes.marathon.badge'),
      desc: t('modes.marathon.description'),
    },
    {
      id: 'random',
      title: t('modes.random.title'),
      badge: t('modes.random.badge'),
      desc: t('modes.random.description'),
    },
    {
      id: 'coding',
      title: t('modes.coding.title'),
      badge: t('modes.coding.badge'),
      desc: t('modes.coding.description'),
    },
  ]
  const title = t('home.modes.title')
  const normalizedName = title.replace(/([a-z])([A-Z])/g, '$1 $2')
  const titleWords = normalizedName.split(/\s+/).filter(Boolean)
  return (
    <section className="relative pb-20">
      <div className="text-4xl flex items-center justify-center gap-2 font-bold tracking-tight sm:text-5xl">
        {titleWords.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={index % 2 === 0 ? 'text-primary' : 'text-primary-2'}
          >
            {word}
          </span>
        ))}

      </div>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          {t('home.modes.subtitle')}
        </p>
      <ModeCards modes={modes} />
    </section>
  )
}

export default ModeSection
