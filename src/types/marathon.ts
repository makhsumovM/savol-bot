export interface MarathonQuestion {
  question: string
  code: string | null
  codeLanguage: 'javascript' | 'typescript' | 'tsx' | 'jsx' | 'css' | 'html' | null
  answers: string[]
  correctIndex: number
  difficulty: 'easy' | 'medium' | 'hard' | 'very-hard' | 'expert'
}

export interface ICreateMarathonAttempt {
  frontendScore: number
  backendScore: number
}


