// types/marathon.ts
export interface MarathonQuestion {
  question: string
  code: string | null
  answers: string[]
  correctIndex: number
  difficulty: 'easy' | 'medium' | 'hard' | 'very-hard' | 'expert'
}
