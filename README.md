# SkillCheck - AI-платформа для тестирования разработчиков и подготовки к интервью

> SkillCheck - open-source платформа, которая помогает разработчикам проверять знания, готовиться к техническим собеседованиям и соревноваться в рейтинге. Вопросы генерируются моделью Google Gemini в реальном времени.

[![Live Demo](https://img.shields.io/badge/Live_Demo-skillcheck.kavsaracademy.tj-brightgreen?style=for-the-badge)](https://skillcheck.kavsaracademy.tj/)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## Что такое SkillCheck

- Подготовка к техническим интервью для Frontend и Backend
- Онлайн-тесты по JavaScript, TypeScript, React, Next.js, C#, ASP.NET и другим технологиям
- Марафон и случайный вопрос для быстрой практики
- Глобальный рейтинг и личная статистика
- Поддержка языков: Русский, English, Тоҷикӣ

---

## Ключевые возможности

| Feature | Description |
| --- | --- |
| Marathon Mode | Серия вопросов с начислением баллов и ростом сложности |
| Random Question | Быстрая практика со случайным вопросом |
| Leaderboard | Глобальный рейтинг участников |
| User Profile | Персональная статистика, достижения, прогресс |
| Multi-language | Русский, English, Тоҷикӣ |
| AI-Generated Questions | Генерация вопросов через Google Gemini |

---

## Техстек

| Category | Technologies |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, Motion |
| State | Redux Toolkit, React Query |
| Forms | React Hook Form, Zod |
| UI | Radix UI, Lucide Icons |
| i18n | i18next, react-i18next |
| AI | Google Gemini API |

---

## SEO и метаданные

- Базовые метаданные и Open Graph: `src/lib/seo.ts`, `src/app/layout.tsx`
- Robots и Sitemap: `src/app/robots.ts`, `src/app/sitemap.ts`
- Для корректных канонических ссылок и OG-URL укажите `NEXT_PUBLIC_SITE_URL`

---

## Структура проекта

```
savol-bot/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API Routes (Gemini endpoints)
│   │   ├── marathon/     # Marathon quiz page
│   │   ├── random/       # Random question page
│   │   ├── leaderboard/  # Global rankings
│   │   ├── profile/      # User profile
│   │   ├── my-rank/      # User rank
│   │   ├── login/        # Authentication
│   │   └── register/     # Registration
│   ├── ui/               # Reusable UI components
│   ├── lib/              # Utilities, store, providers, SEO
│   ├── types/            # TypeScript types
│   ├── i18n/             # Localization (en, ru, tj)
│   └── styles/           # Global styles
└── public/               # Static assets
```

---

## Быстрый старт

### Требования

- Node.js 18+
- npm / yarn / pnpm

### Установка

```bash
# Clone the repository
git clone https://github.com/makhsumovM/savol-bot.git
cd savol-bot

# Install dependencies
npm install
```

### Переменные окружения

Создайте `.env` в корне проекта:

```env
# Required
GEMINI_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_API_URL=your_backend_api_url

# Optional (используется для SEO)
NEXT_PUBLIC_SITE_URL=https://skillcheck.kavsaracademy.tj
```

### Запуск разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Production Build

```bash
npm run build
npm start
```

---

## Скрипты

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Вклад в проект

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## Поддержка

- Email: support@kavsaracademy.tj
- Telegram: @skillcheck_bot
- Issues: https://github.com/makhsumovM/savol-bot/issues

---

## Авторы

**Sultonzoda Abdulloh** - Frontend Developer  
LinkedIn: https://www.linkedin.com/in/abdullo-sultonzoda-75a4ab3a2/  
Telegram: https://t.me/sultonzoda_abdulloh

**Qosimov Yusufjon** - Frontend Developer  
LinkedIn: https://www.linkedin.com/in/%D0%BC-qosimov-7bb6013a3/  
Telegram: https://t.me/Qosimovy

---

## License

MIT License © 2026 [Makhsumov Muhammad](https://github.com/makhsumovM)
