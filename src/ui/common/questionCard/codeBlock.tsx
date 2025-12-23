"use client"

import ShikiHighlighter from "react-shiki"

interface CodeBlockProps {
  code: string
  language: string
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  return (
    <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg shadow-primary/10">
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-primary/10 to-transparent" />
      <ShikiHighlighter
        language={language}
        theme="dark-plus"
        showLanguage={false}
        className="
          rounded-2xl
          text-sm
          max-h-[400px]
          overflow-auto
          [&_pre]:whitespace-pre-wrap
          [&_pre]:leading-relaxed
          [&_pre]:p-6
          [&_.shiki]:!text-inherit
          [&_.shiki_span]:!color-inherit
        "
      >
        {code.trim()}
      </ShikiHighlighter>
    </div>
  )
}

export default CodeBlock