import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

const Question = z.object({
  question: z.string(),
  code: z.string().nullable(),
  answers: z.array(z.string()).length(4),
  correctIndex: z.number().min(0).max(3),
  difficulty: z.enum(['easy', 'medium', 'hard', 'very-hard', 'expert']),
  type: z.enum(['frontend', 'backend']),
})

const QuestionsList = z.array(Question)

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const lang = url.searchParams.get('lang') || 'en'
    const type = url.searchParams.get('type') || 'frontend'

    const language =
      lang === 'tj' ? 'таҷикӣ' : lang === 'ru' ? 'русский' : 'english'

    const prompt = `
Сгенерируй СТРОГО валидный JSON-массив из 10 вопросов.
Только JSON, без текста.

Язык: ${language}
Все вопросы должны иметь type="${type}"

Frontend:
- JavaScript
- TypeScript
- React
- Next.js

Backend (концептуально, для C# / .NET и в целом backend):
.NET (ASP.NET Core) — платформа и фреймворк для backend-разработки
Web API / REST API — проектирование и реализация HTTP-сервисов
Authentication & Authorization — JWT, OAuth2, Identity, роли и политики
Databases — реляционные (SQL Server, PostgreSQL) и NoSQL, ORM (Entity Framework Core)
Security basics — хеширование паролей, HTTPS, защита от SQL Injection, XSS, CSRF


Формат:
{
  "question": "string",
  "code": "string|null",
  "answers": ["a","b","c","d"],
  "correctIndex": 0-3,
  "difficulty": "easy|medium|hard|very-hard|expert",
  "type": "frontend|backend"
}
`

    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    })

    const result = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        // @ts-expect-error
        responseJsonSchema: zodToJsonSchema(QuestionsList),
      },
    })

    if (!result.text) {
      return NextResponse.json(
        { error: 'No response from API' },
        { status: 500 }
      )
    }
    const parsed = JSON.parse(result.text)
    const validated = QuestionsList.parse(parsed)

    return NextResponse.json(validated)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    )
  }
}
