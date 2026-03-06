# Product Service

Product catalog service responsible for managing products and categories.

This service provides APIs for retrieving products displayed in the shop frontend.

---

# Service Responsibilities

* Product listing
* Category management
* Product details
* Product search

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

| Variable  | Description               |
| --------- | ------------------------- |
| PORT      | Service port              |
| MONGO_URI | MongoDB connection string |

Example

```bash
PORT=5000
MONGO_URI=mongodb://product-db:27017/productdb
```

---

# Running Locally

```bash
npm install
npm start
```

Service URL

```bash
http://localhost:5000
```

---

# Docker

Build image

```bash
docker build -t sanketdesai09/product-service .
```

Run container

```bash
docker run -p 5000:5000 sanketdesai09/product-service
```

---

# API Endpoints

| Method | Endpoint      | Description     |
| ------ | ------------- | --------------- |
| GET    | /products     | List products   |
| GET    | /products/:id | Product details |
| GET    | /categories   | List categories |

---

# Database Seeding

Initial product data is inserted using a Kubernetes Job.

Run job

```bash
kubectl apply -f product-service-seed-job.yaml
```

Check logs

```bash
kubectl logs job/product-seed-job -n shop-platform
```
