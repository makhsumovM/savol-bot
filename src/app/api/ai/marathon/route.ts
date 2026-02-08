import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

const validDifficulties = ['easy', 'medium', 'hard', 'very-hard', 'expert'] as const
const validTypes = ['frontend', 'backend'] as const
const validFrontendTopics = ['js', 'ts', 'htmlcss', 'react', 'nextjs', 'react-nextjs'] as const
const validBackendTopics = [
  'csharp',
  'dotnet',
  'aspnet',
  'ef',
  'linq',
  'dapper',
  'grpc',
  'signalr',
  'serilog',
  'xunit',
] as const

type Difficulty = (typeof validDifficulties)[number]
type QuizType = (typeof validTypes)[number]
type FrontendTopic = (typeof validFrontendTopics)[number]
type BackendTopic = (typeof validBackendTopics)[number]
type TopicsByDifficulty = Record<Difficulty, string>

const frontendAllTopics: TopicsByDifficulty = {
  easy: 'HTML, CSS, Basic JavaScript',
  medium: 'JavaScript, Basic TypeScript',
  hard: 'Advanced JavaScript, TypeScript, React',
  'very-hard': 'Advanced Frontend Concepts',
  expert: 'Senior Frontend Architecture',
}

const frontendSpecificTopics = {
  js: {
    easy: 'Basic JavaScript: variables, data types, loops, conditionals',
    medium: 'Intermediate JavaScript: functions, arrays, objects',
    hard: 'Advanced JavaScript: closures, prototypes, async/await',
    'very-hard': 'Expert JavaScript: performance optimization, modules',
    expert: 'Senior JavaScript: design patterns, concurrency',
  },
  ts: {
    easy: 'Basic TypeScript: types, interfaces',
    medium: 'Intermediate TypeScript: generics, enums',
    hard: 'Advanced TypeScript: decorators, advanced types',
    'very-hard': 'Expert TypeScript: type inference, mapped types',
    expert: 'Senior TypeScript: architecture with types',
  },
  htmlcss: {
    easy: 'Basic HTML: tags, structure; Basic CSS: selectors, properties',
    medium: 'Intermediate HTML: forms, semantics; Intermediate CSS: flexbox, grid',
    hard: 'Advanced HTML: accessibility, custom elements; Advanced CSS: animations, transitions',
    'very-hard': 'Expert HTML: performance, SEO; Expert CSS: preprocessors, responsive design',
    expert:
      'Senior HTML: integration with frameworks; Senior CSS: architecture, methodologies like BEM',
  },
  react: {
    easy: 'Basic React: components, JSX',
    medium: 'Intermediate React: state, props, hooks',
    hard: 'Advanced React: context, reducers, performance',
    'very-hard': 'Expert React: custom hooks, testing',
    expert: 'Senior React: architecture, state management libraries',
  },
  nextjs: {
    easy: 'Basic Next.js: pages, routing',
    medium: 'Intermediate Next.js: API routes, data fetching',
    hard: 'Advanced Next.js: SSR, SSG, authentication',
    'very-hard': 'Expert Next.js: optimization, deployment',
    expert: 'Senior Next.js: scalable apps, integrations',
  },
  'react-nextjs': {
    easy: 'Basic React and Next.js: components, pages',
    medium: 'Intermediate: hooks, data fetching in Next.js',
    hard: 'Advanced: state management, SSR in Next.js',
    'very-hard': 'Expert: performance in React/Next.js',
    expert: 'Senior: architecture for React/Next.js apps',
  },
}

const backendAllTopics = {
  easy: 'C# basics, .NET CLI, ASP.NET Core basics, LINQ fundamentals',
  medium: 'C#, .NET, ASP.NET Core, Entity Framework Core, Dapper',
  hard: 'Advanced ASP.NET Core, EF Core performance, gRPC, SignalR',
  'very-hard': 'High-performance .NET, Serilog logging, diagnostics, xUnit testing',
  expert: 'Senior .NET architecture, observability, testing strategy, data access patterns',
}

