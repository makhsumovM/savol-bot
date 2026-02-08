const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const SITE_URL = RAW_SITE_URL.replace(/\/+$/, '');

export const siteConfig = {
  name: 'SkillCheck',
  title: 'SkillCheck - AI-платформа для тестирования разработчиков и подготовки к интервью',
  titleTemplate: '%s | SkillCheck',

  description:
    'SkillCheck - open-source платформа, которая помогает разработчикам проверять знания, готовиться к техническим собеседованиям и соревноваться в рейтинге. Вопросы генерируются моделью Google Gemini в реальном времени.',

  shortDescription:
    'AI-платформа для тестирования разработчиков и подготовки к интервью.',

  url: SITE_URL,

  locale: 'ru_RU',
  language: 'ru',
  locales: ['ru', 'en', 'tj'] as const,
  defaultLocale: 'ru' as const,

  keywords: [
    'SkillCheck',
    'AI тесты для разработчиков',
    'технические интервью',
    'подготовка к интервью',
    'онлайн тесты для программистов',
    'JavaScript тесты',
    'TypeScript тесты',
    'React тесты',
    'Next.js тесты',
    'C# тесты',
    'ASP.NET тесты',
    'frontend вопросы',
    'backend вопросы',
    'Google Gemini',
    'developer skill assessment',
    'coding interview practice',
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
};

export type SiteConfig = typeof siteConfig;
export type Locale = (typeof siteConfig.locales)[number];
