import {GoogleGenAI} from '@google/genai'
import {NextResponse} from 'next/server'
import {z} from 'zod'
import {zodToJsonSchema} from 'zod-to-json-schema'

export async function GET() {
  try {
    const prompt = `
Сгенерируй строго массив объектов вопросов по JavaScript и TypeScript, HTML, CSS, Next.js в формате JSON.
Количество вопросов может быть неограниченным.
Никакого текста, объяснений, комментариев или Markdown вне JSON.

Вопросы должны быть разнообразными, охватывать разные темы JavaScript и TypeScript, HTML и CSS, Next.js.
И должен сказат ето вопрос пра JavaScript иил TypeScript или HTML, CSS, Next.js.

Требования к формату каждого объекта:
{
  "question": "string",
  "code": "string|null",
  "answers": ["string", "string", "string", "string"],
  "correctIndex": number,
  "difficulty": "easy" | "medium" | "hard" | "very-hard" | "expert"
}

Дополнительные правила:
- Порядок элементов должен соответствовать возрастанию сложности.
- JSON должен быть валидным.
- Никаких лишних полей.
- Никакого текста вне JSON.

Сгенерируй итоговый JSON.
`
    const Question = z.object({
      question: z.string(),
      code: z.string().nullable(),
      answers: z.array(z.string()).length(4),
      correctIndex: z.number(),
      difficulty: z.enum(['easy', 'medium', 'hard', 'very-hard', 'expert']),
    })

    const QuestionsList = z.array(Question).length(4)

    const client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    })


    const result = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        responseJsonSchema: zodToJsonSchema(QuestionsList),
      },
    })

    return NextResponse.json({result: result.text})
  } catch (error) {
    console.error(error)
    return NextResponse.json({error: String(error)}, {status: 500})
  }
}
