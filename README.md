<div align="center">

# 🎯 MockPilot

### AI-Powered Interview Simulator

*Real company culture. Real questions. Brutally honest feedback.*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.0_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 🚀 What is MockPilot?

MockPilot is an **AI-powered mock interview simulator** that puts you in the hot seat with realistic, company-specific interviews. Powered by **Google's Gemini 2.0 Flash**, it delivers ultra-fast AI responses that feel like a real conversation with an interviewer from Google, Meta, Amazon, or any top company.

### Why MockPilot?

| Problem | MockPilot Solution |
|---------|-------------------|
| Generic prep gives cookie-cutter questions | **Company-mode simulator** adapts to each company's culture & style |
| Friends lack objectivity & availability | **AI interviewer** available 24/7 with unbiased assessment |
| No real-time feedback on tone & structure | **Instant scorecard** with STAR analysis & improvement plans |
| Interview coaches cost $100–$300/hour | **Free** — just bring your Gemini API key |

---

## ✨ Features

### 🏢 Company-Mode Simulator
Select from **8 companies** — Google, Meta, Amazon, Apple, Microsoft, Netflix, Startup, or Consulting. The AI adopts their actual interview style, values, and difficulty level.

### 💬 Live AI Interviewer
Powered by Gemini 2.0 Flash for ultra-fast responses. The AI asks follow-up questions, pushes back on weak answers, and adapts difficulty based on your performance — just like a real interviewer.

### 📊 Instant Feedback Report
End-of-session scorecard with:
- **Overall score** (1-10) with category breakdowns
- **STAR method analysis** — flags missing Situation/Task/Action/Result
- **Filler word detection** — counts "um", "like", "you know"
- **Answer rewrites** — AI-improved versions of your weakest answers
- **3-point improvement plan** — personalized next steps

### 🎨 Beautiful UI
- Dark/light mode with smooth transitions
- Glassmorphic design with gradient accents
- Animated components with Framer Motion
- Fully responsive — works on mobile, tablet, and desktop

---

## 🖼️ Screenshots

<div align="center">

| Landing Page | Setup Page |
|:---:|:---:|
| ![Landing](https://img.shields.io/badge/🎯-Landing_Page-6C3BF4?style=for-the-badge) | ![Setup](https://img.shields.io/badge/⚙️-Interview_Setup-10B981?style=for-the-badge) |

| Interview Chat | Scorecard |
|:---:|:---:|
| ![Interview](https://img.shields.io/badge/💬-Live_Interview-3B82F6?style=for-the-badge) | ![Feedback](https://img.shields.io/badge/📊-Feedback_Report-F59E0B?style=for-the-badge) |

</div>

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Gemini 2.0 Flash** | LLM backbone for interviews & feedback |
| **Lucide React** | Icon system |
| **React Router** | Client-side routing |

---

## 📦 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **Gemini API Key** — [Get one free at Google AI Studio](https://aistudio.google.com/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/narang25/MockPilot.git
cd MockPilot

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and add your Gemini API key

# 4. Start development server
npm run dev
```

The app will be running at **http://localhost:5173**

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | ✅ Yes |

---

## 🗂️ Project Structure

```
MockPilot/
├── public/
│   └── favicon.svg              # App icon
├── src/
│   ├── components/
│   │   ├── landing/
│   │   │   ├── HeroSection.jsx      # Hero with animated chat preview
│   │   │   ├── FeaturesSection.jsx   # Feature cards grid
│   │   │   ├── HowItWorksSection.jsx # 5-step guide
│   │   │   ├── PersonasSection.jsx   # User persona cards
│   │   │   └── CTASection.jsx        # Call-to-action banner
│   │   ├── Navbar.jsx               # Responsive nav with theme toggle
│   │   └── Footer.jsx               # Site footer
│   ├── context/
│   │   └── ThemeContext.jsx         # Dark/light mode provider
│   ├── pages/
│   │   ├── LandingPage.jsx          # Marketing landing page
│   │   ├── SetupPage.jsx            # Interview configuration
│   │   ├── InterviewPage.jsx        # Live chat interview (Gemini)
│   │   └── FeedbackPage.jsx         # Scorecard & analysis (Gemini)
│   ├── utils/
│   │   └── animations.js           # Shared animation variants
│   ├── App.jsx                      # Route definitions
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Design system & tokens
├── .env.example                     # Environment template
├── index.html                       # HTML entry with SEO meta
├── vite.config.js                   # Vite + Tailwind config
└── package.json
```

---

## 🎮 How to Use

1. **Set up your session** — Choose a company (Google, Meta, etc.), enter the role, and select interview type (Behavioral, Technical, or Case Study). Optionally paste the job description.

2. **Interview with AI** — The Gemini-powered AI greets you in character and dives straight into the first question. Answer naturally — the AI asks follow-ups and adapts difficulty.

3. **Get your scorecard** — When you're done, click "End" to receive a detailed feedback report with scores, highlights, areas to improve, answer rewrites, and a personalized improvement plan.

4. **Retry or switch** — One-click retry with fresh questions, or jump to another company to compare difficulty levels.

---

## 🗺️ Roadmap

- [x] Company-mode interview simulator
- [x] Live AI interviewer with Gemini
- [x] Instant feedback & scorecard
- [x] Dark/light mode
- [x] STAR method analysis
- [x] Answer rewrites
- [ ] Voice mode (Whisper transcription)
- [ ] Session history & progress tracking
- [ ] User authentication (Supabase)
- [ ] Mobile PWA optimization

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ for job seekers everywhere**

*Stop practicing with friends. Start practicing with MockPilot.*

</div>
