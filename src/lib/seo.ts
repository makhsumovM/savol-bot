const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const SITE_URL = RAW_SITE_URL.replace(/\/+$/, '')

export const siteConfig = {
  name: 'SkillCheck',
  title: 'SkillCheck - AI-тренажер для технических интервью',
  titleTemplate: '%s | SkillCheck',

  description:
    'SkillCheck - бесплатная AI-платформа для подготовки к техническим собеседованиям. Онлайн-тесты по JavaScript, TypeScript, React, Next.js, C#, ASP.NET и другим технологиям. Марафоны, случайные вопросы, рейтинг и личная статистика.',

  shortDescription:
    'AI-платформа для тестирования знаний разработчиков и подготовки к интервью.',

  url: SITE_URL,

  locale: 'ru_RU',
  language: 'ru',
  locales: ['ru', 'en', 'tj'] as const,
  defaultLocale: 'ru' as const,

  keywords: [
    'SkillCheck',
    'AI тесты для программистов',
    'подготовка к техническому собеседованию',
    'тренажер для интервью',
    'программирование онлайн тесты',
    'JavaScript тесты',
    'TypeScript тесты',
    'React тесты',
    'Next.js тесты',
    'C# тесты',
    'ASP.NET тесты',
    'frontend вопросы',
    'backend вопросы',
    'coding interview practice',
    'technical interview preparation',
    'programming quiz',
    'developer skill assessment',
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
  },

  verification: {
    google: 'gSrZyl2wPCVWzZfpHA8e2fXPoeo9bpXdUDwhnyEJKR8',
    yandex: '',
  },
}

export type SiteConfig = typeof siteConfig
export type Locale = (typeof siteConfig.locales)[number]
