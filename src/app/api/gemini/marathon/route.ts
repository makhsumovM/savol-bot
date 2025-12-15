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

    const prompt = `
Сгенерируй вопросы строго массивом из 5 объектов по JavaScript на языке ${
      lang == 'tj' ? 'Tajikistan' : lang
    }.
Никакого текста, объяснений, комментариев или Markdown вне JSON.

Требования к сложности:
1 вопрос — "easy"
2 вопрос — "medium"
3 вопрос — "hard"
4 вопрос — "very-hard"
5 вопрос — "expert"

Требования к содержанию:
- Каждый вопрос должен быть про РАЗНЫЕ аспекты JavaScript (например: типы данных, функции, область видимости, this, прототипы, замыкания, промисы, async/await, event loop, коллекции и т.д.).
- Поле "code" содержит фрагмент кода (до 6 строк) или null.
- Ровно 2 вопроса должны иметь ненулевой "code".
- Вопросы с кодом должны иметь разные фрагменты кода.
- Остальные вопросы должны иметь "code": null.
- Поле "answers" — массив из 4 вариантов ответа.
- Только один правильный вариант.
- "correctIndex" — число от 0 до 3.

Требования к формату:
JSON-массив из ровно 5 объектов.
Каждый объект строго в формате:
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
