# 🧠 SkillCheck — AI Platform for Developer Testing & Interview Preparation

> **Free AI-powered platform for programmers** to practice coding tests, prepare for technical interviews, and improve frontend & backend skills with real-time scoring.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-skillcheck.kavsaracademy.tj-brightgreen?style=for-the-badge)](https://skillcheck.kavsaracademy.tj/)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## 🎯 What is SkillCheck?

**SkillCheck** is a modern AI-powered testing platform designed for software developers. It helps you:

- ✅ **Prepare for technical interviews** with real questions
- ✅ **Test your programming knowledge** (JavaScript, TypeScript, React, Next.js, Node.js)
- ✅ **Practice with AI-generated questions** powered by Google Gemini
- ✅ **Track your progress** and compete on the global leaderboard
- ✅ **Choose your language** — Russian, English, Tajik

**Perfect for:** Junior, Middle, and Senior developers preparing for job interviews or improving their skills.

---

## 🔍 SEO Keywords

**English:**
- AI programming tests online
- Technical interview preparation
- Frontend developer quiz
- JavaScript TypeScript React tests
- Coding practice platform

**Русский:**
- AI тесты по программированию
- Подготовка к собеседованию программиста
- Frontend Backend тесты онлайн
- JavaScript TypeScript React вопросы
- Марафон вопросов для разработчиков
- Бесплатные тесты для программистов

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🏃 **Marathon Mode** | Series of questions with scoring — choose Frontend or Backend direction |
| 🎲 **Random Question** | Quick practice with randomly generated questions |
| 🏆 **Leaderboard** | Global ranking based on your results |
| 📊 **User Profile** | Personal statistics, achievements, and progress tracking |
| 🌐 **Multi-language** | Support for English, Russian, and Tajik |
| 🌙 **Dark/Light Theme** | Switch between themes with `next-themes` |
| 🤖 **AI-Generated Questions** | Powered by Google Gemini API |

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 16 (App Router), React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **State** | Redux Toolkit, React Query |
| **Forms** | React Hook Form, Zod |
| **UI** | Radix UI, Lucide Icons |
| **i18n** | i18next, react-i18next |
| **AI** | Google Gemini API |

---

## 📁 Project Structure

```
skillcheck/
├── src/
│   ├── app/              # Next.js App Router (pages)
│   │   ├── api/          # API Routes (Gemini endpoints)
│   │   ├── marathon/     # Marathon quiz page
│   │   ├── random/       # Random question page
│   │   ├── leaderboard/  # Global rankings
│   │   ├── profile/      # User profile
│   │   ├── login/        # Authentication
│   │   └── register/     # Registration
│   ├── ui/               # Reusable UI components
│   ├── lib/              # Utilities, store, providers, SEO
│   ├── types/            # TypeScript types
│   ├── i18n/             # Localization (en, ru, tg)
│   └── styles/           # Global styles
└── public/               # Static assets
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/makhsumovM/savol-bot.git
cd savol-bot

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your GEMINI_API_KEY and NEXT_PUBLIC_API_URL

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
# Required
GEMINI_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_API_URL=your_backend_api_url

# Optional
NEXT_PUBLIC_SITE_URL=https://skillcheck.kavsaracademy.tj
```

---

## 📖 Usage Guide

### Game Modes

| Mode | Description |
|------|-------------|
| **🏃 Marathon** | Complete a series of questions with increasing difficulty. Choose Frontend or Backend. Your score is saved to the leaderboard. |
| **🎲 Random** | Quick practice — get a random question and test your knowledge instantly. |

### Difficulty Levels

| Level | Description |
|-------|-------------|
| `easy` | Basic concepts |
| `medium` | Intermediate level |
| `hard` | Advanced questions |
| `very-hard` | Expert-level challenges |
| `expert` | Top-tier questions |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 💬 Support

- 📧 **Email:** [Contact us](mailto:support@kavsaracademy.tj)
- 💬 **Telegram:** [@skillcheck_bot](https://t.me/skillcheck_bot)
- 🐛 **Issues:** [GitHub Issues](https://github.com/makhsumovM/savol-bot/issues)

---

## 👥 Authors

**Sultonzoda Abdulloh** — Frontend Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdullo-sultonzoda-75a4ab3a2/)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat&logo=telegram&logoColor=white)](https://t.me/sultonzoda_abdulloh)

**Qosimov Yusufjon** — Frontend Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/%D0%BC-qosimov-7bb6013a3/)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat&logo=telegram&logoColor=white)](https://t.me/Qosimovy)

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

## 📄 License

MIT License © 2026 [Makhsumov Muhammad](https://github.com/makhsumovM)

---

<p align="center">
  <b>SkillCheck</b> — Level up your coding skills with AI 🚀
</p>
