/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

const validDifficulties = ['easy', 'medium', 'hard', 'very-hard', 'expert']
const validTypes = ['frontend', 'backend']

const frontendTopics = {
  easy: 'HTML, CSS, Basic JavaScript',
  medium: 'JavaScript, Basic TypeScript',
  hard: 'Advanced JavaScript, TypeScript, React',
  'very-hard': 'Advanced Frontend Concepts',
  expert: 'Senior Frontend Architecture',
}

const backendTopics = {
  easy: 'Basic C#, Variables, Loops, Conditionals, OOP Basics',
  medium: 'Collections, LINQ, Exceptions, Async/Await Basics',
  hard: 'ASP.NET Core Fundamentals, Dependency Injection, Middleware, Entity Framework Basics',
  'very-hard': 'Advanced ASP.NET Core (Authentication, Authorization, Performance, Caching)',
  expert: 'Senior .NET Architecture, Microservices, Design Patterns, Concurrency, Performance Optimization',
}

const QuestionSchema = z.object({
  question: z.string(),
  code: z.string().nullable(),
  codeLanguage: z.enum(['javascript', 'typescript', 'html', 'css', 'tsx', 'csharp']).nullable(),
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
    const type = url.searchParams.get('type')

    if (!validDifficulties.includes(difficulty as any)) {
      return NextResponse.json({ error: 'Invalid difficulty' }, { status: 400 })
    }

    if (!validTypes.includes(type as any)) {
      return NextResponse.json(
        { error: 'Invalid type. Use "frontend" or "backend"' },
        { status: 400 }
      )
    }

    const topics = type === 'frontend' ? frontendTopics : backendTopics
    const topicDescription = topics[difficulty as keyof typeof topics]

    const prompt = `
Ты создаёшь 10 вопросов для интервью по ${type === 'frontend' ? 'Frontend' : 'Backend (.NET/C#)'}.

ОЧЕНЬ ВАЖНЫЕ ПРАВИЛА — СОБЛЮДАЙ ТОЧНО:
- Выводи ТОЛЬКО чистый JSON, ничего больше: ни текста, ни объяснений, ни markdown
- Ровно 10 вопросов
- Каждый вопрос должен иметь:
  - "question" — текст вопроса
  - "answers" — ровно 4 варианта ответа (строки)
  - "correctIndex" — число от 0 до 3, указывающее на правильный ответ
  - "difficulty" — всегда "${difficulty}"
  - "code" — код или null
  - "codeLanguage" — язык кода или null

- ВАЖНО ПРО correctIndex:
  Правильный ответ ДОЛЖЕН БЫТЬ СЛУЧАЙНЫМ!
  Не делай последовательность вроде 0,1,2,3,0,1...
  Делай случайно: например 3, 1, 0, 2, 3, 0, 1, 3, 2, 0
  Меняй позицию правильного ответа в каждом вопросе по-разному!

- Только 2 или 3 вопроса из 10 должны иметь код
  Остальные 7–8 вопросов — чисто текстовые (code: null, codeLanguage: null)

- Если есть код — язык должен быть правильным:
  ${type === 'frontend' ? 'javascript, typescript, html, css или tsx' : 'только csharp'}

- Вопросы и ответы на языке: "${lang}"
- Тематика: ${topicDescription}

- Правильный ответ должен соответствовать номеру в correctIndex
- Варианты ответов должны быть правдоподобными, но только один правильный

Сделай всё просто, понятно и случайно — особенно позицию правильного ответа!
`

    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    })

    const result = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: zodToJsonSchema(QuestionsSchema),
      },
    })

    return NextResponse.json({ result: result.text })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
