# Auth Service

Authentication and user management service for the Shop Platform.

This service handles user registration, login, and JWT-based authentication.

---

# Service Responsibilities

* User registration
* User login
* JWT token generation
* Authentication validation

---

# Tech Stack

| Component | Technology |
| --------- | ---------- |
| Runtime   | Node.js    |
| Framework | Express    |
| Database  | MongoDB    |
| Container | Docker     |

---

# Environment Variables

| Variable   | Description               | Example                        |
| ---------- | ------------------------- | ------------------------------ |
| PORT       | Service port              | 4000                           |
| MONGO_URI  | MongoDB connection string | mongodb://auth-db:27017/authdb |
| JWT_SECRET | JWT signing key           | supersecretkey                 |

---

# Running Locally

Install dependencies

```bash
npm install
```

Start service

```bash
npm start
```

Default URL

```bash
http://localhost:4000
```

---

# Docker

Build image

```bash
docker build -t sanketdesai09/auth-service .
```

Run container

```bash
docker run -p 4000:4000 sanketdesai09/auth-service
```

---

# API Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /auth/register | Register new user |
| POST   | /auth/login    | Login user        |
| GET    | /auth/health   | Health check      |

---

# Kubernetes Deployment

Service is deployed using manifests in the GitOps repository.

Verify deployment

```bash
kubectl get pods -n shop-platform
kubectl get svc -n shop-platform
```
