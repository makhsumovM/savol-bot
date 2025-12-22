'use client'

import { useTheme } from 'next-themes'
import ShikiHighlighter from 'react-shiki'

interface CodeBlockProps {
  code: string
  language: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const { theme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <div
      className="
        relative rounded-xl overflow-hidden
        border border-slate-200 dark:border-white/10
        bg-slate-50 dark:bg-[#1e1f24]
      "
    >
      <ShikiHighlighter
        language={language}
        theme={isDark ? 'dark-plus' : 'github-light'}
        showLanguage={false}
        className="
          text-sm
          max-h-[400px]
          overflow-auto
          [&_pre]:whitespace-pre-wrap
          [&_pre]:leading-relaxed
          [&_pre]:p-4
        "
      >
        {code.trim()}
      </ShikiHighlighter>
    </div>
  )
}
