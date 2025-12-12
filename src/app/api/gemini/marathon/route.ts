import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

export async function GET() {
  try {
    const prompt = `Сгенерируй строго массив из 50 объектов вопросов по JavaScript в формате JSON.
Никакого текста, объяснений, комментариев или Markdown вне JSON.

Требования к сложности:
1–10 вопросы: "easy"
11–20 вопросы: "medium"
21–30 вопросы: "hard"
31–40 вопросы: "very-hard"
41–50 вопросы: "expert"

Требования к содержанию:
- Каждый вопрос должен быть про разные аспекты JavaScript: типы данных, функции, область видимости, this, прототипы, наследование, классы, замыкания, модули, промисы, async/await, генераторы, итераторы, коллекции (Map, Set, WeakMap, WeakSet), event loop, стек вызовов, microtasks/macrotasks, Web APIs, модули ES, garbage collection, оптимизация, регулярные выражения, ошибки и исключения.
- Поле "code" содержит фрагмент кода (до 6 строк) или null.
- Ровно 20 вопросов должны иметь ненулевой "code".
- Остальные 30 вопросов — "code": null.
- Все вопросы с кодом должны иметь разный фрагмент кода.
- Поле "answers" — массив из 4 вариантов.
- Только один правильный вариант.
- "correctIndex" — число от 0 до 3.

Требования к формату:
JSON-массив из ровно 50 объектов, каждый объект строго в формате:

{
  "question": "string",
  "code": "string|null",
  "answers": ["string", "string", "string", "string"],
  "correctIndex": number,
  "difficulty": "easy" | "medium" | "hard" | "very-hard" | "expert"
}

Дополнительные правила:
- Порядок элементов строго соответствует порядку сложностей.
- JSON должен быть валидным.
- Никаких лишних полей.
- Никакого текста вне JSON.

Сгенерируй итоговый JSON.

`

    const QuestionSchema = z.object({
      question: z.string(),
      code: z.string().nullable(),
      answers: z.array(z.string()).length(4),
      correctIndex: z.number(),
      difficulty: z.enum(['easy', 'medium', 'hard', 'very-hard', 'expert']),
    })

    const QuestionsListSchema = z.array(QuestionSchema).length(5)

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
    console.error(error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
