# Real Estate Listings App

A lightweight front-end interface for browsing real‑estate listings (flats, houses and sites) pulled from the **TopBroker** REST API.

**You can view the project at: https://topbroker-js.vercel.app/**
---

## Features

-   Separate category pages for Flats, Houses and Sites
-   Detail view with photo gallery, amenity list and formatted description
-   Skeleton placeholders while data loads
-   Responsive SCSS layout
-   API credentials provided via `.env` (HTTP Basic Auth)

---

## Technology Stack

| Layer    | Tech                     |
| -------- | ------------------------ |
| Tooling  | Vite                     |
| Language | Vanilla JS (ES Modules)  |
| Styling  | SCSS                     |
| Data     | TopBroker API            |
| Auth     | HTTP Basic Auth (dotenv) |

---

## Project Layout

```text
src/
├─ pages/
│  ├─ estate.js      # detail screen
│  ├─ flats.js       # flats list
│  ├─ houses.js      # houses list
│  └─ sites.js       # sites list
├─ styles/
│  ├─ main.scss
│  └─ estate-detail.scss
├─ main.js           # shared fetch logic
public/
├─ flats.html
├─ houses.html
├─ sites.html
└─ estate.html
```

---

## Getting Started

```bash
git clone https://github.com/<your-user>/real-estate-app.git
cd real-estate-app
npm install

cp .env.example .env   # add API credentials

npm run dev            # http://localhost:5173
```

---

## License

MIT © 2025 Tomas Antanaitis
