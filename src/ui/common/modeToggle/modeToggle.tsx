'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/ui/toggle-group/toggle-group'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ToggleGroup
      type="single"
      value={theme}
      className="flex gap-1 bg-card/80 backdrop-blur-xl rounded-xl p-1 border border-border/50 shadow-sm"
    >
      <ToggleGroupItem
        value="light"
        onClick={() => setTheme('light')}
        className={`
          flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300
          ${theme === 'light'
            ? 'bg-linear-to-br from-yellow-300/30 to-yellow-500/30 text-yellow-600 shadow-md'
            : 'text-muted-foreground hover:bg-yellow-200/10'}
        `}
        aria-label="Light mode"
      >
        <Sun className="w-6 h-6" />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="dark"
        onClick={() => setTheme('dark')}
        className={`
          flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300
          ${theme === 'dark'
            ? 'bg-linear-to-br from-purple-600/30 to-purple-900/30 text-purple-500 shadow-md'
            : 'text-muted-foreground hover:bg-purple-200/10'}
        `}
        aria-label="Dark mode"
      >
        <Moon className="w-6 h-6" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
