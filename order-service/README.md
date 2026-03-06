# Order Service

Handles order processing and order history for users.

---

# Service Responsibilities

* Create order
* Store order history
* Retrieve user orders

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

| Variable   | Description               |
| ---------- | ------------------------- |
| PORT       | Service port              |
| MONGO_URI  | MongoDB connection string |
| JWT_SECRET | Authentication secret     |

Example

```bash
PORT=7000
MONGO_URI=mongodb://order-db:27017/orderdb
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
http://localhost:7000
```

---

# Docker

Build image

```bash
docker build -t sanketdesai09/order-service .
```

Run container

```bash
docker run -p 7000:7000 sanketdesai09/order-service
```

---

# API Endpoints

| Method | Endpoint | Description      |
| ------ | -------- | ---------------- |
| POST   | /orders  | Create order     |
| GET    | /orders  | List user orders |
