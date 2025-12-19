export interface RandomQuestion {
  question: string
  code: string | null
  answers: string[]
  correctIndex: number
  difficulty: 'easy' | 'medium' | 'hard' | 'very-hard' | 'expert'
   type: 'frontend' | 'backend'
}
