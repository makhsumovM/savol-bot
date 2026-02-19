import z from 'zod'

export const validDifficulties = ['easy', 'medium', 'hard', 'very-hard', 'expert'] as const
export const validTypes = ['frontend', 'backend', 'mobile'] as const
export const validFrontendTopics = [
  'js',
  'ts',
  'htmlcss',
  'react',
  'nextjs',
  'react-nextjs',
] as const
export const validMobileTopics = [
  'dart-flutter',
  'kotlin',
  'react-native',
  'swift',
  'java',
  'python',
] as const
export const validBackendTopics = [
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

export type Difficulty = (typeof validDifficulties)[number]
export type QuizType = (typeof validTypes)[number]
export type FrontendTopic = (typeof validFrontendTopics)[number]
export type MobileTopic = (typeof validMobileTopics)[number]
export type BackendTopic = (typeof validBackendTopics)[number]
export type TopicsByDifficulty = Record<Difficulty, string>

export const frontendAllTopics: TopicsByDifficulty = {
  easy: 'HTML, CSS, Basic JavaScript',
  medium: 'JavaScript, Basic TypeScript',
  hard: 'Advanced JavaScript, TypeScript, React',
  'very-hard': 'Advanced Frontend Concepts',
  expert: 'Senior Frontend Architecture',
}

export const mobileAllTopics: TopicsByDifficulty = {
  easy: 'Mobile basics: platform overview, UI components, navigation',
  medium: 'State management, device APIs, networking fundamentals',
  hard: 'Offline storage, background tasks, testing basics',
  'very-hard': 'Performance tuning, animations, native integrations',
  expert: 'Mobile architecture, CI/CD, store readiness, scalability',
}

export const frontendSpecificTopics = {
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

export const mobileSpecificTopics = {
  'dart-flutter': {
    easy: 'Dart basics and Flutter widgets, layouts',
    medium: 'State management (setState, Provider), navigation, forms',
    hard: 'Async programming, REST/gRPC integration, animations',
    'very-hard': 'Performance optimization, isolates, custom render objects',
    expert: 'Architecture, platform channels, CI/CD, store distribution',
  },
  kotlin: {
    easy: 'Kotlin basics: null safety, classes, functions',
    medium: 'Android components: activities/fragments, RecyclerView, navigation',
    hard: 'Coroutines and Flow, dependency injection (Hilt/Koin), Room',
    'very-hard': 'WorkManager, performance profiling, testing strategies',
    expert: 'Modularization, Compose architecture, CI/CD pipelines',
  },
  'react-native': {
    easy: 'React Native basics: components, JSX, styling',
    medium: 'Navigation, state (useState/useReducer), platform APIs',
    hard: 'Native modules, gestures/animations, performance tuning',
    'very-hard': 'Offline-first data, deep links, complex state (Redux/Zustand)',
    expert: 'Large-scale architecture, monorepos, release workflows',
  },
  swift: {
    easy: 'Swift basics: optionals, control flow, structs vs classes',
    medium: 'UIKit/SwiftUI views, navigation, delegates',
    hard: 'Concurrency (GCD/async-await), networking, Core Data',
    'very-hard': 'Performance profiling, memory management, background modes',
    expert: 'Architecture (MVVM/VIPER), modularization, testing/CI',
  },
  java: {
    easy: 'Java basics: OOP, collections, exceptions',
    medium: 'Android fundamentals: activities, layouts, intents',
    hard: 'Threading (Executors), networking, SQLite/Room',
    'very-hard': 'Performance profiling, memory leaks, security basics',
    expert: 'Large-scale Android architecture, modular apps, test pipelines',
  },
  python: {
    easy: 'Python basics: syntax, data structures, functions',
    medium: 'Mobile frameworks (Kivy/BeeWare) basics, UI components',
    hard: 'Networking, async IO, packaging mobile apps',
    'very-hard': 'Performance tuning, native bindings, platform specifics',
    expert: 'Architecture, CI/CD for Python mobile apps, store publication',
  },
}

export const backendAllTopics = {
  easy: 'C# basics, .NET CLI, ASP.NET Core basics, LINQ fundamentals',
  medium: 'C#, .NET, ASP.NET Core, Entity Framework Core, Dapper',
  hard: 'Advanced ASP.NET Core, EF Core performance, gRPC, SignalR',
  'very-hard': 'High-performance .NET, Serilog logging, diagnostics, xUnit testing',
  expert: 'Senior .NET architecture, observability, testing strategy, data access patterns',
}

export const backendSpecificTopics = {
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
export const QuestionSchema = z.object({
  question: z.string(),
  code: z.string().nullable(),
  codeLanguage: z
    .enum([
      'javascript',
      'typescript',
      'html',
      'css',
      'tsx',
      'csharp',
      'dart',
      'kotlin',
      'swift',
      'java',
      'python',
    ])
    .nullable(),
  answers: z.array(z.string()).length(4),
  correctIndex: z.number().int().min(0).max(3),
  difficulty: z.enum(validDifficulties),
})
export const CODE_LANGUAGES = {
  backend: 'csharp',
  mobile: 'dart (Flutter), kotlin, swift, java, python, javascript, or typescript (React Native)',
  frontend: 'javascript, typescript, html, css, or tsx',
} as const
export const QuestionsSchema = z.array(QuestionSchema).length(10)