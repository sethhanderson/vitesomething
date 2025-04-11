
```
content-calendar
├─ backend
│  ├─ alembic
│  │  ├─ env.py
│  │  └─ versions
│  ├─ alembic.ini
│  ├─ app
│  │  ├─ api
│  │  │  ├─ deps.py
│  │  │  └─ routes
│  │  │     ├─ auth.py
│  │  │     ├─ content.py
│  │  │     └─ schedule.py
│  │  ├─ core
│  │  │  ├─ config.py
│  │  │  └─ security.py
│  │  ├─ db
│  │  │  ├─ database.py
│  │  │  └─ models.py
│  │  ├─ main.py
│  │  └─ services
│  │     ├─ auth_service.py
│  │     ├─ content_service.py
│  │     └─ platform_service.py
│  ├─ Dockerfile
│  ├─ requirements.txt
│  └─ tests
│     ├─ test_auth.py
│     └─ test_content.py
├─ frontend
│  ├─ .env.example
│  ├─ docker-compose.yml
│  ├─ eslint.config.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ index.html
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.tsx
│  │  ├─ assets
│  │  ├─ components
│  │  │  ├─ analytics
│  │  │  │  └─ PerformanceChart.tsx
│  │  │  ├─ calendar
│  │  │  │  └─ Calendar.tsx
│  │  │  ├─ common
│  │  │  │  ├─ Button.tsx
│  │  │  │  └─ Navbar.tsx
│  │  │  └─ content
│  │  │     ├─ ContentForm.tsx
│  │  │     └─ ContentList.tsx
│  │  ├─ contexts
│  │  │  ├─ AuthContext.tsx
│  │  │  └─ SettingsContext.tsx
│  │  ├─ index.css
│  │  ├─ main.tsx
│  │  ├─ pages
│  │  │  ├─ Analytics.tsx
│  │  │  ├─ ContentLibrary.tsx
│  │  │  ├─ Dashboard.tsx
│  │  │  └─ Scheduler.tsx
│  │  ├─ services
│  │  │  ├─ api.ts
│  │  │  └─ platformService.ts
│  │  ├─ types
│  │  │  └─ index.ts
│  │  ├─ utils
│  │  │  └─ helpers.ts
│  │  └─ vite-env.d.ts
│  ├─ tsconfig.json
│  └─ vite.config.ts
└─ projectplan.md

```