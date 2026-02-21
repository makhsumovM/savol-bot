import { ReactNode } from 'react'

interface MyRankPageLayoutProps {
  children: ReactNode
}

export function MyRankPageLayout({ children }: MyRankPageLayoutProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10 md:py-14 space-y-8 sm:space-y-10">
        {children}
      </div>
    </section>
  )
}
