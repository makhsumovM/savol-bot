import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const lang = url.searchParams.get('lang')

    if (!lang) {
      return NextResponse.json({ error: 'Missing required query parameter: lang' }, { status: 400 })
    }

    const prompt = `Сгенерируй все вопросы строго массивом из 15 объектов по JavaScript на языке ${
      lang == 'tj' ? 'Tajikistan' : lang
    }.
Никакого текста, объяснений, комментариев или Markdown вне JSON.

Требования к сложности:
1–3 вопросы: "easy"
4–6 вопросы: "medium"
7–9 вопросы: "hard"
10–12 вопросы: "very-hard"
13–15 вопросы: "expert"

Требования к содержанию:
- Каждый вопрос должен быть про разные аспекты JavaScript: типы данных, функции, область видимости, this, прототипы, наследование, классы, замыкания, модули, промисы, async/await, генераторы, итераторы, коллекции (Map, Set, WeakMap, WeakSet), event loop, стек вызовов, microtasks/macrotasks, Web APIs, модули ES, garbage collection, оптимизация, регулярные выражения, ошибки и исключения.
- Поле "code" содержит фрагмент кода (до 6 строк) или null.
- Ровно 5 вопросов должны иметь ненулевой "code".
- Остальные 10 вопросов — "code": null.
- Все вопросы с кодом должны иметь разный фрагмент кода.
- Поле "answers" — массив из 4 вариантов.
- Только один правильный вариант.
- "correctIndex" — число от 0 до 3.

Требования к формату:
JSON-массив из ровно 15 объектов, каждый объект строго в формате:

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

Сгенерируй итоговый JSON.`

    const QuestionSchema = z.object({
      question: z.string(),
      code: z.string().nullable(),
      answers: z.array(z.string()).length(4),
      correctIndex: z.number(),
      difficulty: z.enum(['easy', 'medium', 'hard', 'very-hard', 'expert']),
    })

    const QuestionsListSchema = z.array(QuestionSchema).length(15)

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
