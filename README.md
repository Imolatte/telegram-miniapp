# Telegram Mini App Demo

A demo Telegram Mini App (WebApp) built with React, TypeScript, and Vite. Features a mobile-first UI that adapts to Telegram's native theme and works as a standalone web app in the browser.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-teal)

## Live Demo

**[https://telegram-miniapp-demo-pi.vercel.app](https://telegram-miniapp-demo-pi.vercel.app)**

## Features

- **Telegram WebApp API integration** — theme adaptation, haptic feedback, native popups, back button support
- **4 demo screens** — Dashboard, Feed, Create Post, Settings
- **REST API integration** — fetches live data from JSONPlaceholder
- **Form with validation** — client-side validation with inline error messages
- **Native Telegram look & feel** — uses `var(--tg-theme-*)` CSS variables for seamless theme matching
- **Graceful browser fallback** — works outside Telegram with sensible defaults
- **Mobile-first responsive design** — optimized for Telegram's viewport

## Tech Stack

| Layer       | Technology            |
|-------------|----------------------|
| Framework   | React 19             |
| Language    | TypeScript 5.7       |
| Build       | Vite 6               |
| Styling     | Tailwind CSS 4       |
| Routing     | React Router 7       |
| TG SDK      | @twa-dev/sdk + native WebApp API |

## Project Structure

```
src/
├── components/     # Reusable UI components (TabBar, PageHeader, StatCard, Spinner)
├── hooks/          # Custom hooks (useTelegram)
├── lib/            # API layer and utilities
├── pages/          # Screen components (Dashboard, Feed, Create, Settings)
├── types/          # TypeScript type definitions
├── App.tsx         # Root component with routing
├── main.tsx        # Entry point
└── index.css       # Global styles + Telegram theme variables
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or bun

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deploy to Telegram

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to any static hosting (Vercel, Netlify, GitHub Pages, etc.)
3. Create a bot via [@BotFather](https://t.me/BotFather) and set the Web App URL
4. Open the mini app through your bot's menu button

### Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable         | Description                    | Default                                  |
|-----------------|--------------------------------|------------------------------------------|
| `VITE_BOT_TOKEN` | Telegram Bot Token (backend)   | —                                        |
| `VITE_API_URL`   | API base URL                   | `https://jsonplaceholder.typicode.com`   |

## Screens

### Dashboard
Stats cards with trend indicators and a recent activity list fetched from a REST API.

### Feed
Scrollable list of posts loaded from JSONPlaceholder with author avatars and action buttons.

### Create Post
Form with title, category selector, and description fields. Includes client-side validation with inline error messages.

### Settings
User profile card, toggle switches for preferences, platform info, and account actions — all matching Telegram's native settings UI patterns.

## Browser Preview

The app detects whether it's running inside Telegram or a regular browser. Outside Telegram:
- Uses fallback user data and theme values
- Replaces `WebApp.showAlert()` with browser `alert()`
- Displays a "Browser Preview" label on the dashboard

## License

MIT
