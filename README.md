# OAKSHORT

Project that aims to go beyond Bitly — delivering lightning-fast link shortening, rich analytics, and a minimalist yet dynamic user experience. Built with Fastify on the backend and React + TypeScript on the frontend, it focuses on performance, simplicity, and real-time feedback.

## Vision

Bitly is great — but often bloated, slow, and not developer-friendly enough. Oakshort reimagines what a URL shortener should be: instant responses, a fluid UI, and extensibility for teams, developers, and integrations. The goal is to provide the speed of a command-line tool with the polish of a modern web app.

## Features (in progress)

⚡ Ultra-fast link creation — powered by Fastify’s high-throughput HTTP engine and optimized routing.

🧩 Minimalist, distraction-free interface — React + Tailwind for crisp UI and sub-100 ms interactions.

🔁 Real-time feedback — instant confirmation and status updates using WebSockets.

📊 Link analytics dashboard — see clicks, referrers, geolocation, and device stats (planned).

🔐 Custom domains & branded links — own your identity (planned).

🔄 API-first design — every feature accessible via REST/gRPC endpoints.

🧠 Smart caching — Redis layer for high-volume link resolution.


## Tech Stack

### Frontend:
- React + TypeScript

- Tailwind CSS for minimal styling

- Storybook to catalog deisng system

- WebSocket-based event layer for live feedback

### Backend:
- Fastify (Node.js) — optimized for speed and low overhead
- TypeScript for strict typing and maintainability
- Redis for caching and rate limiting
- PostgreSQL (via Prisma ORM) for persistence
- JSON Web Tokens (JWT) for authentication
- REST + gRPC APIs
- Dockerized microservice architecture


🚧 **Work in progress** — currently focused on backend API performance and frontend interaction feedback loop. Contributions, feedback, and ideas are welcome.
