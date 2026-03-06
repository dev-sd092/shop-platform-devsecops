# 🛒 Cloud-Native Shop Platform – DevOps Project

A production-style **microservices e-commerce platform** deployed on Kubernetes using a **GitOps workflow with ArgoCD**, automated CI pipelines with **Jenkins**, and monitored using **Prometheus + Grafana**.

This project demonstrates how modern DevOps teams build, secure, deploy, and monitor containerized microservices in a Kubernetes environment.

---

# 📌 Table of Contents

1. Project Architecture
2. Repository Structure
3. Local Development Setup
4. Docker Containerization
5. CI Pipeline (Jenkins)
6. GitOps Deployment (ArgoCD)
7. Kubernetes Resources
8. Ingress Routing
9. Database Seeding Job
10. Monitoring Stack
11. Screenshots
12. Author

---

# 🏗️ Architecture Overview

<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/d8df4bf8-bf00-4082-8855-4968e3230d5f" />

The system consists of multiple Node.js microservices deployed on Kubernetes.

User Browser ---> NGINX Ingress Controller ---> Frontend (React + Vite) ---> Backend Microservices

* Auth Service
* Product Service
* Cart Service
* Order Service

Each service communicates with its respective database.

| Service         | Database |
| --------------- | -------- |
| Auth Service    | MongoDB  |
| Product Service | MongoDB  |
| Cart Service    | Redis    |
| Order Service   | MongoDB  |

Monitoring is implemented using:

* Prometheus
* Grafana
* Node Exporter
* kube-state-metrics

---

# 📁 Repository Structure

```text
shop-platform
│
├── frontend
├── auth-service
├── product-service
├── cart-service
├── order-service
│
└── Jenkinsfile
```

GitOps repository:

```text
shop-platform-gitops
│
└── environments
    └── dev
        ├── deployments
        ├── services
        ├── ingress
        └── jobs
```

---

# 🧪 Local Development Setup

Clone repository

```bash
git clone https://github.com/<your-repo>/shop-platform.git
cd shop-platform
```

Install dependencies for each service

```bash
cd auth-service
npm install

cd ../product-service
npm install

cd ../cart-service
npm install

cd ../order-service
npm install
```

Run services locally

```bash
npm start
```

---

# 🐳 Docker Containerization

Each service uses a Dockerfile for containerization.

Build an image

```bash
docker build -t sanketdesai09/auth-service .
```

Run container

```bash
docker run -p 4000:4000 sanketdesai09/auth-service
```

Verify running containers

```bash
docker ps
```

---

# ⚙️ CI Pipeline (Jenkins)

Each microservice has a **Jenkins pipeline** that performs:

| Stage                  | Purpose                            |
| ---------------------- | ---------------------------------- |
| Dependency Install     | Install npm packages               |
| SonarQube Analysis     | Code quality analysis              |
| Quality Gate           | Validate code standards            |
| OWASP Dependency Check | Detect vulnerable packages         |
| Docker Build           | Build container image              |
| Trivy Scan             | Scan container for vulnerabilities |
| Push Image             | Push image to DockerHub            |
| GitOps Update          | Update image tag in GitOps repo    |

Example commands executed in pipeline:

```bash
docker build -t sanketdesai09/product-service:$IMAGE_TAG .
docker push sanketdesai09/product-service:$IMAGE_TAG
```

GitOps repository is updated automatically:

```bash
sed -i "s|image: .*product-service:.*|image: sanketdesai09/product-service:${IMAGE_TAG}|g" environments/dev/product-service.yaml
```

---

# 🚀 GitOps Deployment (ArgoCD)

ArgoCD continuously watches the GitOps repository and applies Kubernetes manifests automatically.

Install ArgoCD

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Expose ArgoCD UI

```bash
kubectl port-forward svc/argocd-server -n argocd 8090:443
```

Retrieve admin password

```bash
kubectl get secret argocd-initial-admin-secret \
-n argocd \
-o jsonpath="{.data.password}" | base64 -d
```

---

# ☸️ Kubernetes Deployment

Apply manifests

```bash
kubectl apply -k environments/dev
```

Verify resources

```bash
kubectl get pods -n shop-platform
kubectl get svc -n shop-platform
kubectl get ingress -n shop-platform
```

---

# 🌐 Ingress Routing

NGINX Ingress Controller routes traffic to backend services.

Example routes

| Path          | Service         |
| ------------- | --------------- |
| /api/auth     | auth-service    |
| /api/products | product-service |
| /api/cart     | cart-service    |
| /api/orders   | order-service   |
| /             | frontend        |

Example verification

```bash
kubectl describe ingress shop-platform-ingress -n shop-platform
```

---

# 🌱 Database Seeding

Product data is inserted using a Kubernetes Job.

Run job

```bash
kubectl apply -f product-service-seed-job.yaml
```

Check logs

```bash
kubectl logs job/product-seed-job -n shop-platform
```

---

# 📊 Monitoring Stack

Monitoring stack installed using **kube-prometheus-stack**.

Components deployed:

* Prometheus
* Grafana
* Alertmanager
* Node Exporter
* kube-state-metrics

Verify monitoring pods

```bash
kubectl get pods -n monitoring
```

Access Grafana

```bash
kubectl port-forward svc/monitoring-grafana -n monitoring 3000:80
```

Default login

```text
username: admin
password: prom-operator
```

Access Prometheus

```bash
kubectl port-forward svc/monitoring-kube-prometheus-prometheus 9090 -n monitoring
```

---

# 📸 Screenshots

## Application UI

<img width="1184" height="717" alt="Screenshot 2026-03-06 063136" src="https://github.com/user-attachments/assets/2935f28b-8f58-449f-819c-81ae092f38a2" />

---

## Jenkins Pipeline

<img width="1851" height="256" alt="Screenshot 2026-03-06 070948" src="https://github.com/user-attachments/assets/bbc7fdd6-2881-4551-bd7e-534f33258cf3" />

---

## ArgoCD Application

<img width="1283" height="732" alt="Screenshot 2026-03-06 055658" src="https://github.com/user-attachments/assets/85784a21-03b6-4854-aa41-f4b6c5fff60c" />

---

## Kubernetes Pods

<img width="990" height="651" alt="Screenshot 2026-03-06 071136" src="https://github.com/user-attachments/assets/7818441e-80fd-4991-aef4-450e3e7d9554" />

---

## Grafana Monitoring

<img width="1641" height="643" alt="Screenshot 2026-03-06 064810" src="https://github.com/user-attachments/assets/665a3927-8bb2-4629-b3b2-fc6c7d1da155" />
<img width="1635" height="883" alt="Screenshot 2026-03-06 065251" src="https://github.com/user-attachments/assets/5be3697e-b92d-4f03-8012-3894f83b28e4" />

---

# 👤 Author

Sanket Desai
DevOps Engineer
