'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group/toggle-group'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return (
    <ToggleGroup
      type="single"
      className="flex  gap-2 bg-card/50 backdrop-blur rounded-lg p-[2px] border border-border"
    >
      <ToggleGroupItem
        value="light"
        onClick={toggleTheme}
        className={`flex items-center justify-center p-1.5 rounded-md cursor-pointer transition-all duration-300
          ${
            theme === 'light'
              ? 'bg-primary/20 text-primary'
              : 'text-muted-foreground hover:bg-primary/10'
          }`}
        aria-label="Light mode"
      >
        <Sun className="h-5 w-5" />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="dark"
        onClick={toggleTheme}
        className={`flex items-center justify-center p-1.5 rounded-md cursor-pointer transition-all duration-300
          ${
            theme === 'dark'
              ? 'bg-primary/20 text-primary'
              : 'text-muted-foreground hover:bg-primary/10'
          }`}
        aria-label="Dark mode"
      >
        <Moon className="h-5 w-5" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
