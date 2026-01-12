/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group/toggle-group'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ToggleGroup
      type="single"
      value={theme}
      className="
        flex gap-1 bg-card/80 backdrop-blur-lg rounded-lg p-1 border border-border/50 shadow-sm
        w-auto h-10
      "
    >
      <ToggleGroupItem
        value="light"
        onClick={() => setTheme('light')}
        className={`
          flex items-center justify-center rounded-md cursor-pointer transition-all duration-200
          ${
            theme === 'light'
              ? 'bg-linear-to-br from-yellow-300/20 to-yellow-500/20 text-yellow-600 shadow-sm'
              : 'text-muted-foreground hover:bg-yellow-200/10'
          }
        `}
        aria-label="Light mode"
      >
        <Sun className="w-4 h-4 sm:w-4 sm:h-4" />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="dark"
        onClick={() => setTheme('dark')}
        className={`
          flex items-center justify-center rounded-md cursor-pointer transition-all duration-200
          ${
            theme === 'dark'
              ? 'bg-linear-to-br from-purple-600/20 to-purple-900/20 text-purple-500 shadow-sm'
              : 'text-muted-foreground hover:bg-purple-200/10'
          }
        `}
        aria-label="Dark mode"
      >
        <Moon className="w-4 h-4 sm:w-4 sm:h-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
