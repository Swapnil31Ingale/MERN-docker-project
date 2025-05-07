# A Simple MERN Stack Application

> Based on [iam-veeramalla/MERN-docker-compose](https://github.com/iam-veeramalla/MERN-docker-compose/tree/compose) — credit to the original author.

---

## 🐳 Docker Setup

### Create a network for the Docker containers

```sh
`docker network create mern`
```

### Build the client 

```sh
cd mern/frontend
docker build -t frontend-image .
```

### Run the client

`docker run --name=frontend --network=mern -d -p 5173:5173 frontend-image`

### Verify the client is running

Open your browser and type `http://localhost:5173`

### Run the mongodb container

`docker run --network=mern --name mongodb -d -p 27017:27017 -v ~/opt/data:/data/db mongo:latest`

### Build the server

```sh
cd mern/backend
docker build -t backend-image .
```

### Run the server

`docker run --name=backend --network=mern -d -p 5050:5050 backend-image`

## Using Docker Compose

`docker compose up -d`

------------------------------------------------------------------------------
**NOTES**
------------------------------------------------------------------------------

### 🔁 API Calls (Frontend)
To allow the frontend running in Docker to communicate with the backend service inside the same Docker network, we updated all API calls from hardcoded URLs like:

```js
// ❌ Old (doesn't work inside Docker)
fetch("http://localhost:5050/record")

// ✅ New (works both inside and outside Docker)
fetch("/record")
This ensures requests are routed properly whether you're using Docker or running locally with Vite.

### ⚙️ vite.config.js Changes
To allow external access (e.g. from browser to Docker container), update your vite.config.js:

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
});
This tells Vite to listen on all interfaces, which is necessary when running inside a container.

### 🧪 Running Locally vs. Docker
When running locally via npm run dev, remember:
Use http://localhost:5050 for API requests.

You don't need Docker for development, but it helps simulate production behavior.

When using Docker:
API requests should be relative paths (e.g., /record, /record/:id, etc.).

Vite must be configured to expose its port (see above).
