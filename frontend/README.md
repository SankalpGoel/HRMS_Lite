# Frontend README

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update the API URL if needed:
```
VITE_API_URL=http://localhost:8000
```

### 3. Run Development Server

```bash
npm run dev
```

Frontend will start at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

Output in `dist/` folder can be deployed to Vercel.

## Project Structure

```
src/
├── components/
│   ├── SharedComponents.jsx   # UI components
│   ├── Forms.jsx              # Forms
│   └── Tables.jsx             # Tables
├── pages/
│   ├── DashboardPage.jsx      # Dashboard
│   ├── EmployeesPage.jsx      # Employees
│   └── AttendancePage.jsx     # Attendance
├── services/
│   └── api.js                 # API client
├── styles/
│   ├── global.css             # Global styles
│   ├── app.css                # App layout
│   ├── pages.css              # Page styles
│   ├── components.css         # Component styles
│   └── forms.css              # Form styles
├── App.jsx                    # Main app
└── main.jsx                   # Entry point
```

## Key Features

- Modern React with hooks
- Responsive design
- Form validation
- Error handling
- Loading states
- Empty states
- Professional UI

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:8000)

## Building for Deployment

```bash
npm run build
```

This creates a `dist` folder that can be deployed to:
- **Vercel** - Automatic deployment from GitHub
- **Netlify** - Drag and drop or Git integration
- **Any static host** - Upload `dist` folder contents

## Development

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
