# FAQ System Docker Deployment

## Quick Start

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down
```

## Services

- **Frontend**: http://localhost:1902 (Nginx + Vue SPA)
- **Backend**: API only (internal, not exposed to host)

## Default Login

- Username: `admin`
- Password: `admin123`

## Project Structure

```
├── frontend/           # Vue 3 Frontend
│   ├── dist/          # Built static files
│   └── src/           # Source code
├── backend/           # Express Backend
│   ├── mock-server.ts # Mock API Server
│   └── Dockerfile
├── docker-compose.yml
├── nginx.conf         # Nginx configuration
└── Dockerfile.frontend
```

## Rebuild

If you make changes to the frontend:

```bash
cd frontend
npm run build
cd ..
docker-compose up -d --build
```

If you make changes to the backend:

```bash
docker-compose up -d --build backend
```
<img width="1920" height="929" alt="image" src="https://github.com/user-attachments/assets/d27c27f9-d01c-431c-812a-605db025ad6f" />
