'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/ui/button/button'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => setTheme('light')} variant="outline" size="icon">
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all " />
      </Button>
      <Button onClick={() => setTheme('dark')} variant="outline" size="icon">
        <Moon  className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all " />
      </Button>
    </div>
  )
}
