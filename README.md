<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="80" alt="React Logo" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="80" alt="TypeScript Logo" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width="100" alt="Tailwind CSS Logo" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react" alt="React" />
  &nbsp;
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript" alt="TypeScript" />
  &nbsp;
  <img src="https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite" alt="Vite" />
  &nbsp;
  <img src="https://img.shields.io/badge/Tailwind-3.4.19-38B2AC?logo=tailwind-css" alt="Tailwind" />
</p>

---

# 🔐 ORTEX Login Page

A modern, responsive login page for **ORTEX.com** built with **React 19** and **TypeScript**.

> Developed with ❤️ by **Marie**.

---

## ⚙️ Tech Stack

- **Frontend:** React 19.2.0 · TypeScript 5.9.3 · Vite 7.2.4
- **Styling:** Tailwind CSS 3.4.19 · shadcn/ui
- **Real-time Data:** WebSocket (Trading Economics API)
- **Icons:** Lucide React
- **UI Components:** Radix UI (via shadcn/ui)

---

## 🚀 Quick Start

### 🛠 Installation

1. Clone or navigate to the project directory:

   ```bash
   cd ortex-coding
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

> Access the app at `http://localhost:5173`

---

## 📦 Build for Production

1. Build the project:

   ```bash
   npm run build
   ```

2. Preview the production build:

   ```bash
   npm run preview
   ```

> The built files will be in the `dist` folder and can be served as static files.

---

## ✨ Features

### 🔑 Login Form

- ✅ Username and password validation
- ✅ Real-time form validation with error messages
- ✅ POST request to `/login` endpoint
- ✅ Loading states and error handling
- ✅ Responsive design (mobile & desktop)

### 🔄 Password Reset

- ✅ Modal dialog for password reset
- ✅ Email validation
- ✅ Success feedback with animations

### 📊 Live Exchange Rate

- ✅ Real-time EUR/USD exchange rate via WebSocket
- ✅ Live price updates from Trading Economics
- ✅ Local timestamp display with seconds
- ✅ Real-time seconds counter since last update
- ✅ Connection status indicator

### 🎨 Design

- ✅ Modern, professional financial UI
- ✅ ORTEX brand colors (#38ada8)
- ✅ Dark theme with glassmorphism effects
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth animations and transitions

---

## 🔌 WebSocket Integration

The app connects to Trading Economics WebSocket feed for live EUR/USD exchange rates:

- **Endpoint:** `ws://stream.tradingeconomics.com/?client=guest:guest`
- **Subscription:** `{"topic": "subscribe", "to": "EURUSD:CUR"}`
- **Data:** Real-time price and UTC timestamp updates

The timestamp is automatically converted to the user's local timezone.

---

## 📁 Project Structure

```
ortex-coding/
├── src/
│   ├── components/
│   │   ├── LoginPage.tsx          # Main login page component
│   │   └── ui/                    # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── input.tsx
│   ├── hooks/
│   │   └── useWebSocket.ts        # WebSocket hook for exchange rates
│   ├── lib/
│   │   └── utils.ts               # Utility functions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                  # Global styles
├── public/
├── package.json
└── README.md
```

---

## 🎯 Requirements Met

✅ Responsive design (mobile & desktop)  
✅ Login form with POST to `/login`  
✅ Reset password modal with form  
✅ Live EUR/USD exchange rate via WebSocket  
✅ Local timestamp display  
✅ Modern, professional UI  
✅ TypeScript throughout  
✅ Deliverable as local webpage

---

## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 📝 Notes

- The WebSocket connection automatically reconnects on failure
- Form validation includes real-time feedback
- All timestamps are displayed in the user's local timezone
- The design uses ORTEX brand color (#38ada8) for consistency

---

## 🧑‍💻 Author

Developed with ❤️ by **Marie**.

---

## 📄 License

This project was created for a coding challenge.
