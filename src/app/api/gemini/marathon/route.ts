/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const lang = url.searchParams.get('lang') || 'en'
    const difficulty = url.searchParams.get('difficulty') || 'easy'

    const validDifficulties = ['easy', 'medium', 'hard', 'very-hard', 'expert'] as const
    if (!validDifficulties.includes(difficulty as any)) {
      return NextResponse.json({ error: 'Invalid difficulty' }, { status: 400 })
    }

    const topics = {
      easy: 'HTML/CSS/Basic JS',
      medium: 'JavaScript normal, TypeScript basic',
      hard: 'JavaScript hard, TypeScript normal, React normal',
      'very-hard': '10 сложных вопросов middle',
      expert: 'Senior вопросы',
    }

    const prompt = `
      Generate 10 Frontend questions in ${lang} for difficulty "${difficulty}".
      Topic: ${topics[difficulty as keyof typeof topics]}

      Constraints:
      - Exactly 4 questions must have a "code" (max 6 lines). Others: null.
      - "answers": array of 4.
      - "correctIndex": 0-3.
      - Output: STRICT VALID JSON ONLY.
    `

    const QuestionSchema = z.object({
      question: z.string(),
      code: z.string().nullable(),
      answers: z.array(z.string()).length(4),
      correctIndex: z.number().min(0).max(3),
      difficulty: z.enum(validDifficulties),
    })

    const QuestionsListSchema = z.array(QuestionSchema).length(10)

    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    })

    const result = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseJsonSchema: zodToJsonSchema(QuestionsListSchema),
      },
    })

    return NextResponse.json({ result: result.text })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
