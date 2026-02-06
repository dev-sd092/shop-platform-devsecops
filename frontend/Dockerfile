# ---------- Build stage ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# ---- Build-time env variables for Vite ----
ARG VITE_AUTH_API
ARG VITE_PRODUCT_API
ARG VITE_CART_API
ARG VITE_ORDER_API

ENV VITE_AUTH_API=$VITE_AUTH_API
ENV VITE_PRODUCT_API=$VITE_PRODUCT_API
ENV VITE_CART_API=$VITE_CART_API
ENV VITE_ORDER_API=$VITE_ORDER_API

# Build frontend with injected env vars
RUN npm run build


# ---------- Runtime stage ----------
FROM nginx:1.25-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
