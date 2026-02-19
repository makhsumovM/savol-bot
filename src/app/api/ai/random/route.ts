import {
  backendAllTopics,
  backendSpecificTopics,
  BackendTopic,
  CODE_LANGUAGES,
  frontendAllTopics,
  frontendSpecificTopics,
  FrontendTopic,
  mobileAllTopics,
  mobileSpecificTopics,
  MobileTopic,
  QuestionsSchema,
  QuizType,
  TopicsByDifficulty,
  validBackendTopics,
  validDifficulties,
  validFrontendTopics,
  validMobileTopics,
  validTypes,
} from '@/types/quizSchema'
import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'
import z from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const lang = url.searchParams.get('lang') || 'en'
    const typeParam = url.searchParams.get('type') || ''
    const topic = url.searchParams.get('topic') || 'all'

    if (!validTypes.includes(typeParam as QuizType)) {
      return NextResponse.json(
        { error: 'Invalid type. Use "frontend", "backend" or "mobile"' },
        { status: 400 },
      )
    }

    const type = typeParam as QuizType

    let topicsByDifficulty: TopicsByDifficulty
    let promptType: string
    let codeLanguages: string

    if (type === 'backend') {
      if (topic !== 'all' && !validBackendTopics.includes(topic as BackendTopic)) {
        return NextResponse.json(
          { error: `Invalid backend topic. Valid: ${validBackendTopics.join(', ')}` },
          { status: 400 },
        )
      }
      topicsByDifficulty =
        topic === 'all' ? backendAllTopics : backendSpecificTopics[topic as BackendTopic]
      promptType = `Backend (.NET/C#)${topic !== 'all' ? ` (${topic.toUpperCase()})` : ''}`
      codeLanguages = CODE_LANGUAGES.backend
    } else if (type === 'frontend') {
      if (topic !== 'all' && !validFrontendTopics.includes(topic as FrontendTopic)) {
        return NextResponse.json(
          { error: `Invalid frontend topic. Valid: ${validFrontendTopics.join(', ')}` },
          { status: 400 },
        )
      }
      topicsByDifficulty =
        topic === 'all' ? frontendAllTopics : frontendSpecificTopics[topic as FrontendTopic]
      promptType = `Frontend${topic !== 'all' ? ` (${topic.toUpperCase()})` : ''}`
      codeLanguages = CODE_LANGUAGES.frontend
    } else {
      if (topic !== 'all' && !validMobileTopics.includes(topic as MobileTopic)) {
        return NextResponse.json(
          { error: `Invalid mobile topic. Valid: ${validMobileTopics.join(', ')}` },
          { status: 400 },
        )
      }
      topicsByDifficulty =
        topic === 'all' ? mobileAllTopics : mobileSpecificTopics[topic as MobileTopic]
      promptType = `Mobile${topic !== 'all' ? ` (${topic.toUpperCase()})` : ''}`
      codeLanguages = CODE_LANGUAGES.mobile
    }

    const themeRule = `- Theme by difficulty:
${Object.entries(topicsByDifficulty)
  .map(([diff, desc]) => `  - ${diff}: ${desc}`)
  .join('\n')}`

    const prompt = `
You are creating 10 interview questions for ${promptType}.

VERY IMPORTANT RULES — FOLLOW EXACTLY:
- Output ONLY pure JSON, nothing else: no text, no explanations, no markdown
- Exactly 10 questions
- Each question must have:
  - "question" — question text
  - "answers" — exactly 4 answer options (strings)
  - "correctIndex" — number from 0 to 3, indicating the correct answer
  - "difficulty" — one of ${validDifficulties.join(', ')} (random for each question; use at least 3 different difficulty levels)
  - "code" — code or null
  - "codeLanguage" — code language or null

- IMPORTANT ABOUT correctIndex:
  The correct answer MUST BE RANDOM!
  Do not make a sequence like 0,1,2,3,0,1...
  Make it random: for example 3, 1, 0, 2, 3, 0, 1, 3, 2, 0
  Change the position of the correct answer differently in each question!

- Only 2 or 3 questions out of 10 should have code
  The remaining 7–8 questions — purely textual (code: null, codeLanguage: null)

- If there is code — the language must be correct:
  ${codeLanguages}

- Questions and answers in language: "${lang === 'tj' ? 'Tajik' : lang}"
${themeRule}

- The correct answer must correspond to the number in correctIndex
- Answer options must be plausible, but only one correct

Make everything simple, clear and random — especially the position of the correct answer!
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

    if (!result.text) throw new Error('Empty AI response')

    const parsedQuestions = JSON.parse(result.text)
    const validatedQuestions = QuestionsSchema.parse(parsedQuestions)

    return NextResponse.json({ result: validatedQuestions })
  } catch (error) {
    console.error('Question generation error:', error)

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid question format from AI', details: error.issues },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 })
  }
}
