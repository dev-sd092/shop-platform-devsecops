# Frontend

React-based frontend for the Shop Platform.

The frontend communicates with backend services through the NGINX Ingress gateway.

---

# Tech Stack

| Component  | Technology |
| ---------- | ---------- |
| Framework  | React      |
| Build Tool | Vite       |
| Web Server | Nginx      |
| Container  | Docker     |

---

# Running Locally

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Frontend URL

```bash
http://localhost:5173
```

---

# Docker

Build image

```bash
docker build -t sanketdesai09/frontend .
```

Run container

```bash
docker run -p 3000:80 sanketdesai09/frontend
```

---

# Backend API Routes

Frontend communicates with backend services through the Ingress routes.

| Route         | Service         |
| ------------- | --------------- |
| /api/auth     | auth-service    |
| /api/products | product-service |
| /api/cart     | cart-service    |
| /api/orders   | order-service   |
