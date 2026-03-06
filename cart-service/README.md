# Cart Service

Manages user shopping carts using Redis for fast in-memory storage.

---

# Service Responsibilities

* Add item to cart
* Remove item from cart
* Retrieve user cart

---

# Tech Stack

| Component | Technology |
| --------- | ---------- |
| Runtime   | Node.js    |
| Framework | Express    |
| Database  | Redis      |
| Container | Docker     |

---

# Environment Variables

| Variable   | Description             |
| ---------- | ----------------------- |
| PORT       | Service port            |
| REDIS_HOST | Redis hostname          |
| REDIS_PORT | Redis port              |
| JWT_SECRET | JWT verification secret |

Example

```bash
PORT=6001
REDIS_HOST=cart-redis
REDIS_PORT=6379
JWT_SECRET=supersecretkey
```

---

# Running Locally

```bash
npm install
npm start
```

Service URL

```bash
http://localhost:6001
```

---

# Docker

Build image

```bash
docker build -t sanketdesai09/cart-service .
```

Run container

```bash
docker run -p 6001:6001 sanketdesai09/cart-service
```

---

# API Endpoints

| Method | Endpoint  | Description   |
| ------ | --------- | ------------- |
| POST   | /cart     | Add item      |
| GET    | /cart     | Get user cart |
| DELETE | /cart/:id | Remove item   |
