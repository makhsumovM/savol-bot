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
  </p>
</div>

<br />

## 🔮 Overview

**SkillCheck** is not just another quiz app. It is a **Generative AI-powered** platform that creates unique interview scenarios in real-time. By leveraging **Google Gemini 2.5**, we ensure that no two tests are exactly the same. 

Whether you are preparing for a Senior Frontend role or brushing up on mobile development patterns, SkillCheck adapts to your needs with an immersive, gamified experience.

---

## 🚀 Key Features

### 🧠 **AI Core**
*   **Dynamic Generation**: Questions are crafted on-the-fly using advanced prompt engineering.
*   **Context Aware**: Questions cover specific nuances of React, Node.js, .NET, and Mobile development.
*   **Smart Feedback**: Instant validation of answers with difficulty adjustments.

### 🎮 **Game Modes**
*   **🔥 Marathon**: A survival mode where difficulty ramps up as you progress. How long can you last?
*   **🎲 Random**: Quickfire 10-question sprints for rapid knowledge checks.
*   **⚔️ Leaderboard**: Global ranking system to see where you stand among peers.

### 💎 **Premium Experience**
*   **Fluid Animations**: Powered by **Framer Motion** for a native-app feel.
*   **Glassmorphism UI**: Modern aesthetic with **Tailwind CSS v4** styling.
*   **Dark/Light Themes**: Fully adaptive interface for any time of day.
*   **Localization**: Native support for **English**, **Russian**, and **Tajik**.

---

## 🛠️ Tech Stack

Built with the latest and greatest technologies for maximum performance.

| Domain | Technology Stack |
| :--- | :--- |
| **Framework** | ![Next.js](https://img.shields.io/badge/-Next.js_16-black?logo=next.js) ![React](https://img.shields.io/badge/-React_19-61DAFB?logo=react&logoColor=black) |
| **Language** | ![TypeScript](https://img.shields.io/badge/-TypeScript_5-3178C6?logo=typescript&logoColor=white) |
| **Styling** | ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS_4-38B2AC?logo=tailwind-css) ![Framer Motion](https://img.shields.io/badge/-Framer_Motion-0055FF?logo=framer) |
| **State** | ![TanStack Query](https://img.shields.io/badge/-React_Query-FF4154?logo=react-query) ![Redux](https://img.shields.io/badge/-Redux_Toolkit-764ABC?logo=redux) |
| **Integrations** | ![Gemini](https://img.shields.io/badge/-Google_Gemini-8E75B2?logo=google-gemini) ![i18next](https://img.shields.io/badge/-i18next-26A69A?logo=i18next) |
| **Forms/Valid** | ![Zod](https://img.shields.io/badge/-Zod-3E67B1?logo=zod) ![React Hook Form](https://img.shields.io/badge/-React_Hook_Form-EC5990?logo=react-hook-form) |

---

## 📂 Project Structure

A clean, modular architecture designed for scalability.

```
savol-bot/
├── src/
│   ├── app/              # Next.js App Router (Pages & API)
│   │   ├── api/          # Serverless Functions (Gemini Adapters)
│   │   ├── marathon/     # Marathon Game Logic
│   │   ├── leaderboard/  # Ranking System
│   │   └── ...
│   ├── ui/               # Atomic UI Components
│   │   ├── common/       # Buttons, Cards, Modals
│   │   └── layout/       # Headers, Footers
│   ├── lib/              # Core Logic & Utilities
│   ├── types/            # TypeScript Definitions
│   └── i18n/             # Localization (JSONs)
├── public/               # Static Assets
└── ...
```

---

## ⚡ Getting Started

### Prerequisites

*   **Node.js**: v18.17.0 or higher
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
    # Required for AI Generation
    GEMINI_API_KEY=your_google_gemini_api_key
    
    # API Endpoints
    NEXT_PUBLIC_API_URL=your_backend_api_url
    
    # Optional (SEO)
    NEXT_PUBLIC_SITE_URL=https://skillcheck.kavsaracademy.tj
    ```

4.  **Launch Dev Server**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to start testing.

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
