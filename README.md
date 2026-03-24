<div align="center">
  <br />
  <h1 align="center" style="font-size: 3rem; font-weight: 900;">⚡ SkillCheck</h1>
  <h3 align="center">AI-Powered Developer Skill Assessment Platform</h3>
  
  <p align="center">
    Master your stack. Challenge an AI. Compete globally.
  </p>

  <p align="center">
    <a href="https://skillcheck.kavsaracademy.tj/">
      <img src="https://img.shields.io/badge/LIVE_DEMO-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind4" />
    <img src="https://img.shields.io/badge/Gemini_AI-8E75B2?style=flat-square&logo=google-gemini&logoColor=white" alt="Gemini" />
    <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white" alt="Redux" />
  </p>
</div>

<br />

## 🔮 Overview

**SkillCheck** is a **Generative AI-powered** platform designed to create unique interview scenarios and programming challenges in real-time. By leveraging **Google Gemini 2.5**, we ensure that no two tests are exactly the same. 

Whether you are preparing for a Senior Frontend role, testing your back-end knowledge, or brushing up on mobile development patterns, SkillCheck adapts to your needs with an immersive, gamified experience. The platform features robust state management, responsive design, beautiful dynamic animations, and complex data handling tailored for developers.

---

## 🚀 Key Features

### 🧠 **AI Core**
*   **Dynamic Generation**: Questions are crafted on-the-fly using advanced prompt engineering via `@google/genai`.
*   **Context Aware**: Questions cover specific nuances of React, Node.js, .NET, and Mobile development.
*   **Smart Code Rendering**: Beautiful syntax highlighting utilizing **React Shiki** and **Syntax Highlighter** for reading code challenges natively in the browser.

### 🎮 **Game Modes & Competition**
*   **🔥 Marathon**: A survival mode where difficulty ramps up as you progress. How long can you last?
*   **🎲 Random**: Quickfire 10-question sprints for rapid knowledge checks.
*   **⚔️ Leaderboard**: Global ranking system to see where you stand among peers.
*   **📊 Profile History**: View your past results, active ranks, and personal best scores seamlessly.

### 💎 **Premium Experience**
*   **Fluid Animations**: Powered by **Framer Motion** and **AOS (Animate On Scroll)** for a native-app feel.
*   **Glassmorphism UI**: Modern aesthetic with **Tailwind CSS v4** styling and **Radix UI** scalable primitives.
*   **Dark/Light Themes**: Fully adaptive interface for any time of day toggled tightly with `next-themes`.
*   **Localization**: Native support for **English**, **Russian**, and **Tajik** via `i18next`.

### 🔐 **Advanced Tech Foundation**
*   **State Management**: Complex dual-tier state using **Redux Toolkit** (client) and **TanStack React Query** (server caching).
*   **Robust Forms**: Form management built securely using **React Hook Form** paired with **Zod** schema validation.
*   **SEO & Analytics**: Fully configured Search Engine Optimization with **Google Analytics Data** integrations.

---

## 🛠️ Tech Stack

Built with the latest and greatest technologies for maximum performance.

| Domain                 | Technology Stack |
| :--------------------- | :--- |
| **Framework**          | ![Next.js](https://img.shields.io/badge/-Next.js_16-black?logo=next.js) ![React](https://img.shields.io/badge/-React_19-61DAFB?logo=react&logoColor=black) |
| **Language**           | ![TypeScript](https://img.shields.io/badge/-TypeScript_5-3178C6?logo=typescript&logoColor=white) |
| **Styling & UI**       | ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS_4-38B2AC?logo=tailwind-css) ![Radix_UI](https://img.shields.io/badge/-Radix_UI-161618?logo=radix-ui) |
| **Animations**         | ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?logo=framer) ![AOS](https://img.shields.io/badge/-AOS-7B1FA2) |
| **State**              | ![TanStack Query](https://img.shields.io/badge/-React_Query-FF4154?logo=react-query) ![Redux](https://img.shields.io/badge/-Redux_Toolkit-764ABC?logo=redux) |
| **Forms & Validation** | ![React Hook Form](https://img.shields.io/badge/-React_Hook_Form-EC5990?logo=react-hook-form) ![Zod](https://img.shields.io/badge/-Zod-3E67B1?logo=zod) |
| **Integrations**       | ![Gemini](https://img.shields.io/badge/-Google_Gemini-8E75B2?logo=google-gemini) ![i18next](https://img.shields.io/badge/-i18next-26A69A?logo=i18next) |

---

## 📂 Project Structure

A clean, modular App Router architecture designed for scalability.

```
savol-bot/
├── src/
│   ├── api/              # External API Service Clients (Axios interceptors & methods)
│   ├── app/              # Next.js App Router Pages, Layouts, and API routes
│   ├── i18n/             # Localization configuration and JSON dictionaries
│   ├── lib/              # Core Utilities, SEO configurations, Context Providers
│   ├── schemas/          # Zod authentication and validation schemas
│   ├── server/           # Server-side specific logic (e.g. Google Analytics)
│   ├── styles/           # Global styles and Tailwind v4 configuration
│   ├── types/            # Global TypeScript Interfaces and Enums
│   └── ui/               # Reusable, atomic UI components organized by feature
├── public/               # Static Assets (Images, Icons)
└── proxy.ts              # Development Proxy Configuration for CORS/Routing
```

---

## ⚡ Getting Started

### Prerequisites

*   **Node.js**: v20.0.0 or higher
*   **Package Manager**: npm, yarn, or pnpm

### 📥 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/makhsumovM/savol-bot.git
    cd savol-bot
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    # Required for AI Generation via Google Gemini
    GEMINI_API_KEY=your_google_gemini_api_key
    
    # Core API Endpoints
    NEXT_PUBLIC_API_URL=your_backend_api_url
    
    # Optional - Core Project URL for SEO
    NEXT_PUBLIC_SITE_URL=https://skillcheck.kavsaracademy.tj
    ```

4.  **Launch Dev Server**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to start testing the project locally.

---

## 👥 Authors & Credits

Crafted with passion by the **SkillCheck Team**:

*   **Sultonzoda Abdulloh** - *Frontend Engineer*  
    [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdullo-sultonzoda-75a4ab3a2/)
    [![Telegram](https://img.shields.io/badge/-Telegram-26A5E4?style=flat-square&logo=telegram&logoColor=white)](https://t.me/sultonzoda_abdulloh)

*   **Qosimov Yusufjon** - *Frontend Engineer*  
    [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/%D0%BC-qosimov-7bb6013a3/)
    [![Telegram](https://img.shields.io/badge/-Telegram-26A5E4?style=flat-square&logo=telegram&logoColor=white)](https://t.me/Qosimovy)

*   **Makhsumov Muhammad** - *Project Lead*  
    [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/makhsumovM)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

<p align="center">
  <sub>Built for the future of developer education. © 2026 SkillCheck.</sub>
</p>