const backendSpecificTopics = {
  csharp: {
    easy: 'C# basics: variables, control flow, OOP',
    medium: 'Intermediate C#: collections, exceptions, delegates',
    hard: 'Advanced C#: generics, events, lambdas, LINQ',
    'very-hard': 'Expert C#: reflection, attributes, spans, unsafe code',
    expert: 'Senior C#: performance, memory, multithreading',
  },
  dotnet: {
    easy: '.NET basics: CLI, project structure, NuGet packages',
    medium: '.NET intermediate: configuration, dependency injection, options',
    hard: '.NET advanced: hosting, background services, diagnostics',
    'very-hard': '.NET expert: GC, performance, trimming, native AOT',
    expert: 'Senior .NET: architecture, observability, deployment',
  },
  aspnet: {
    easy: 'ASP.NET Core basics: routing, controllers, minimal APIs',
    medium: 'ASP.NET Core intermediate: middleware, model binding, validation',
    hard: 'ASP.NET Core advanced: auth, caching, error handling',
    'very-hard': 'ASP.NET Core expert: performance, versioning, security',
    expert: 'Senior ASP.NET Core: scalable APIs, deployment, monitoring',
  },
  ef: {
    easy: 'EF Core basics: DbContext, DbSet, CRUD',
    medium: 'EF Core intermediate: migrations, relationships, tracking',
    hard: 'EF Core advanced: queries, includes, performance',
    'very-hard': 'EF Core expert: transactions, concurrency, query splitting',
    expert: 'Senior EF Core: modeling strategy, raw SQL, multi-tenant',
  },
  linq: {
    easy: 'LINQ basics: query syntax, method syntax',
    medium: 'LINQ intermediate: joins, grouping, filtering',
    hard: 'LINQ advanced: projections, aggregations, deferred execution',
    'very-hard': 'LINQ expert: expression trees, custom providers',
    expert: 'Senior LINQ: optimization, performance, readability',
  },
  dapper: {
    easy: 'Dapper basics: parameterized queries, mapping',
    medium: 'Dapper intermediate: multi-mapping, stored procedures',
    hard: 'Dapper advanced: performance, batching, transactions',
    'very-hard': 'Dapper expert: custom type handlers, multi-result sets',
    expert: 'Senior Dapper: data access layering, diagnostics',
  },
  grpc: {
    easy: 'gRPC basics: proto files, unary calls',
    medium: 'gRPC intermediate: streaming, deadlines, metadata',
    hard: 'gRPC advanced: interceptors, auth, error handling',
    'very-hard': 'gRPC expert: load balancing, performance, observability',
    expert: 'Senior gRPC: service design, versioning, interop',
  },
  signalr: {
    easy: 'SignalR basics: hubs, connections, clients',
    medium: 'SignalR intermediate: groups, auth, reconnects',
    hard: 'SignalR advanced: scaling, backplanes, reliability',
    'very-hard': 'SignalR expert: performance, message size, throttling',
    expert: 'Senior SignalR: real-time architecture, deployment',
  },
  serilog: {
    easy: 'Serilog basics: structured logging, sinks',
    medium: 'Serilog intermediate: enrichers, configuration',
    hard: 'Serilog advanced: filtering, buffering, performance',
    'very-hard': 'Serilog expert: custom sinks, correlation, tracing',
    expert: 'Senior Serilog: production logging strategy, retention',
  },
  xunit: {
    easy: 'xUnit basics: facts, assertions',
    medium: 'xUnit intermediate: fixtures, data-driven tests',
    hard: 'xUnit advanced: mocking, integration tests',
    'very-hard': 'xUnit expert: isolation, parallelization, flaky tests',
    expert: 'Senior testing: CI pipelines, test strategy with xUnit',
  },
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
    const difficultyParam = url.searchParams.get('difficulty') || ''
    const typeParam = url.searchParams.get('type') || ''
    const topic = url.searchParams.get('topic') || 'all'

    if (!validDifficulties.includes(difficultyParam as Difficulty)) {
      return NextResponse.json({ error: 'Invalid difficulty' }, { status: 400 })
    }

    if (!validTypes.includes(typeParam as QuizType)) {
      return NextResponse.json(
        { error: 'Invalid type. Use "frontend" or "backend"' },
        { status: 400 },
      )
    }

    const difficulty = difficultyParam as Difficulty
    const type = typeParam as QuizType

    let topicDescription: string
    let promptType: string
    let codeLanguages: string

    if (type === 'backend') {
      if (topic !== 'all' && !validBackendTopics.includes(topic as BackendTopic)) {
        return NextResponse.json(
          { error: `Invalid backend topic. Valid: ${validBackendTopics.join(', ')}` },
          { status: 400 },
        )
      }
      const backendTopicsMap: TopicsByDifficulty =
        topic === 'all' ? backendAllTopics : backendSpecificTopics[topic as BackendTopic]
      topicDescription = backendTopicsMap[difficulty]
      promptType = `Backend (.NET/C#)${topic !== 'all' ? ` (${topic.toUpperCase()})` : ''}`
      codeLanguages = 'only csharp'
    } else {
      if (topic !== 'all' && !validFrontendTopics.includes(topic as FrontendTopic)) {
        return NextResponse.json(
          { error: `Invalid frontend topic. Valid: ${validFrontendTopics.join(', ')}` },
          { status: 400 },
        )
      }
      const frontendTopicsMap: TopicsByDifficulty =
        topic === 'all' ? frontendAllTopics : frontendSpecificTopics[topic as FrontendTopic]
      topicDescription = frontendTopicsMap[difficulty]
      promptType = `Frontend${topic !== 'all' ? ` (${topic.toUpperCase()})` : ''}`
      codeLanguages = 'javascript, typescript, html, css or tsx'
    }

    const prompt = `
You are creating 10 interview questions for ${promptType}.

VERY IMPORTANT RULES — FOLLOW EXACTLY:
- Output ONLY pure JSON, nothing else: no text, no explanations, no markdown
- Exactly 10 questions
- Each question must have:
  - "question" — question text
  - "answers" — exactly 4 answer options (strings)
  - "correctIndex" — number from 0 to 3, indicating the correct answer
  - "difficulty" — always "${difficulty}"
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

- Questions and answers in language: "${lang == 'tj' ? 'Tajik' : lang}"
- Theme: ${topicDescription}

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

    return NextResponse.json({ result: result.text })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
