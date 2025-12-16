"use client"

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group/toggle-group'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = (mode: "light" | "dark") => setTheme(mode)

  return (
    <ToggleGroup
      type="single"
      className="flex gap-1 bg-card/80 backdrop-blur-xl rounded-xl p-[4px] border border-border/50 shadow-sm"
    >
      <ToggleGroupItem
        value="light"
        onClick={() => toggleTheme("light")}
        className={`
          flex items-center justify-center  rounded-lg cursor-pointer transition-all duration-300
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
        onClick={() => toggleTheme("dark")}
        className={`
          flex items-center justify-center  rounded-lg cursor-pointer transition-all duration-300
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
