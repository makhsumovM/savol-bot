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
Ты — опытный технический интервьюер и эксперт в области ${type === 'frontend' ? 'Frontend' : 'Backend (.NET / C#)'}.

Твоя задача — СГЕНЕРИРОВАТЬ РОВНО 10 ВОПРОСОВ ДЛЯ ИНТЕРВЬЮ.

==============================
🚨 ОБЯЗАТЕЛЬНЫЕ ТРЕБОВАНИЯ
==============================

1. ВЫВОД:
- Выводи ТОЛЬКО чистый JSON
- Без markdown
- Без пояснений
- Без текста вне JSON

2. КОЛИЧЕСТВО:
- Ровно 10 вопросов, не больше и не меньше

3. УНИКАЛЬНОСТЬ:
- Запрещено повторять вопросы по смыслу
- Запрещены перефразированные дубликаты
- Каждый вопрос должен проверять РАЗНУЮ тему
- Перед выводом проверь все вопросы на смысловые совпадения
- Если есть похожие — замени их на новые

==============================
📦 СТРУКТУРА КАЖДОГО ВОПРОСА
==============================

{
  "question": string,
  "answers": [string, string, string, string],
  "correctIndex": number (0–3),
  "code": string | null,
  "codeLanguage": string | null
}

==============================
💻 КОД
==============================

- РОВНО 2–3 вопроса должны содержать код
- Остальные — строго БЕЗ кода
- Допустимые языки кода:
${
  type === 'frontend'
    ? '- javascript, typescript, html, css, tsx'
    : '- только csharp'
}

==============================
🌍 ЯЗЫК
==============================

- Все вопросы и ответы должны быть на языке: "${lang}"

==============================
🎯 ТЕМАТИКА
==============================

- Используй ТОЛЬКО эти темы:
${topicDescription}

- Вопросы должны быть уровня junior → middle → senior (смешанно)

==============================
🎲 ВАРИАНТЫ ОТВЕТОВ
==============================

- Ровно 4 варианта ответа
- Только ОДИН правильный
- correctIndex должен быть случайным
- Неправильные ответы должны выглядеть правдоподобно
- Не делай очевидных правильных ответов

==============================
✅ ФИНАЛЬНАЯ ПРОВЕРКА
==============================

Перед выводом JSON убедись:
- ✔ Ровно 10 вопросов
- ✔ Нет повторов по смыслу
- ✔ Структура соблюдена
- ✔ JSON валиден
- ✔ Код есть только в 2–3 вопросах

ТОЛЬКО ПОСЛЕ ЭТОГО ВЫВОДИ ЧИСТЫЙ JSON.
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
