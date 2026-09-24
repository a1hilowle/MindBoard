# MindBoard

MindBoard is a responsive notes app for creating, viewing, editing, and deleting notes. The repository includes the original React + Express + MongoDB application and a separate **guest demo** that runs entirely in the browser.

**[Open the live guest demo](https://a1hilowle.github.io/MindBoard/)**

## What the demo does

- Create notes with a title and body, then open, edit, or delete them.
- Keep your notes after refreshing or reopening the page in the same browser.
- Give each visitor their own notes through browser `localStorage`.
- Work without signing in or connecting to a shared server.

**Guest data stays on that browser and device.** It is not synchronized across devices, stored in MongoDB, or backed up by the site. Clearing site data or using private browsing can remove it. Avoid entering sensitive information in a public or shared browser. The demo is separate from the MongoDB-backed development mode described below.

## Tech stack

| Part | Technology | Purpose |
| --- | --- | --- |
| Frontend | React, Vite, React Router, Tailwind CSS, daisyUI | Notes interface and navigation |
| Guest demo | Browser `localStorage` | Per-browser note persistence |
| Local backend | Node.js, Express | REST API for notes |
| Local database | MongoDB, Mongoose | Server-backed note persistence |
| Optional rate limit | Upstash Redis | Per-IP request limit for the API |
| Deployment | GitHub Actions, GitHub Pages | Free static guest demo hosting |

## Run the guest demo locally

Requires Node.js 20.19+ or 22.12+ and npm.

```bash
git clone https://github.com/a1hilowle/MindBoard.git
cd MindBoard/frontend
npm ci
```

Start the frontend with `VITE_DEMO_MODE=true`. For example:

```bash
# macOS / Linux
VITE_DEMO_MODE=true npm run dev

# PowerShell
$env:VITE_DEMO_MODE='true'; npm run dev
```

Open the URL Vite prints, including the `/MindBoard/` path. No backend or MongoDB setup is needed for this mode.

## Run the MongoDB-backed app locally

1. Start a local MongoDB server or use a MongoDB connection string you control.
2. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI`.
3. Run the backend and frontend in separate terminals:

```bash
cd MindBoard/backend
npm ci
npm run dev
```

```bash
cd MindBoard/frontend
npm ci
npm run dev
```

The API defaults to `http://localhost:5001/api`. Set `VITE_API_URL` for another API origin and `CLIENT_ORIGIN` in the backend environment if the frontend origin changes. Upstash credentials are optional for local development; when `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are both set, the API applies a 10-request-per-20-second limit per IP. The demo build does not use the backend.

### API routes

| Method | Path | Action |
| --- | --- | --- |
| `GET` | `/api/notes` | List notes, newest first |
| `GET` | `/api/notes/:id` | Read one note |
| `POST` | `/api/notes` | Create a note |
| `PUT` | `/api/notes/:id` | Update a note |
| `DELETE` | `/api/notes/:id` | Delete a note |

Requests to create or update a note use JSON with `title` and `content` fields.

## Repository map

```text
frontend/src/pages/          List, create, and detail/edit screens
frontend/src/components/     Navbar and note cards
frontend/src/lib/axios.js    Guest storage adapter / server API selection
backend/server.js            Express entry point and middleware
backend/src/controllers/     Note CRUD handlers
backend/src/models/          Mongoose Note model
.github/workflows/deploy.yml Guest demo build and Pages deployment
```

## Deployment

The GitHub Actions workflow builds the frontend with `VITE_DEMO_MODE=true` and publishes `frontend/dist` to GitHub Pages. `HashRouter` keeps note routes working when a visitor refreshes a project Pages URL. The repository does not publish a MongoDB database or Express server.

## Project scope

The server-backed version is a learning project with shared notes and no user authentication. The guest demo deliberately isolates notes by browser instead of exposing that shared API publicly. The app is not intended for private or sensitive records until account authentication and authorization are added.
