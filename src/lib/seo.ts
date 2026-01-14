const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000/'
export const siteConfig = {
  name: 'SkillCheck',
  title: 'SkillCheck — AI тесты для программистов | Подготовка к собеседованиям',
  titleTemplate: '%s | SkillCheck — AI платформа для разработчиков',

  description:
    'SkillCheck — бесплатная AI-платформа для подготовки к техническим собеседованиям. Онлайн тесты по JavaScript, TypeScript, React, Next.js, Node.js. Проверьте знания Frontend и Backend, пройдите марафон вопросов и попадите в топ рейтинга.',

  shortDescription:
    'AI-платформа для тестирования программистов. Подготовка к техническим интервью онлайн.',

  url: SITE_URL,

  locale: 'ru_RU',
  language: 'ru',
  locales: ['ru', 'en', 'tg'] as const,
  defaultLocale: 'ru' as const,

  keywords: [
    'SkillCheck',
    'SkillCheck AI',
    'SkillCheck тесты',

    'подготовка к собеседованию программиста',
    'как подготовиться к техническому собеседованию',
    'вопросы на собеседовании frontend разработчика',
    'вопросы на собеседовании backend разработчика',
    'тестовое задание junior frontend',

    'AI тесты по программированию',
    'онлайн тесты для программистов',
    'бесплатные тесты для разработчиков',
    'проверка знаний программиста онлайн',
    'марафон вопросов по программированию',
    'викторина для программистов онлайн',

    'JavaScript тесты онлайн бесплатно',
    'TypeScript тесты с ответами',
    'React тесты для собеседования',
    'React вопросы junior middle senior',
    'Next.js тесты онлайн',
    'HTML CSS тесты для фронтенд',
    'Node.js тесты онлайн',
    'backend тесты для разработчиков',
    'API вопросы собеседование',
    'тренажёр для программистов онлайн',
    'как проверить знания javascript',
    'тесты по react на русском',
    'подготовка к frontend собеседованию 2025',
    'топ вопросы для разработчиков',
  ],

  creator: 'SkillCheck Team',
  publisher: 'Kavsar Academy',
  author: {
    name: 'SkillCheck Team',
    url: SITE_URL,
  },

  category: 'education',
  type: 'website',

  ogImage: '/og-skillcheck.png',
  logo: '/logo.png',
  favicon: '/favicon.ico',

  social: {
    github: 'https://github.com/makhsumovM/savol-bot',
  },

  verification: {
    google: '',
    yandex: '',
  },
}

export type SiteConfig = typeof siteConfig
export type Locale = 'ru' | 'en' | 'tg'
