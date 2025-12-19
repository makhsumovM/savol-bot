'use client'

import ShikiHighlighter from 'react-shiki'

interface CodeBlockProps {
  code: string
  language: string
}

const CodeBlock = ({ code, language  }: CodeBlockProps) => {
  return (
    <div className="relative">
      <ShikiHighlighter
        language={language}
        theme="dark-plus"
        showLanguage={false}
        className="
          rounded-xl
          text-sm
          max-h-[400px]
          overflow-auto
          [&_pre]:whitespace-pre-wrap
          [&_pre]:leading-relaxed
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
