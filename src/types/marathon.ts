export interface MarathonQuestion {
  question: string
  code: string | null
  codeLanguage:
    | 'javascript'
    | 'typescript'
    | 'tsx'
    | 'jsx'
    | 'css'
    | 'html'
    | 'csharp'
    | 'dart'
    | 'kotlin'
    | 'swift'
    | 'java'
    | 'python'
    | null
  answers: string[]
  correctIndex: number
  difficulty: 'easy' | 'medium' | 'hard' | 'very-hard' | 'expert'
}

export interface ICreateMarathonAttempt {
  frontendScore: number
  backendScore: number
}


