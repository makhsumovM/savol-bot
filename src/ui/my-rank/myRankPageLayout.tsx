import { ReactNode } from 'react'

interface MyRankPageLayoutProps {
  children: ReactNode
}

export function MyRankPageLayout({ children }: MyRankPageLayoutProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.035] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border/40 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 h-80 w-[320px] sm:h-[460px] sm:w-[460px] rounded-full bg-primary/20 blur-[110px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-[300px] w-[300px] sm:h-[440px] sm:w-[440px] rounded-full bg-secondary/15 blur-[110px] animate-pulse-slow" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10 md:py-14 space-y-8 sm:space-y-10">
        {children}
      </div>
    </section>
  )
}