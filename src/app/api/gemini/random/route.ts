import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

const validTypes = ['frontend', 'backend']

const frontendTopics = 'HTML, CSS, JavaScript, TypeScript, React'
const backendTopics =
  'C#, ASP.NET Core, Entity Framework, LINQ, OOP, Microservices, Design Patterns'

const QuestionSchema = z.object({
  question: z.string(),
  code: z.string().nullable(),
  codeLanguage: z.enum(['javascript', 'typescript', 'html', 'css', 'tsx', 'csharp']).nullable(),
  answers: z.array(z.string()).length(4),
  correctIndex: z.number().int().min(0).max(3),
})

const QuestionsSchema = z.array(QuestionSchema).length(10)

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const lang = url.searchParams.get('lang') || 'en'
    const type = url.searchParams.get('type') || ''

    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Use "frontend" or "backend"' },
        { status: 400 },
      )
    }

    const topicDescription = type === 'frontend' ? frontendTopics : backendTopics

    const prompt = `
Ты создаёшь 10 вопросов для интервью по ${type === 'frontend' ? 'Frontend' : 'Backend (.NET/C#)'}.

ОЧЕНЬ ВАЖНО:
- Выводи ТОЛЬКО чистый JSON, ничего больше
- Ровно 10 вопросов
- Каждый вопрос имеет:
  - "question" — текст вопроса
  - "answers" — ровно 4 варианта ответа
  - "correctIndex" — число от 0 до 3
  - "code" — код или null
  - "codeLanguage" — язык кода или null
- Только 2–3 вопроса должны иметь код, остальные — text-only
- Для кода используйте ${
      type === 'frontend' ? 'javascript, typescript, html, css или tsx' : 'только csharp'
    }
- Вопросы и ответы на языке: "${lang}"
- Тематика: ${topicDescription}
- Позиция правильного ответа должна быть случайной
`

    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    })

    const result = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        responseSchema: zodToJsonSchema(QuestionsSchema),
      },
    })

    return NextResponse.json({ result: result.text })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
