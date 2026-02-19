const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const SITE_URL = RAW_SITE_URL.replace(/\/+$/, '')

export const siteConfig = {
  name: 'SkillCheck',
  title: 'SkillCheck - AI-платформа для тестирования разработчиков ',
  titleTemplate: '%s | SkillCheck',

  description:
    'SkillCheck - open-source платформа, которая помогает разработчикам проверять знания, готовиться к техническим собеседованиям и соревноваться в рейтинге. Вопросы генерируются с помощью AI, что обеспечивает актуальность и разнообразие. Присоединяйтесь к сообществу разработчиков и улучшайте свои навыки вместе с SkillCheck!',

  shortDescription: 'AI-платформа для тестирования разработчиков и подготовки к интервью.',

  url: SITE_URL,
  locale: 'ru_RU',
  language: 'ru',
  locales: ['ru', 'en', 'tj'] as const,
  defaultLocale: 'ru' as const,
  keywords: [
    'SkillCheck',
    'AI тесты для разработчиков',
    'платформа для тестирования программистов',
    'подготовка к техническому интервью',
    'технические собеседования',
    'онлайн тесты для программистов',
    'проверка знаний программистов',
    'оценка навыков разработчиков',
    'AI платформа для обучения',
    'вопросы для программистов',

    'JavaScript тесты',
    'TypeScript тесты',
    'React тесты',
    'Next.js тесты',
    'Frontend интервью',
    'Backend интервью',
    'Frontend вопросы',
    'Backend вопросы',
    'Fullstack интервью',

    'C# тесты',
    'ASP.NET тесты',
    '.NET интервью',
    'backend разработка',
    'frontend разработка',

    'coding interview practice',
    'developer skill assessment',
    'technical interview preparation',
    'programming interview questions',
    'online coding tests',
    'developer testing platform',
    'AI generated questions',
    'AI interview questions',

    'Google Gemini',
    'Gemini API',
    'AI генерация вопросов',
    'умные тесты для программистов',

    'подготовка junior разработчика',
    'подготовка middle разработчика',
    'подготовка senior разработчика',
    'junior developer interview',
    'middle developer interview',
    'senior developer interview',

    'алгоритмы и структуры данных',
    'вопросы по алгоритмам',
    'вопросы по JavaScript',
    'вопросы по React',
    'вопросы по TypeScript',

    'онлайн платформа для обучения программированию',
    'самопроверка знаний программиста',
    'практика перед собеседованием',
    'марафон вопросов',
    'случайные вопросы для программистов',

    'рейтинговая система разработчиков',
    'соревнование программистов',
    'developer leaderboard',
    'coding challenge platform',

    'open source платформа',
    'open source education',
    'IT обучение онлайн',
    'обучение программированию',

    'SkillCheck AI',
    'SkillCheck interview',
    'SkillCheck tests',
  ],

  creator: 'SkillCheck Team',
  publisher: 'Kavsar Academy',
  author: {
    name: 'SkillCheck Team',
    url: SITE_URL,
  },

  category: 'education',
  type: 'website',

  ogImage: '/og.png',
  icon: '/icon.png',
  favicon: '/favicon.ico',

  social: {
    github: 'https://github.com/makhsumovM/savol-bot',
    telegram: 'https://t.me/skillcheck_bot',
    instagram: 'https://www.instagram.com/skillcheck.tj/',
    facebook: 'https://www.facebook.com/skillcheck.tj',
    youtube:'https://www.youtube.com/@skillcheck.tj',
  },

  contact: {
    email: 'skillchecktj@gmail.com',
    telephone: '+992 785-11-2011',
    location: 'Dushanbe, Tajikistan',
  },
  verification: {
    google: 'gSrZyl2wPCVWzZfpHA8e2fXPoeo9bpXdUDwhnyEJKR8',
    yandex: '',
  },
}

export type SiteConfig = typeof siteConfig
export type Locale = (typeof siteConfig.locales)[number]