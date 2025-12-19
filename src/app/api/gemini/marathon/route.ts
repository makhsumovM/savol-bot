/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

const validDifficulties = ['easy', 'medium', 'hard', 'very-hard', 'expert'] as const

const topics = {
  easy: 'HTML, CSS, Basic JavaScript',
  medium: 'JavaScript, Basic TypeScript',
  hard: 'Advanced JavaScript, TypeScript, React',
  'very-hard': 'Advanced Frontend Concepts',
  expert: 'Senior Frontend Architecture',
}

const QuestionSchema = z.object({
  question: z.string(),
  code: z.string().nullable(),
  codeLanguage: z.enum(['javascript', 'typescript', 'html', 'css', 'tsx']).nullable(),
  answers: z.array(z.string()).length(4),
  correctIndex: z.number().int().min(0).max(3),
  difficulty: z.enum(validDifficulties),
})

const QuestionsSchema = z.array(QuestionSchema).length(10)

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const lang = url.searchParams.get('lang') || 'en'
    const difficulty = url.searchParams.get('difficulty')

    if (!validDifficulties.includes(difficulty as any)) {
      return NextResponse.json({ error: 'Invalid difficulty' }, { status: 400 })
    }

    const prompt = `
You are an API that generates frontend interview questions.

STRICT RULES (DO NOT BREAK):
- Output ONLY valid JSON
- Output MUST match provided JSON schema
- Generate EXACTLY 10 questions
- EXACTLY 4 questions MUST include "code"
- If "code" is null → "codeLanguage" MUST be null
- If "code" exists → "codeLanguage" MUST be correct
- "answers" MUST have 4 items
- "correctIndex" MUST NOT always be 0
- Use DIFFERENT correctIndex values across questions
- Correct answer MUST match correctIndex
- All questions difficulty: "${difficulty}"
- Language: "${lang}"
- Topic: ${topics[difficulty as keyof typeof topics]}
`

    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    })

    const result = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseJsonSchema: zodToJsonSchema(QuestionsSchema),
      },
    })

    return NextResponse.json({ result: result.text })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
