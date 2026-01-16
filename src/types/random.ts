export interface RandomQuestion {
  question: string
  code: string | null
  codeLanguage: 'javascript' | 'typescript' | 'html' | 'css' | 'tsx' | 'csharp' | null
  answers: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
}
